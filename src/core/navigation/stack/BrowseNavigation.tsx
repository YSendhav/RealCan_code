import React, { useEffect } from "react";
import {
    Routes,
    BrowseTabNavigationProps,
    NavigationParamsList,
} from '~/core/navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Browse } from "~/features/browse";
import { PropertyDetailsPage } from "~/features/propertyDetails";


const BrowseStack = createNativeStackNavigator<NavigationParamsList>()


const BrowseNavigation: React.FC<BrowseTabNavigationProps> = () => {
    return (
        <BrowseStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <BrowseStack.Screen
                name={Routes.BrowseConatiner}
                component={Browse}
            />
            <BrowseStack.Screen
                name={Routes.PropertyDetailsPage}
                component={PropertyDetailsPage}
            />

        </BrowseStack.Navigator>
    )
}

export default BrowseNavigation;