import { FlatList, Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icons from '~/core/svg'
import { SearchBarStrings } from '../constant'
import FastImage from 'react-native-fast-image'
import images from '~/core/assets/images'
import coreStyles from '~/core/styles'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { getImageSize } from '~/core/utils/imageHelper'
import { searchMockDataType } from "../type";
import { useNavigation } from '@react-navigation/native'
import { Routes, SearchPageTabNavigationProps } from '~/core/navigation/types'

type SearchSuggationBarProps = {
    searchSuggationData: searchMockDataType[]
    // TODO if api will be use then item props will provide type
    onPressGetItem: (item: any) => void
}

const SearchSuggationBar: React.FC<SearchSuggationBarProps> = ({
    searchSuggationData,
    onPressGetItem

}) => {
    const navigation = useNavigation<SearchPageTabNavigationProps['navigation']>()
    const ItemView = (item: any) => {
        const listItem = item?.item
        const getCityText = listItem?.propertyAddress.split(',')[1].trim()
        return (
            <TouchableOpacity style={styles.locationContainer} onPress={() => onPressGetItem(listItem)}>
                <View>
                    <Text style={styles.locationHeading}>{getCityText}</Text>
                    <Text style={styles.locationSubHeading}>ON</Text>
                </View>
                <Text style={styles.whereLocationStatus}>City</Text>

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>

            <View style={styles.headingContainer}>
                <View style={{ ...coreStyles.flexDirectionRow }}>
                    <Icons.MapIcon size={14} color={colors.mds_global_color_grey_30} />
                    <Text style={styles.locationTextContent}>{SearchBarStrings.label.LOCATIONS}</Text>
                </View>
                <FastImage
                    source={images.poweredByGoogle}
                    resizeMode='contain'
                    style={{
                        width: 90,
                        height: 30,
                    }}
                />
            </View>
            <View>
                <FlatList
                    data={searchSuggationData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                />
            </View>
        </View>
    )
}

export default SearchSuggationBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mds_global_color_white,
        ...coreStyles.shadow,
        borderRadius: radius.mds_global_radius_4,
        flex: 1,
        paddingHorizontal: spaces.mds_global_space_10,
        overflow: 'hidden',

    },
    headingContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_10
    },
    locationTextContent: {
        ...fonts.style.mds_ui_font_caption_semi,
        color: colors.mds_global_color_grey_30,
        paddingLeft: spaces.mds_global_space_4

    },
    locationHeading: {
        ...fonts.style.mds_ui_font_medium_semi,
        color: colors.mds_global_color_black,
    },
    locationSubHeading: {
        ...fonts.style.mds_ui_font_caption_bold,
        color: colors.mds_global_color_grey_40,
    },
    whereLocationStatus: {
        ...fonts.style.mds_ui_font_footnote_regular,
        color: colors.mds_global_color_grey_30,
        alignSelf: 'flex-end'
    },
    locationContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_14,

    }
})