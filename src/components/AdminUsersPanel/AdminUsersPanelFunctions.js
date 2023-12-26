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
export async function extractUsersBMI(){
    const users = await fetchUsersFromDB();
    let underweightCount = 0;
    let normalCount = 0;
    let overweightCount = 0;
    let obeseCount = 0;
    users?.forEach(user => {
        const bmi = user.weight/((user.height/100)*(user.height/100));
        if(bmi < 18.5)
            underweightCount++;
        else if(bmi < 25)
            normalCount++;
        else if(bmi < 30)
            overweightCount++;
        else
            obeseCount++;
    });
    const usersBMI = {
        underweight: underweightCount,
        normal: normalCount,
        overweight: overweightCount,
        obese: obeseCount
    }
    return usersBMI;
}
export async function extractUsersAgeGroups(){
    const users = await fetchUsersFromDB();
    console.log(users)
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
        const userBirthday = new Date(user.birthday.toDate());
        const age = calculateAge(userBirthday);
        console.log("age", age)
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
    console.log(birthDate);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    console.log(age);
    return age;
}