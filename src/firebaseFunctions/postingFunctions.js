import {auth,db} from '../../App';
import {runTransaction,collection, addDoc, setDoc, doc} from 'firebase/firestore';

export async function postAttemptToDB(attemptData, roomID, routeID) {
  const userAttemptsCollectionRef = collection(db, "users", auth.currentUser.uid, "attempts");
  const routeAttemptsCollectionRef = collection(db, "rooms", roomID, "routes", routeID, "attempts")
  console.log("ATTEMPT DATA PASSED",attemptData);
  try {
    // Używamy transakcji, aby zsynchronizować operacje na obu kolekcjach
    await runTransaction(db, async (transaction) => {
        const newAttemptDocRef = await addDoc(userAttemptsCollectionRef, attemptData);
        console.log('Added document to user attempts with ID:', newAttemptDocRef.id);
        const routeAttemptDoc = doc(routeAttemptsCollectionRef, newAttemptDocRef.id);

        await setDoc(routeAttemptDoc, attemptData, { merge: true });
        console.log('Added document to route attempts with ID:', newAttemptDocRef.id);
    });
  } catch (error) {
    console.error('Error adding document:', error);
  }
}
