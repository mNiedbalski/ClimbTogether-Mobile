import { auth, db } from '../../App';
//import { getDoc,getDocs, doc, collection } from 'firebase/firestore/lite'; //Lite version, but I need more powerful queries
import { getDoc, getDocs, doc, collection, query, where, getCountFromServer } from 'firebase/firestore';
import { Achievement } from '../Entities/achievement';
import { Role } from '../Entities/role';

export async function fetchRouteFromDB(roomID, routeID) {
  const routeDocRef = doc(db, "rooms", roomID, "routes", routeID);
  const routeSnapshot = await getDoc(routeDocRef);
  const fetchedRoute = await parseRoute(routeSnapshot.data(), routeDocRef.id);
  console.log("Info o trasie", fetchedRoute);
  return fetchedRoute;
}
async function parseRoute(routeData, routeID) {
  const routeSetterInfo = await fetchRouteSetterNameFromDB(routeData, routeID);
  const routeInfo = {
    id: routeID,
    name: routeData.name,
    difficulty: routeData.difficulty,
    routeSetter: routeSetterInfo,
  };
  return routeInfo;
}

export async function fetchRouteSetterNameFromDB(routeData) {
  if (routeData && routeData.routesetter) {
    const routesetterSnapshot = await getDoc(routeData.routesetter);
    const routesetterData = routesetterSnapshot.data();
    if (routesetterData) {
      const fullName = `${routesetterData.name} ${routesetterData.surname}`;
      return fullName;
    }
    return null;
  }
}

export async function getUserExperienceFromDB() {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userSnapshot = await getDoc(userDocRef);
  const userData = userSnapshot.data();
  console.log("userExp", userData.experience_points);
  return userData.experience_points;
}
export async function getRouteDifficultyFromDB(routeID, roomID) {
  const routeDocRef = doc(db, "rooms", roomID, "routes", routeID);
  const routeSnapshot = await getDoc(routeDocRef);
  const routeData = routeSnapshot.data();
  return routeData.difficulty;
}

//DEPRECATED - There is more efficient way to do this by just comparing on the spot
export async function findMaxDifficultyRoute() {
  const userAttemptsCollectionRef = collection(db, "users", auth.currentUser.uid, "attempts");
  const userAttemptsSnapshot = await getDocs(userAttemptsCollectionRef);
  const userAttemptsIDs = userAttemptsSnapshot.docs.map(doc => doc.id);

  // Pobierz trasy z takimi samymi IDs jak attempts użytkownika
  const routesWithUserAttempts = [];

  // Iteruj przez pomieszczenia
  const roomsCollectionRef = collection(db, "rooms");
  const roomsSnapshot = await getDocs(roomsCollectionRef);

  for (const roomDoc of roomsSnapshot.docs) {
    const roomID = roomDoc.id;

    // Iteruj przez trasy w pomieszczeniu
    const routesCollectionRef = collection(db, "rooms", roomID, "routes");
    const routesSnapshot = await getDocs(routesCollectionRef);

    for (const routeDoc of routesSnapshot.docs) {
      const routeID = routeDoc.id;

      // Iteruj przez attempts w trasie
      const attemptsCollectionRef = collection(db, "rooms", roomID, "routes", routeID, "attempts");

      for (const attemptID of userAttemptsIDs) {
        const routeRef = doc(attemptsCollectionRef, attemptID);
        const routeSnapshot = await getDoc(routeRef);

        if (routeSnapshot.exists()) {
          routesWithUserAttempts.push(routeDoc.data());
        }
      }
    }
  }

  // Znajdź trasę o najwyższym poziomie trudności
  let maxDifficultyRoute = null;
  let maxDifficulty = -1;

  for (const route of routesWithUserAttempts) {
    const difficultyValue = extractDifficultyValue(route.difficulty);

    if (difficultyValue > maxDifficulty) {
      maxDifficulty = difficultyValue;
      maxDifficultyRoute = route;
    }
  }

  return maxDifficultyRoute;
};

export const extractDifficultyValue = (difficulty) => {
  if (difficulty) {
    const match = difficulty.match(/V(\d+)([+-])?/);

    if (match) {
      const value = parseInt(match[1], 10);
      const modifier = match[2] === '-' ? -0.5 : match[2] === '+' ? 0.5 : 0;

      return value + modifier;
    }
  }
  return 0;
};

export async function getRoutesCompletedCountFromDB() {
  const attemptsCollectionRef = collection(db, "users", auth.currentUser.uid, "attempts");
  const q = query(attemptsCollectionRef, where("top_reached", "==", true));
  const querySnapshot = await getCountFromServer(q);
  return querySnapshot.data().count;
};

export async function fetchGymsFromDB() {
  const gymsCollectionRef = collection(db, "gyms");
  const gymsSnapshot = await getDocs(gymsCollectionRef);
  const fetchedGyms = await parseGyms(gymsSnapshot);
  return fetchedGyms;
}
export async function parseGyms(gymsSnapshot) {
  let gyms = [];

  gymsSnapshot.forEach((doc) => {
    const gymData = doc.data();
    const gymInfo = {
      id: doc.id,
      name: gymData.name,
    };
    gyms.push(gymInfo);
  });
  return gyms;
}
export async function fetchRoomsFromDB(gymID) {
  const gymDocRef = doc(db, "gyms", gymID);
  const gymSnapshot = await getDoc(gymDocRef);
  const roomsData = await parseRooms(gymSnapshot.data().rooms);
  return roomsData;
}

async function parseRooms(roomsRefs) {
  const roomsDataPromises = roomsRefs.map(async (roomRef) => {

    const roomDoc = await getDoc(roomRef);
    const roomData = roomDoc.data();
    const roomInfo = {
      id: roomRef.id,
      name: roomData.name,
    };
    return roomInfo;
  });
  const roomsDataArray = await Promise.all(roomsDataPromises);
  return roomsDataArray;
}
export async function fetchAllRoutesFromGym(gymID) {
  const gymDocRef = doc(db, "gyms", gymID);
  const gymSnapshot = await getDoc(gymDocRef);

  if (!gymSnapshot.exists()) {
    console.error("Gym not found");
    return [];
  }

  const gymData = gymSnapshot.data();
  const allRoutes = [];

  // Iteracja przez referencje do rooms w danym gymie
  for (const roomRef of gymData.rooms) {
    const roomID = roomRef.id;

    // Wywołanie funkcji fetchRoutesFromDB dla danego room
    const routesFromRoom = await fetchRoutesFromDB(roomID);

    // Dodanie tras z danego room do ogólnej tablicy
    allRoutes.push(...routesFromRoom);
  }

  return allRoutes;
}
export async function fetchRoutesFromDB(roomID) {
  const routesCollectionRef = collection(db, "rooms", roomID, "routes");
  const routesSnapshot = await getDocs(routesCollectionRef);
  const fetchedRoutes = await parseRoutes(routesSnapshot, roomID);
  return fetchedRoutes;
}
async function parseRoutes(routesSnapshot, routeRoomID) {
  let routes = [];
  routesSnapshot.forEach((doc) => {
    const routeData = doc.data();
    const routeInfo = {
      id: doc.id,
      name: routeData.name,
      roomID: routeRoomID,
    };
    routes.push(routeInfo);
  });
  return routes;
}

export async function getBasicUserInfoFromDB() {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userSnapshot = await getDoc(userDocRef);
  const fetchedUser = await parseUser(userSnapshot.data());
  return fetchedUser;
}
async function parseUser(userData) {
  console.log("userData",userData);
  const rolesDataPromises = userData.roles.map(async (roleRef) => {
    const roleDoc = await getDoc(roleRef);
    const roleData = roleDoc.data();
    return new Role(roleRef.id, roleData.role_name);
  });
  const rolesDataArray = await Promise.all(rolesDataPromises);

  const achievementsDataPromises = userData.achievements.map(async (achievementRef) => {
    const achievementDoc = await getDoc(achievementRef);
    const achievementData = achievementDoc.data();
    return new Achievement(achievementRef.id, achievementData.name, achievementData.criteria, new Date(achievementData.date_acquired.toDate()));
  });
  const achievementsDataArray = await Promise.all(achievementsDataPromises);
  const parsedUser = {
    id: auth.currentUser.uid,
    name: userData.name,
    surname: userData.surname,
    experience_points: userData.experience_points,
    height: userData.height,
    weight: userData.weight,
    level: userData.level,
    sex: userData.sex,
    hardest_difficulty: userData.hardest_difficulty,
    birthday: new Date(userData.birthday.toDate()),
    roles: rolesDataArray,
    achievements: achievementsDataArray,
  };
  return parsedUser;
}