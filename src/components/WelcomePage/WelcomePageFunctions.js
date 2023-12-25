import { getBasicUserInfoFromDB } from "../../databaseFunctions/fetchingFunctions";
export async function checkIfAdmin() {
    const userData = await getBasicUserInfoFromDB();
    console.log("userData", userData);
    if (userData && userData.roles) {
        for (const role of userData.roles) {
            if (role.role_name === 'admin') {
                console.log('User is admin')
                return true;
            }
        }
    } else {
        console.log('User isnt admin')
        return false;
    }
}