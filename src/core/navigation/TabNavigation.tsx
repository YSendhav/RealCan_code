import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainScreenStackNavigationProp, Routes, TabParamList } from './types'
import TabBar from './tabs/TabBar'
import { useAppDispatch } from '~/store/hooks'
import { useNavigation } from '@react-navigation/native'
import { BrowseNavigation, MenuNavigation, MyListNavigation, NotificationNavigation, SearchPageNavigation } from './stack'
import { TAB_ROUTE_TITLE } from './constants'

const Tab = createBottomTabNavigator<TabParamList>()

const TabNavigation: React.FC = () => {
    const navigation = useNavigation<MainScreenStackNavigationProp>()
    const dispatch = useAppDispatch()

    return (

        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={() => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                keyboardHidesTabBar: false,
                style: {
                    position: 'absolute',
                },

            })}
        >
            <Tab.Screen name={Routes.Browse} component={BrowseNavigation} />
            <Tab.Screen
                options={{
                    tabBarHideOnKeyboard: true
                }} name={Routes.SearchPage} component={SearchPageNavigation} />
            <Tab.Screen name={Routes.Notifications} component={NotificationNavigation} />
            <Tab.Screen
                options={{ headerShown: true, headerTitleAlign: 'center', title: TAB_ROUTE_TITLE.MyList }}
                name={Routes.MyLists} component={MyListNavigation} />
            <Tab.Screen name={Routes.Menu} component={MenuNavigation} />
        </Tab.Navigator>

    )
}

export default TabNavigation