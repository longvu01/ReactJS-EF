import { db } from '../firebase-config';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const reviewCollectionRef = collection(db, 'reviews');

class ReviewDataService {
  getAll = ({ id, limit: limitQty }) => {
    const q = query(
      reviewCollectionRef,
      where('productId', '==', id),
      orderBy('releaseDate', 'desc'),
      limit(limitQty)
    );
    return getDocs(q);
  };

  get = (id) => {
    const reviewDoc = doc(db, 'reviews', id);
    return getDoc(reviewDoc);
  };

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
}

export default new ReviewDataService();
