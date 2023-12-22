import { updateRouteInfoInDB } from "../../databaseFunctions/viewRouteDB";
import {fetchRouteFromDB, extractDifficultyValue} from "../../databaseFunctions/fetchingFunctions";
export async function handleModify(routeID, roomID, routeName) {
    const newRouteData = {
        name: routeName,
        //I specifically dont allow routesetter to change difficulty, because then algorithm
        //of updating maxDifficulty in users and exp update would be extremely complicated.
        //Therefore, I leave possibility for implementing it in the future, but this algorithm complexity would be near O(n^4)
    };
    updateRouteInfoInDB(routeID, roomID, newRouteData);
};