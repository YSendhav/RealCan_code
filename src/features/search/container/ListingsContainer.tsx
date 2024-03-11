import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Icons from '~/core/svg'
import { SearchBarStrings } from '../constant'
import coreStyles from '~/core/styles'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { getImageSize } from '~/core/utils/imageHelper'

type Props = {}

const ListingsContainer = () => {
    const imageSize = getImageSize()
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>

                <Icons.ListingsIcon size={14} color={colors.mds_global_color_grey_30} />
                <Text style={styles.locationTextContent}>{SearchBarStrings.label.LISTINGS}</Text>

            </View>
            <ScrollView>
                <View style={styles.locationContainer}>
                    <View>
                        <Text style={styles.locationHeading}>Milton-1583 Beaty Tr </Text>
                        <Text style={styles.locationSubHeading}>Milton, ON . W5817822</Text>
                    </View>
                    <Text style={styles.rentStatus}>For Rent</Text>
                </View>

            </ScrollView>
        </View>

    )
}

export default ListingsContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mds_global_color_white,
        ...coreStyles.shadow,
        borderRadius: radius.mds_global_radius_4,
        flex: 1,
        paddingHorizontal: spaces.mds_global_space_10

    },
    headingContainer: {
        ...coreStyles.flexDirectionRow,
        paddingTop: spaces.mds_global_space_14
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
    rentStatus: {
        ...fonts.style.mds_ui_font_footnote_regular,
        color: colors.mds_global_color_blue_30,
        alignSelf: 'flex-end'
    },
    locationContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_14
    }
})