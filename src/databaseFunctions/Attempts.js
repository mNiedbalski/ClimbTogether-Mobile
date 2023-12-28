import { auth, db } from '../../App';
//import { getDoc,getDocs, doc, collection } from 'firebase/firestore/lite'; //Lite version, but I need more powerful queries
import { getDoc, getDocs, doc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { extractDifficultyValue } from './fetchingFunctions';

export const fetchAttemptsByRatingRange = async (gymID) => {
    const gymDoc = await getDoc(doc(db, 'gyms', gymID));
    const gymData = gymDoc.data();
  
    const ratingRanges = {
      V0_V2: { min: 0, max: 2 },
      V3_V6: { min: 3, max: 6 },
      V7_V10: { min: 7, max: 10 },
      V11_and_above: { min: 11, max: Infinity },
    };
  
    const results = {
      V0_V2: 0,
      V3_V6: 0,
      V7_V10: 0,
      V11_and_above: 0,
    };
  
    for (const roomRef of gymData.rooms) {
      const roomDoc = await getDoc(roomRef);
      const routesSnapshot = await getDocs(collection(roomDoc.ref, 'routes'));
  
      for (const routeDoc of routesSnapshot.docs) {
          const routesColl = collection(routeDoc.ref, 'attempts');
          const routesSnapshot = await getCountFromServer(routesColl);
          const difficulty = extractDifficultyValue(routeDoc.data().difficulty);
          if (difficulty >= ratingRanges.V0_V2.min && difficulty <= ratingRanges.V0_V2.max) {
            results.V0_V2+=routesSnapshot.data().count;
          } else if (difficulty >= ratingRanges.V3_V6.min && difficulty <= ratingRanges.V3_V6.max) {
            results.V3_V6+=routesSnapshot.data().count;
          } else if (difficulty >= ratingRanges.V7_V10.min && difficulty <= ratingRanges.V7_V10.max) {
            results.V7_V10+=routesSnapshot.data().count;
          } else if (difficulty >= ratingRanges.V11_and_above.min) {
            results.V11_and_above+=routesSnapshot.data().count;
          }
      }
    }
    return results;
  };