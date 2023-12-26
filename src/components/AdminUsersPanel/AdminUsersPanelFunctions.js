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
export async function extractUsersAgeGroups(){
    const users = await fetchUsersFromDB();
    let ageGroups = {
        "1-12": 0,
        "12-17": 0,
        "18-24": 0,
        "25-34": 0,
        "35-44": 0,
        "45-54": 0,
        "55-74": 0,
        "75+": 0,
    }
    users?.forEach(user => {
        const age = 16; //calculateAge(user.birthday);
        if(age <= 12)
            ageGroups["1-12"]++;
        else if(age <= 17)
            ageGroups["12-17"]++;
        else if(age <= 24)
            ageGroups["18-24"]++;
        else if(age <= 34)
            ageGroups["25-34"]++;
        else if(age <= 44)
            ageGroups["35-44"]++;
        else if(age <= 54)
            ageGroups["45-54"]++;
        else if(age <= 74)
            ageGroups["55-74"]++;
        else
            ageGroups["75+"]++;
    });
    return ageGroups;
}
function calculateAge(birthday) {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}