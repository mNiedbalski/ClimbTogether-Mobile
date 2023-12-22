import {auth,db} from '../../App';
import {runTransaction,collection, addDoc, setDoc, doc, updateDoc, getDoc} from 'firebase/firestore';

export async function updateRouteInfoInDB(routeID, roomID, routeData){
  const routeRef = doc(db, "rooms", roomID, "routes", routeID);
  try {
    await updateDoc(routeRef, routeData);
  } catch (error) {
    console.error('Error updating document:', error);
  }
  console.log("Document written with ID: ", routeRef.id);
}