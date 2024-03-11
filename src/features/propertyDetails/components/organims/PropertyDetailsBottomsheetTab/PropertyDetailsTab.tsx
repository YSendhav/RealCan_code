import React, { useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { colors, fonts, radius, spaces } from '~/core/constants';
import { Dimensions, StyleSheet, View, } from 'react-native';
import coreStyles from '~/core/styles'
import { propertyDetailsPageStrings } from '../../../constant';
import FactsTabItems from './FactsTabItems';

export default () => {
    const [index, setIndex] = useState(0);
    const [viewHeight, setViewHeight] = useState<number>(0)
    const isFocused = index
    const activeTextColor = colors.mds_global_color_black_100
    const inactiveTextColor = colors.mds_global_color_grey_50
    const handleCallback = (childData: number) => {
        // Update the name in the component's state
        setViewHeight(childData)
    }

    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: colors.mds_global_color_black_100,
                    height: 4,
                }}
                style={styles.tabBarContainer}
            >
                <Tab.Item
                    title={propertyDetailsPageStrings.title.facts}
                    titleStyle={(active: boolean) => [styles.titleText, { color: active ? activeTextColor : inactiveTextColor }]}
                />
                <Tab.Item
                    title={propertyDetailsPageStrings.title.details}
                    titleStyle={(active: boolean) => [styles.titleText, { color: active ? activeTextColor : inactiveTextColor }]}
                />
                <Tab.Item
                    title={propertyDetailsPageStrings.title.rooms}
                    titleStyle={(active: boolean) => [styles.titleText, { color: active ? activeTextColor : inactiveTextColor }]}
                />
            </Tab>
            {/* <FactsTabItems /> */}

            <TabView value={index} onChange={setIndex} tabItemContainerStyle={styles.tabItemContainerStyle}
                containerStyle={styles.tabViewContainer}>
                <TabView.Item style={{ ...coreStyles.flex_1 }}>
                    <FactsTabItems parentCallback={handleCallback} />
                </TabView.Item>
                <TabView.Item style={{ ...coreStyles.flex_1 }}>
                    <Text style={{ color: isFocused ? activeTextColor : inactiveTextColor }}>Details</Text>
                </TabView.Item>
                <TabView.Item style={{ ...coreStyles.flex_1 }}>
                    <Text style={{ color: isFocused ? activeTextColor : inactiveTextColor }}>Rooms</Text>
                </TabView.Item>

            </TabView>


        </>

    );
};

const styles = StyleSheet.create({
    titleText: {
        ...fonts.style.mds_ui_font_small_bold
    },
    renderFactsItemContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        marginHorizontal: spaces.mds_global_space_12,
        paddingHorizontal: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_4,
        paddingVertical: spaces.mds_global_space_14,
    },
    tabBarContainer: {
        backgroundColor: colors.mds_global_color_white,
        shadowColor: colors.mds_global_color_black_100,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: radius.mds_global_radius_2,
        elevation: 5,
        flex: 1
    },
    tabItemContainer: {
        marginTop: spaces.mds_global_space_24,
    },
    tabItemContainerStyle: {
        paddingTop: spaces.mds_global_space_20
    },
    tabViewContainer: {
        height: 360
    },

})