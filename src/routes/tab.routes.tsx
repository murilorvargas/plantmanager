import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons';

import PlantSelect from '../pages/PlantSelect';
import MyPlants from '../pages/MyPlants';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: 'beside-icon',
        tabBarIconStyle: {
          maxHeight: 24,
          maxWidth: 24,
        },
        tabBarStyle: {
          height: 88,
          paddingHorizontal: 32,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.text,
          fontSize: 15,
        },
      }}
    >
      <AppTab.Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="add-circle-outline" size={size} color={color} />
          ))
        }}
      />
      <AppTab.Screen
        name="Minhas plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons name="format-list-bulleted" size={size} color={color} />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes