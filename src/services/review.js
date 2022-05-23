import { db } from '../firebase-config';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

const reviewCollectionRef = collection(db, 'reviews');

class ReviewDataService {
  add = (newReview) => {
    return addDoc(reviewCollectionRef, newReview);
  };

  update = (id, newReview) => {
    const reviewDoc = doc(db, 'reviews', id);
    return updateDoc(reviewDoc, newReview);
  };

  delete = (id) => {
    const reviewDoc = doc(db, 'reviews', id);
    return deleteDoc(reviewDoc);
  };

  getAll = (id) => {
    const q = query(
      reviewCollectionRef,
      where('productId', '==', id),
      orderBy('releaseDate', 'desc'),
      limit(10)
    );
    return getDocs(q);
  };

  get = (id) => {
    const reviewDoc = doc(db, 'reviews', id);
    return getDoc(reviewDoc);
  };
}

export default new ReviewDataService();
