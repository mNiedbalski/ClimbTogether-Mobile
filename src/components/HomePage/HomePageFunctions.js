import { getBasicUserInfoFromDB, getRoutesCompletedCountFromDB } from '../../databaseFunctions/fetchingFunctions';

export const parseUserExp = (experiencePoints) => {
    return Math.round(experiencePoints) * 10 + "%";
};