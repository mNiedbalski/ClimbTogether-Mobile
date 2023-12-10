import {auth,db} from '../../App';
import {runTransaction,collection, addDoc, setDoc, doc, updateDoc, getDoc} from 'firebase/firestore';

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
export async function updateUserLevel() {

  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnapshot = await getDoc(userRef);
  let fetchedUserLevel = userSnapshot.data().level;
  fetchedUserLevel++;
  const userData = {
    level: fetchedUserLevel,
  }
  await updateDoc(userRef, userData);
  console.log("Document written with ID: ", userRef.id);
}
export async function updateUserExperience(userExperience) {
  const userData ={
    experience_points: userExperience,
  }
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, userData);
  console.log("Document written with ID: ", userRef.id);
}
