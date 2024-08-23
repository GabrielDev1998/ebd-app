'use client';

import {
  getFirestore,
  collection,
  addDoc,
  DocumentData,
  onSnapshot,
  doc,
  QuerySnapshot,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { appInitialize } from '../settings';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import Global from '@/utils/global';
import Swal from 'sweetalert2';

const db = getFirestore(appInitialize);
const { alertNotification, popup } = Global();

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
            alertNotification('error', error.message);
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
              alertNotification('error', error.message);
            }
          })
          .finally(() => setLoading(false));
      } catch (e) {
        console.error('Algum erro ocorreu ' + e);
      }
    }
  }

  // Deletar documentos
  async function deleteDocument(
    id: string,
    feedback?: {
      title: string;
      text: string;
    },
  ) {
    try {
      Swal.fire({
        icon: 'warning',
        title: 'Tem certeza que deseja excluir?',
        text: 'Se você excluir, não poderá mais ter acesso ao dado.',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        showCancelButton: true,
        background: '#ffffff',
        color: 'var(--colorText-2)',
        confirmButtonColor: 'var(--primary)',
        cancelButtonColor: 'var(--colorCancel)',
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          setLoading(true);
          await deleteDoc(doc(db, path, id))
            .then(() => {
              popup({
                icon: 'success',
                title: feedback ? feedback.title : 'Documento deletado!',
                text: feedback
                  ? feedback.text
                  : 'O documento foi deletado com sucesso',
              });
              setErrorBase(null);
            })
            .catch((error) => {
              if (error instanceof FirebaseError) {
                console.log('Algum erro ocorreu ' + error.message);
                setErrorBase(error.message);
                alertNotification('error', error.message);
              }
            })
            .finally(() => setLoading(false));
        }
      });
    } catch (e) {
      console.error('Algum erro ocorreu' + e);
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

  return {
    createDocument,
    updateData,
    deleteDocument,
    dataDocs,
    loading,
    errorBase,
  };
}
export default DataBase;
