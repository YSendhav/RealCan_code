import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { colors, fonts, spaces } from '~/core/constants'
import { Routes } from '../types'
import * as Icons from '~/core/svg'
import { TAB_ROUTE_TITLE } from '../constants'

const TabBarButton: FC<{
    title: string
    focused: boolean
    tabBarBadge: string | number | undefined
    onPress: () => void
}> = ({ title, focused, tabBarBadge, onPress }) => {
    const activeIconColor = colors.mds_global_color_gold_100
    const inactiveIconColor = colors.mds_global_color_black

    const color = focused ? activeIconColor : inactiveIconColor

    const BrowseTabIcon = Icons.MapIcon
    const SearchTabIcon = Icons.SearchOutlineIcon
    const NotificationTabIcon = Icons.NotificationsOutlineIcon
    const MyListsTabIcon = Icons.HeartOutlineIcon
    const MenuTabIcon = Icons.MenuOutlineIcon

    const tabBarIcon = () => {
        switch (title) {
            case Routes.Browse: {
                return <BrowseTabIcon color={color} size={22} />
            }
            case Routes.SearchPage: {
                return <SearchTabIcon color={color} size={22} />
            }
            case Routes.Notifications: {
                return <NotificationTabIcon color={color} size={22} />
            }
            case Routes.MyLists: {
                return <MyListsTabIcon color={color} size={22} />
            }
            case Routes.Menu: {
                return <MenuTabIcon color={color} size={22} />
            }
            default:
                break
        }
    }
    // for handling title from firebase toggle
    const tabBarTitle = () => {
        switch (title) {
            case Routes.Browse: {
                return TAB_ROUTE_TITLE.Browse
            }
            case Routes.SearchPage: {
                return TAB_ROUTE_TITLE.Search
            }
            case Routes.Notifications: {
                return TAB_ROUTE_TITLE.Notification
            }
            case Routes.MyLists: {
                return TAB_ROUTE_TITLE.MyList
            }
            case Routes.Menu: {
                return TAB_ROUTE_TITLE.More
            }
            default:
                break
        }

    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            activeOpacity={focused ? 1 : 0.2}
        >
            <View>
                {tabBarIcon()}
                {/* {tabBarBadge !== undefined && Number(tabBarBadge) > 0 && (
                    <Badge count={Number(tabBarBadge)} />
                )} */}
            </View>
            <Text
                style={[
                    focused && styles.title,
                    focused && styles.titleFocused,
                    { color: focused ? activeIconColor : inactiveIconColor },
                ]}
                numberOfLines={1}
            >
                {focused ? `${tabBarTitle()}` : null}
            </Text>
        </TouchableOpacity>
    )
}
export default TabBarButton;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...fonts.style.mds_ui_font_caption_regular,
        textAlign: 'center',
        width: '100%',
        marginTop: spaces.mds_global_space_2,
        lineHeight: 20,
    },
    titleFocused: {
        ...fonts.style.mds_ui_font_caption_semi,
        lineHeight: 20,
    },
})