import { auth, db } from '../../App';
//import { getDoc,getDocs, doc, collection } from 'firebase/firestore/lite'; //Lite version, but I need more powerful queries
import { getDoc, addDoc, getDocs, doc, collection, query, where, getCountFromServer } from 'firebase/firestore';

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
export async function fetchAttemptsAmountWithHours(gymID) {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
    const gymDoc = await getDoc(doc(db, 'gyms', gymID));
    const gymData = gymDoc.data();
  
    const results = [];
  
    const hourIntervals = [
      { start: 7, end: 10 },
      { start: 10, end: 13 },
      { start: 13, end: 16 },
      { start: 16, end: 19 },
      { start: 19, end: 22.5 }, // 22:30
    ];
  
    const attemptsCountByHourInterval = {};
  
    // Inicjalizacja wartości zerami dla każdego przedziału
    hourIntervals.forEach((interval) => {
      const intervalKey = `${interval.start}-${interval.end}`;
      attemptsCountByHourInterval[intervalKey] = 0;
    });
  
    for (const roomRef of gymData.rooms) {
      const roomDoc = await getDoc(roomRef);
      const routesSnapshot = await getDocs(collection(roomDoc.ref, 'routes'));
  
      for (const routeDoc of routesSnapshot.docs) {
        const attemptsSnapshot = await getDocs(
          query(collection(routeDoc.ref, 'attempts'), where('attempt_time', '>=', threeMonthsAgo))
        );
  
        attemptsSnapshot.forEach((attemptDoc) => {
          const attemptData = attemptDoc.data();
          const attemptTime = attemptData.attempt_time.toDate();
          const attemptHour = attemptTime.getHours();
  
          for (const interval of hourIntervals) {
            if (attemptHour >= interval.start && attemptHour < interval.end) {
              const intervalKey = `${interval.start}-${interval.end}`;
              attemptsCountByHourInterval[intervalKey]++;
              break;
            }
          }
        });
      }
    }
  
    results.push({
      attemptsCountByHourInterval: attemptsCountByHourInterval,
    });
  
    return results;
  }
export async function addRouteToDB(roomID, routeName, routeGrade) {
    const routesCollRef = collection(db, 'rooms', roomID, 'routes');
    console.log("routeName",routeName);
    console.log("routeGrade",routeGrade);
    //TODO: Reference on user and not just string
    //console.log("routeSetter",auth.currentUser.uid);
    const routeInfo = {
      name: routeName,
      difficulty: routeGrade,
      routesetter: "/users/"+auth.currentUser.uid,
    };
    try {
      const newRouteDocRef = await addDoc(routesCollRef, routeInfo);
      console.log('Added document with ID:', newRouteDocRef.id);
    } catch(error){
      console.error('Error adding document:', error);
    }
  }
