import {auth,db} from '../../App';
import { getDoc, doc } from 'firebase/firestore/lite';
import {User} from '../Entities/user';
import {Attempt} from '../Entities/attempt';
import {Achievement} from '../Entities/achievement';
import {Role} from '../Entities/role';

export async function getUserFromDB(db) {
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const userSnapshot = await getDoc(userDocRef);
  const fetchedUser = await parseUser(userSnapshot.data());
  return fetchedUser;
}
export async function parseUser(userData) {
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
    const rolesDataPromises = userData.roles.map(async (roleRef) => {
      const roleDoc = await getDoc(roleRef);
      const roleData = roleDoc.data();
      return new Role(roleRef.id, roleData.role_name);
    });
    const attemptsDataPromises = userData.attempts.map(async (attemptRef) => {
      const attemptDoc = await getDoc(attemptRef);
      const attemptData = attemptDoc.data();
      return new Attempt(attemptRef.id, new Date(attemptData.attempt_time.toDate()), attemptData.completion_time, attemptData.zone_reached, attemptData.top_reached);
    });
  
    const achievementsDataPromises = userData.achievements.map(async (achievementRef) => {
      const achievementDoc = await getDoc(achievementRef);
      const achievementData = achievementDoc.data();
      return new Achievement(achievementRef.id, achievementData.name, achievementData.criteria, new Date(achievementData.date_acquired.toDate()));
    });
    const rolesDataArray = await Promise.all(rolesDataPromises);
    const achievementsDataArray = await Promise.all(achievementsDataPromises);
    const attemptsDataArray = await Promise.all(attemptsDataPromises);
  
    parsedUser.attempts = attemptsDataArray;
    parsedUser.achievements = achievementsDataArray;
    parsedUser.roles = rolesDataArray;
    return parsedUser;
  }