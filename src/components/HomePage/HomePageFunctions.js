import { getBasicUserInfoFromDB, getRoutesCompletedCountFromDB } from '../../databaseFunctions/fetchingFunctions';

export const parseUserExp = (experiencePoints) => {
    const roundedPercentage = Math.round(experiencePoints * 10);
    const remainder = roundedPercentage % 10;
    
    return remainder === 0 ? `${roundedPercentage / 10}%` : `${roundedPercentage}%`;
};