import React, { useEffect } from "react";
import {
    Routes,
    NotificationsTabNavigationProps,
    NavigationParamsList,
} from '~/core/navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notification } from "~/features/notification";

const NotificationStack = createNativeStackNavigator<NavigationParamsList>()

const NotificationNavigation: React.FC<NotificationsTabNavigationProps> = () => {
    return (
        <NotificationStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <NotificationStack.Screen
                name={Routes.NotificationsConatainer}
                component={Notification}
            />

        </NotificationStack.Navigator>
    )
}

export default NotificationNavigation;