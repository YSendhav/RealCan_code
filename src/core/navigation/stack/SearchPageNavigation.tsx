import React, { useEffect } from "react";
import {
    Routes,
    SearchPageTabNavigationProps,
    NavigationParamsList,
} from '~/core/navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Search } from "~/features/search";



const SearchPageStack = createNativeStackNavigator<NavigationParamsList>()


const SearchPageNavigation: React.FC<SearchPageTabNavigationProps> = () => {
    return (
        <SearchPageStack.Navigator
            screenOptions={() => ({
                headerShown: false,
            })}
        >
            <SearchPageStack.Screen
                name={Routes.SearchPageContainer}
                component={Search}
            />

        </SearchPageStack.Navigator>
    )
}

export default SearchPageNavigation;