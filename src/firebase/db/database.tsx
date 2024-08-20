'use client';

import {
  getFirestore,
  collection,
  addDoc,
  WithFieldValue,
  DocumentData,
  onSnapshot,
  doc,
  QuerySnapshot,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { appInitialize } from '../settings';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';

const db = getFirestore(appInitialize);

function DataBase<T extends DocumentData>(path: string) {
  const [loading, setLoading] = useState(false);
  const [dataDocs, setDataDocs] = useState<T[]>([]);
  const [errorBase, setErrorBase] = useState<string | null>(null);

  // Criar docs WithFieldValue
  const createDocument = async (data: T, cb?: () => void) => {
    try {
      setLoading(true);
      await addDoc(collection(db, path), data)
        .then(() => {
          if (cb) cb();
          setErrorBase(null);
        })
        .catch((error) => {
          if (error instanceof FirebaseError) {
            console.log('Algum erro ocorreu ' + error.message);
            setErrorBase(error.message);
          }
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  // Atualizar os documentos
  async function updateData(
    id: string | null,
    data: T,
    cb?: (data: T) => void,
  ) {
    if (id) {
      const refUpdate = doc(db, path, id);
      try {
        setLoading(true);
        await updateDoc(refUpdate, data)
          .then(() => {
            if (cb) cb(data);
            setErrorBase(null);
          })
          .catch((error) => {
            if (error instanceof FirebaseError) {
              console.log('Algum erro ocorreu' + error.message);
              setErrorBase(error.message);
            }
          })
          .finally(() => setLoading(false));
      } catch (e) {
        console.error('Algum erro ocorreu ' + e);
      }
    }
  }

  // Ler dados
  useEffect(() => {
    async function readDocs() {
      try {
        setLoading(true);
        await getDocs(collection(db, path))
          .then((snapshot) => {
            const data = snapshot as QuerySnapshot<T, T>;
            setDataDocs(
              data.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
              }),
            );
            setErrorBase(null);
          })
          .catch((error) => {
            if (error instanceof FirebaseError) {
              console.log('Não foi possível ler os dados ' + error.message);
              setErrorBase(error.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (e) {
        console.error('Algum erro ocorreu ' + e);
      }
    }
    readDocs();
  }, [path]);

  // Pegar docs do banco de dados
  useEffect(() => {
    const getDocument = () => {
      try {
        onSnapshot(collection(db, path), (snapshot) => {
          const data = snapshot as QuerySnapshot<T, T>;
          setDataDocs(
            data.docs.map((doc) => {
              return { ...doc.data(), id: doc.id };
            }),
          );
        });
      } catch (err) {
        if (err instanceof Error)
          console.error('Error getting document:', err.message);
      }
    };
    getDocument();
  }, [path]);

  return { createDocument, updateData, dataDocs, loading, errorBase };
}
export default DataBase;
