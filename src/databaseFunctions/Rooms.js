import { auth, db } from '../../App';
import { getDoc, getDocs, doc, collection, query, where, getCountFromServer } from 'firebase/firestore';

export async function fetchRoomsFromDB(gymID) {
    const gymDocRef = doc(db, "gyms", gymID);
    const gymSnapshot = await getDoc(gymDocRef);
    const gymData = gymSnapshot.data();
    const roomIDs = gymData.rooms;
    const rooms = [];

    for (const roomID of roomIDs) {
        const roomDocRef = doc(db, "rooms", roomID);
        const roomSnapshot = await getDoc(roomDocRef);
        const roomData = roomSnapshot.data();
        const roomName = roomData.roomName;
        const roomInfo = {
            roomID: roomID,
            name: roomName,
        };
        rooms.push(roomInfo);
    }

    return rooms;
}