import { db } from '.../../src/services/firebase';
import {
  collection, doc, getDoc, getDocs, query, where, orderBy, limit,
} from 'firebase/firestore';
import type { ClassDoc } from './catalog.types';

const CLASSES = 'classes';

export async function getClasses(publishedOnly = true, max = 100): Promise<ClassDoc[]> {
  const base = collection(db, CLASSES);

  // Plano A: com published + orderBy(createdAt)
  try {
    const qA = publishedOnly
      ? query(base, where('published', '==', true), orderBy('createdAt', 'desc'), limit(max))
      : query(base, orderBy('createdAt', 'desc'), limit(max));

    const snapA = await getDocs(qA);
    const rowsA = snapA.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ClassDoc, 'id'>) }));
    if (rowsA.length) return rowsA;
  } catch (e) {
    // Pode cair aqui por índice ausente ou campo faltando
    console.log('getClasses Plano A falhou, tentando Plano B:', (e as any)?.message);
  }

  // Plano B: só published == true, sem orderBy
  try {
    const qB = publishedOnly ? query(base, where('published', '==', true), limit(max)) : query(base, limit(max));
    const snapB = await getDocs(qB);
    const rowsB = snapB.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ClassDoc, 'id'>) }));
    if (rowsB.length) return rowsB;
  } catch (e) {
    console.log('getClasses Plano B falhou, tentando Plano C:', (e as any)?.message);
  }

  // Plano C: sem filtros (debug)
  const snapC = await getDocs(base);
  return snapC.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ClassDoc, 'id'>) }));
}

export async function getClassById(id: string): Promise<ClassDoc | null> {
  const ref = doc(db, CLASSES, id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<ClassDoc, 'id'>) }) : null;
}