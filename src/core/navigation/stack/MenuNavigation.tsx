import React, { useEffect } from "react";
import {
    Routes,
    MenuTabNavigationProps,
    NavigationParamsList,
} from '~/core/navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Menu } from "~/features/menu";

const MenuStack = createNativeStackNavigator<NavigationParamsList>()

const MenuNavigation: React.FC<MenuTabNavigationProps> = () => {
    return (
        <MenuStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <MenuStack.Screen
                name={Routes.MenuContainer}
                component={Menu}
            />

        </MenuStack.Navigator>
    )
}

export default MenuNavigation;