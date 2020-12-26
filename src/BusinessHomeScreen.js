import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddRewards from './AddRewards'
import RedeemPoints from './RedeemPoints'

const Tab = createBottomTabNavigator();

export default function BusinessHomeScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add Rewards" component={AddRewards} />
        <Tab.Screen name="Redeem" component={RedeemPoints} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}