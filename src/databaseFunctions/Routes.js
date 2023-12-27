import { auth, db } from '../../App';
//import { getDoc,getDocs, doc, collection } from 'firebase/firestore/lite'; //Lite version, but I need more powerful queries
import { getDoc, getDocs, doc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { fetchAllRoutesFromGym } from './fetchingFunctions';
export async function getAttemptsCountFromDatabase(gymID){
    const routes = await fetchAllRoutesFromGym(gymID);
   
    const attemptsDataPromises = routes.map(async route => {
        const routeDocRef = doc(db, "rooms", route.roomID, "routes", route.id);
        const routeSnapshot = await getDoc(routeDocRef);
        const routeData = routeSnapshot.data();
        console.log("checkedRoute",routeData);
        return attemptsCount;
    });
    const attemptsData = await Promise.all(attemptsDataPromises);
   
}
export async function fetchAttemptsAmountWithDatesAndCorrespondingRouteIDs(gymID) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    const gymDoc = await getDoc(doc(db, 'gyms', gymID));
    const gymData = gymDoc.data();
    
  
    const results = [];
  
    for (const roomRef of gymData.rooms) {
      const roomDoc = await getDoc(roomRef);
      const routesSnapshot = await getDocs(collection(roomDoc.ref, 'routes'));
      
  
      for (const routeDoc of routesSnapshot.docs) {
        const attemptsSnapshot = await getDocs(
          query(collection(routeDoc.ref, 'attempts'), where('attempt_time', '>=', threeMonthsAgo))
        );
        const attemptsCountByDate = {};

        attemptsSnapshot.forEach((attemptDoc) => {
          const attemptData = attemptDoc.data();
          const attemptDateTimestamp = attemptData.attempt_time;
          //OBLIGATORY BECAUSE HEATMAP ACCEPTS DATA IN YEAR-MONTH-DAY FORMAT INSTEAD OF DAY/MONTH/YEAR PROVIDED BY toLocaleString()
          const attemptDateObject = attemptDateTimestamp.toDate();
          const year = attemptDateObject.getFullYear();
          const month = String(attemptDateObject.getMonth() + 1).padStart(2, '0'); 
          const day = String(attemptDateObject.getDate()).padStart(2, '0');
        
          const attemptDate = `${year}-${month}-${day}`;
          if (attemptsCountByDate[attemptDate]) {
            attemptsCountByDate[attemptDate]++;
          } else {
            attemptsCountByDate[attemptDate] = 1;
          }
        });
  
        results.push({
          routeID: routeDoc.id,
          attemptsCountByDate: attemptsCountByDate,
        });
      }
      
    }

    return results;
  }