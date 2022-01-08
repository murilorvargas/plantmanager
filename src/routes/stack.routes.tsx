import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import PlantSelect from '../pages/PlantSelect';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Welcome"
      component={Welcome}
    />
    <Stack.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <Stack.Screen
      name="Confirmation"
      component={Confirmation}
    />
    <Stack.Screen
      name="PlantSelect"
      component={PlantSelect}
    />
    <Stack.Screen
      name="PlantSave"
      component={PlantSave}
    />
    <Stack.Screen
      name="MyPlants"
      component={MyPlants}
    />
  </Stack.Navigator>
)

export default AppRoutes