import {auth,db} from '../../App';
import {runTransaction,collection, addDoc, setDoc, doc, updateDoc, getDoc} from 'firebase/firestore';

export async function postAttemptToDB(attemptData, roomID, routeID) {
  const userAttemptsCollectionRef = collection(db, "users", auth.currentUser.uid, "attempts");
  const routeAttemptsCollectionRef = collection(db, "rooms", roomID, "routes", routeID, "attempts")
  try {
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
export async function updateUserHardestDifficultyInDB (difficulty){
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userData = {
      hardest_difficulty: difficulty,
  }
  await updateDoc(userRef, userData);
  console.log("Document written with ID: ", userRef.id);
}
export async function postNewUserToDatabase(postedName,postedSurname,postedHeight,postedWeight,postedSex,postedBirthday){
  const roleDocRef = doc(db, "roles", "userRole");
  let postedRoles = [roleDocRef];
  const userData = {
    name: postedName,
    surname: postedSurname,
    height: postedHeight,
    weight: postedWeight,
    sex: postedSex,
    birthday: postedBirthday,
    level: 0,
    experience_points: 0,
    hardest_difficulty: "V0",
    roles: postedRoles,
  }
  const usersCollectionRef = collection(db, "users");
  try {
    const newUserDoc = doc(usersCollectionRef, auth.currentUser.uid);
    await setDoc(newUserDoc, userData, {merge: true});
    console.log("Document written with ID: ", newUserDoc.id);
  } catch (error){
    console.error('Error adding document:', error);
  } 

}
