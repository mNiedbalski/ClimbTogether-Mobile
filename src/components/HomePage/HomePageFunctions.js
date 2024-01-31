import { getBasicUserInfoFromDB, getRoutesCompletedCountFromDB } from '../../databaseFunctions/fetchingFunctions';

export const parseUserExp = (experiencePoints) => {
    experiencePoints = parseInt(experiencePoints);
    const roundedPercentage = Math.round(experiencePoints * 10);
    const remainder = roundedPercentage % 10;
    
    return `${roundedPercentage}%`;
};