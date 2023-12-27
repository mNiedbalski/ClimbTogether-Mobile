import React, { useState, useEffect, useCallback } from 'react';
import { Text, Box, Row, Column, Center, Select, ScrollView } from 'native-base';
import defaultStyles from '../../../AppStyles.style';
import recordClimbingStyles from '../SelectRoute/SelectRoute.style';
import { RouteAttemptsHeatMap } from '../../StatisticalCharts/RouteAttemptsHeatMap';
import { MostAttendedHoursChart } from '../../StatisticalCharts/MostAttendedHoursChart';
import { fetchGymsFromDB } from '../../databaseFunctions/fetchingFunctions';

const AdminGymPanel = ({ navigation }) => {
    const [gyms, setGyms] = useState([]);
    const [selectedGymID, setSelectedGymID] = useState('');
    useEffect(() => {
        const fetchGyms = async () => {
            const data = await fetchGymsFromDB();
            setGyms(data);
        }
        fetchGyms();
    }, []);
    handleGymChange = async (selectedGymID) => {
        setSelectedGymID(selectedGymID);
    };
    return (
        <Box style={defaultStyles.componentWrapper}>
            <Box style={defaultStyles.defaultContainer}>
                <Column>
                    <Text>Attempts frequency</Text>
                    <Box style={{ width: '100%' }}>
                        <Select
                            placeholder='Select a gym'
                            selectedValue={selectedGymID}
                            onValueChange={handleGymChange}
                            size="xl"
                            bg="#FDFCEC"
                            placeholderTextColor='#424242'
                        >
                            {gyms ? (
                                gyms.map((gym) => (
                                    <Select.Item label={gym.name} value={gym.id} key={gym.id} />
                                ))
                            ) : (
                                <Select.Item label="No gym selected" value={null} />
                            )}
                        </Select>
                    </Box>
                    <RouteAttemptsHeatMap gymID={selectedGymID} />
                    <Text>Attempts hours</Text>
                    <MostAttendedHoursChart gymID={selectedGymID} />
                </Column>
            </Box>
        </Box>
    )
};
export default AdminGymPanel;