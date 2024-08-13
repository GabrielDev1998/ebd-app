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
} from 'firebase/firestore';
import { appInitialize } from '../settings';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';

const db = getFirestore(appInitialize);

function DataBase<T extends DocumentData>(path: string) {
  const [loading, setLoading] = useState(false);
  const [dataDocs, setDataDocs] = useState<T[]>([]);

  // Criar docs WithFieldValue
  const createDocument = async (data: T, cb?: () => void) => {
    try {
      setLoading(true);
      await addDoc(collection(db, path), data)
        .then(() => {
          if (cb) cb();
        })
        .catch((error) => {
          if (error instanceof FirebaseError) {
            console.log('Algum erro ocorreu ' + error.message);
          }
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error('Error creating document:', err);
    }
  };

  //Ler dados
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
          })
          .catch((error) => {
            if (error instanceof FirebaseError) {
              console.log('Não foi possível ler os dados ' + error.message);
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
      onSnapshot(collection(db, path), (snapshot) => {
        const data = snapshot as QuerySnapshot<T, T>;
        setDataDocs(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        );
      });
    };
    getDocument();
  }, [path]);

  return { createDocument, dataDocs, loading };
}
export default DataBase;
