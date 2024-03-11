import React, { useEffect, useState } from 'react';
import { Text, } from '@rneui/themed';
import { colors, fonts, radius, spaces } from '~/core/constants';
import { StyleSheet, View } from 'react-native';
import coreStyles from '~/core/styles'
import { propertyDetailsPageStrings } from '../../../constant';
import { renderFactsItemType } from '../../../type';


type FactsTabItems = {
    getHeight?: number
    parentCallback: (height: number) => void
}

const FactsTabItems: React.FC<FactsTabItems> = ({ getHeight, parentCallback }) => {
    const factsData = [
        {
            title: propertyDetailsPageStrings.label.type,
            value: 'detaced'
        },
        {
            title: propertyDetailsPageStrings.label.levels,
            value: '22'
        },
        {
            title: propertyDetailsPageStrings.label.size,
            value: 'dfds'
        },
        {
            title: propertyDetailsPageStrings.label.taxes,
            value: 'tree'
        },
        {
            title: propertyDetailsPageStrings.label.daysActive,
            value: 'vbvb'
        },
        {
            title: propertyDetailsPageStrings.label.lotSize,
            value: 'ewrew'
        },
        {
            title: propertyDetailsPageStrings.label.approxAge,
            value: 'iuoiuo'
        },

    ]

    const [height, setHeight] = useState(0)
    useEffect(() => {
        parentCallback(height)
    }, [height])
    return (
        <View
            onLayout={({ nativeEvent }) => {
                const { x, y, width, height } = nativeEvent.layout
                setHeight(height)
            }}>
            {
                factsData.map((ele, index) => {
                    let evenRow = index % 2 == 0;
                    return (
                        <View style={
                            [styles.renderFactsItemContainer, styles.rowStyle, evenRow && styles.evenRowStyle]
                        } key={index}>
                            <Text style={styles.renderFactsItemTitleText}>{ele.title}</Text>
                            <Text style={styles.renderFactsItemValueText}>{ele.value}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
};
export default FactsTabItems;

const styles = StyleSheet.create({
    renderFactsItemContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        marginHorizontal: spaces.mds_global_space_12,
        paddingHorizontal: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_4,
        paddingVertical: spaces.mds_global_space_14,
    },
    rowStyle: {
        backgroundColor: colors.mds_global_color_white
    },
    evenRowStyle: {
        backgroundColor: colors.mds_global_color_light_pink,
        ...coreStyles.borderBottomGrey
    },
    tabItemContainer: {
        marginTop: spaces.mds_global_space_24
    },
    renderFactsItemTitleText: {
        ...fonts.style.mds_ui_font_footnote_bold,
        color: colors.mds_global_color_black_100
    },
    renderFactsItemValueText: {
        ...fonts.style.mds_ui_font_footnote_bold,
        color: colors.mds_global_color_grey_50,
        alignSelf: 'flex-start'
    }

})