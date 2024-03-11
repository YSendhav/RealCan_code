import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { NavigationContainer, DefaultTheme, LinkingOptions, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { colors } from "~/core/constants";
import { navigationRef } from "./RootNavigation";
import { NavigationParamsList, Routes } from "./types";
import TabNavigation from "./TabNavigation";

const RootStack = createStackNavigator<NavigationParamsList>()

const Navigation: React.FC = () => {
    const AppTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.mds_global_color_grey_20,
        },
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <NavigationContainer

                    theme={AppTheme}
                    ref={navigationRef}
                >
                    <RootStack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}>
                        <RootStack.Screen
                            name={Routes.Landing}
                            component={TabNavigation}
                        />

                    </RootStack.Navigator>
                </NavigationContainer>
            </View>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mds_global_color_white,
    }
})

export default Navigation;