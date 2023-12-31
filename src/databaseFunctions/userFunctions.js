import { auth, db } from '../../App';
import { runTransaction, collection, addDoc, setDoc, doc, updateDoc, getDoc, getDocs } from 'firebase/firestore';

export async function updateUserInDB(postedName, postedSurname, postedHeight, postedWeight, postedSex, postedBirthday) {
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

export async function fetchUsersNameSurnameIDFromDB() {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);

  const usersList = [];

  for (const doc of usersSnapshot.docs) {
    const userData = doc.data();
    const rolesRefs = userData.roles;
    let isRoutesetter = false;
    let isAdmin = false;
    const rolesData = await Promise.all(rolesRefs.map((roleRef) => getDoc(roleRef).then((roleDoc) => roleDoc.data())));
    for (const role of rolesData) {
      if (role.role_name === 'routesetter') {
        isRoutesetter = true;
      }
      else if (role.role_name === 'admin') {
        isAdmin = true;
      }
    }
    const userWithRoles = {
      name: userData.name,
      surname: userData.surname,
      id: doc.id,
      isRoutesetter: isRoutesetter,
      isAdmin: isAdmin,
    };

    usersList.push(userWithRoles);
  }
  usersList.sort((a, b) => a.surname.localeCompare(b.surname));

  return usersList;
}

export async function fetchUsersFromDB() {
  const usersCol = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map(doc => doc.data());
}
export async function giveRouteSetterRole(userID) {
  const userRef = doc(db, "users", userID);
  const userRoleRef = doc(db, "roles", "userRole");
  const routeSetterRoleRef = doc(db, "roles", "routesetterRole");

  const userData = {
    roles: [userRoleRef, routeSetterRoleRef]
  }
  await updateDoc(userRef, userData);
  console.log("Document written with ID: ", userRef.id);
}
export async function revokeRouteSetterRole(userID){
  const userRef = doc(db, "users", userID);
  const userRoleRef = doc(db, "roles", "userRole");

  const userData = {
    roles: [userRoleRef]
  }
  await updateDoc(userRef, userData);
  console.log("Document written with ID: ", userRef.id);
}