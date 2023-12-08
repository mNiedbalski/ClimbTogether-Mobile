import { auth, db } from '../../App';
import { getDoc,getDocs, doc, collection } from 'firebase/firestore/lite';
import { User } from '../Entities/user';
import { Attempt } from '../Entities/attempt';
import { Achievement } from '../Entities/achievement';
import { Role } from '../Entities/role';
import {Gym} from '../Entities/gym';
import {Room} from '../Entities/room';
import {Route} from '../Entities/route';

export async function fetchGymsFromDB() {
  const gymsCollectionRef = collection(db,"gyms");
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
  const gymDocRef = doc (db, "gyms", gymID);
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
export async function fetchRoutesFromDB(roomID) {
  console.log("fetching routes from room: ", roomID);
  const routesCollectionRef = collection(db, "rooms", roomID, "routes");
  const routesSnapshot = await getDocs(routesCollectionRef);
  const fetchedRoutes = await parseRoutes(routesSnapshot);
  return fetchedRoutes;
}
async function parseRoutes(routesSnapshot) {
  let routes = [];
  routesSnapshot.forEach((doc) => {
    const routeData = doc.data();
    console.log("routeData", routeData);
    const routeInfo = {
      id: doc.id,
      name: routeData.name,
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
  console.log("parsing user data: ", userData);
  let parsedUser = new User();
  parsedUser.id = auth.currentUser.uid;
  parsedUser.name = userData.name;
  parsedUser.surname = userData.surname;
  parsedUser.experience_points = userData.experience_points;
  parsedUser.height = userData.height;
  parsedUser.weight = userData.weight;
  parsedUser.level = userData.level;
  parsedUser.sex = userData.sex;
  parsedUser.birthday = new Date(userData.birthday.toDate());
  console.log("parsed user: ", parsedUser);
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
  /* NOT NEEDED HERE
  const attemptsDataPromises = userData.attempts.map(async (attemptRef) => {
    const attemptDoc = await getDoc(attemptRef);
    const attemptData = attemptDoc.data();
    return new Attempt(attemptRef.id, new Date(attemptData.attempt_time.toDate()), attemptData.completion_time, attemptData.zone_reached, attemptData.top_reached);
  });
  const attemptsDataArray = await Promise.all(attemptsDataPromises);
*/
  parsedUser.roles = rolesDataArray;
  parsedUser.achievements = achievementsDataArray;
  console.log("parsed user: ", parsedUser);
  return parsedUser;
}