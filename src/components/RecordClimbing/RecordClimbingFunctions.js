import { doc, updateDoc } from 'firebase/firestore';
import { getBasicUserInfoFromDB, fetchRouteFromDB, getUserExperienceFromDB, getRouteDifficultyFromDB, extractDifficultyValue } from '../../databaseFunctions/fetchingFunctions';
import { postAttemptToDB, updateUserExperience, updateUserLevel, updateUserHardestDifficultyInDB as updateUserHardestDifficultyInDB } from '../../databaseFunctions/postingFunctions';

export const calculateUserExperienceAndUpdate = async (checkedRoomID, checkedRouteID) => {
    let userExperience = await getUserExperienceFromDB();
    const completedRouteDifficulty = await getRouteDifficultyFromDB(checkedRouteID, checkedRoomID);
    const expPoints = extractDifficultyValue(completedRouteDifficulty);
    if (userExperience + expPoints >= 10) {
      updateUserLevel();
      userExperience = userExperience + expPoints - 10;
      updateUserExperience(userExperience);
    }
    else {
      userExperience = expPoints;
      updateUserExperience(userExperience);
    }
  }

export const updateRouteDifficulty = async (roomID, routeID) => {
    const route = await fetchRouteFromDB(roomID, routeID);
    const routeDifficultyExtracted = extractDifficultyValue(route.difficulty);
    const user = await getBasicUserInfoFromDB();
    const userDifficultyExtracted = extractDifficultyValue(user.difficulty);
    if (userDifficultyExtracted < routeDifficultyExtracted) {
      updateUserHardestDifficultyInDB(route.difficulty);
    }
}

export async function fetchRoute (roomID, routeID) { //check why there is a problem with returning this - probably it didnt manage to pass
    const route = await fetchRouteFromDB(roomID, routeID);
    console.log("Route fetched: ", route)
    return route;
}