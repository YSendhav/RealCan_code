import React, { FC } from 'react'
import { StyleSheet, View, Platform, Keyboard } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useAppDispatch, } from '~/store/hooks'
import coreStyles from '~/core/styles'
import TabBarButton from './TabBarButton'
import {
    TAB_BAR_HEIGHT,
    colors,
    spaces,
} from '~/core/constants'

import { Routes } from '~/core/navigation/types'


const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const dispatch = useAppDispatch()

    const currentRoute = state.routes[state.index]
    const focusedOptions = descriptors[currentRoute.key].options as {
        tabBarVisible?: boolean
    }
    const showShadow = currentRoute.name
    const insets = useSafeAreaInsets()


    const currentScreen =
        currentRoute.state?.routes?.length &&
            currentRoute.state?.index !== undefined &&
            currentRoute.state?.index < currentRoute.state?.routes?.length
            ? (currentRoute.state?.routes[currentRoute.state?.index])
            : undefined
    // const isTabBarInvisibleInScreen = currentScreen?.params
    //     ? currentScreen?.params?.withTabBar === false
    //     : (
    //         currentRoute?.params &&
    //         ((currentRoute?.params as { params: PrivacySettingsParams })
    //             ?.params as PrivacySettingsParams)
    //     )?.withTabBar === false

    if (focusedOptions.tabBarVisible === false) {
        return null
    }

    return (
        <View
            style={[
                styles.container,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                    height: insets.bottom + TAB_BAR_HEIGHT,
                    paddingBottom:
                        insets.bottom + spaces.mds_global_space_4,
                    paddingTop: spaces.mds_global_space_4,
                    ...coreStyles.dividerTop

                },
            ]}
        >
            {state.routes.map((route, index) => {
                const history = state.history
                const previousRouteState = history[history.length - 1]

                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                };


                return (
                    <TabBarButton
                        key={route.key}
                        title={route.name}
                        onPress={onPress}
                        focused={isFocused}
                        tabBarBadge={options.tabBarBadge}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mds_global_color_white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shadow: {
        ...Platform.select({
            android: {
                ...coreStyles.shadowTabBarAndroid,
            },
            ios: {
                ...coreStyles.shadowTabBar,
            },
        }),
    },
})

export default React.memo(TabBar)
