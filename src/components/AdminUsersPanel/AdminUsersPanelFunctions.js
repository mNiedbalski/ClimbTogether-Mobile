import { fetchUsersFromDB } from '../../databaseFunctions/userFunctions';

export async function extractUsersGendersCount() {
    const users = await fetchUsersFromDB();
    let maleUsersCount = 0;
    let femaleUsersCount = 0;
    let otherUsersCount = 0;
    users?.forEach(user => {
        if (user.sex === "male")
            maleUsersCount++;
        else if (user.sex === "female")
            femaleUsersCount++;
        else
            otherUsersCount++;
    });
    const userGendersCount = {
        male: maleUsersCount,
        female: femaleUsersCount,
        other: otherUsersCount
    }
    return userGendersCount;  
}