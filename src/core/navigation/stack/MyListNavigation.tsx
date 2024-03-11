import React, { useEffect } from "react";
import {
    Routes,
    MyListTabNavigationProps,
    NavigationParamsList,
} from '~/core/navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyList } from "~/features/myList";

const MyListStack = createNativeStackNavigator<NavigationParamsList>()

const MyListNavigation: React.FC<MyListTabNavigationProps> = () => {
    return (
        <MyListStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <MyListStack.Screen
                name={Routes.MyListsContainer}
                component={MyList}
            />

        </MyListStack.Navigator>
    )
}

export default MyListNavigation;