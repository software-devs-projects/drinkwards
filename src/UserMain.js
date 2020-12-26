import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import UserHomeScreen from './UserHomeScreen'
import PurchaseHistory from './PurchaseHistory'

const Tab = createBottomTabNavigator();

export default function UserMain() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={UserHomeScreen} />
                <Tab.Screen name="Purchase History" component={PurchaseHistory} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}