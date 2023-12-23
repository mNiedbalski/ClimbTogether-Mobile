import {auth,db} from '../../App';
import {runTransaction,collection, addDoc, setDoc, doc, updateDoc, getDoc} from 'firebase/firestore';

export async function updateUserInDB(postedName, postedSurname, postedHeight, postedWeight, postedSex, postedBirthday){
    const userData = {
        name: postedName,
        surname: postedSurname,
        height: postedHeight,
        postedWeight: postedWeight,
        postedSex: postedSex,
        postedBirthday: postedBirthday,
    }
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, userData);
    console.log("Document written with ID: ", userRef.id);
}