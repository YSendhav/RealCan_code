import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FastImage, { Source } from 'react-native-fast-image'
import images from '~/core/assets/images'
import { colors, fonts, radius, spaces } from '~/core/constants'
// import { Avatar, Button, Card, CardProps, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { heightToDp, widthToDp } from '~/core/constants/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardIconsSet } from '~/core/components'
import { Card } from '@rneui/themed';


type CardV2Props = {
    // TODO after we get dynemic data then it's require.
    images?: Source
    price?: number | string
    location?: string
    fValue?: number | string
    bValue?: number | string
    lValue?: number | string
    pValue?: number | string
    isCarIcon?: boolean
    containerStyle?: ViewStyle
}

const CardV2: React.FC<CardV2Props> = ({
    images,
    price,
    location,
    fValue,
    bValue,
    lValue,
    pValue,
    isCarIcon,
    containerStyle
}) => {

    const insets = useSafeAreaInsets();
    const spliteStrLocation = location?.replace(",", "\n")

    return (

        <View style={[styles.container, containerStyle]}>
            <View style={styles.imageContainer}>
                <FastImage
                    source={images}
                    style={styles.image}
                    resizeMode='stretch'
                />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.priceText}>{price}</Text>
                <Text style={styles.locationText}>{spliteStrLocation}</Text>
                <CardIconsSet
                    isFurnitureValue={fValue}
                    isBathValue={bValue}
                    isLotSizeValue={lValue}
                    isParkingValue={pValue}
                    isCarIcon={isCarIcon}
                />
            </View>

        </View>


    )
}

export default CardV2;

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.mds_global_radius_18,
        // flex: 1,
        marginBottom: spaces.mds_global_space_14,
        ...coreStyles.flexDirectionRow,
        backgroundColor: colors.mds_global_color_white,
        shadowColor: colors.mds_global_color_black_100,
        shadowOffset: { width: 1, height: 0.8 },
        shadowOpacity: 0.4,
        shadowRadius: radius.mds_global_radius_2,
        elevation: 5,
        zIndex: 99,

    },
    image: {
        width: widthToDp(28),
        height: widthToDp(35),
        borderTopLeftRadius: radius.mds_global_radius_18,
        borderBottomLeftRadius: radius.mds_global_radius_18,
    },
    imageContainer: {
        flex: 3,

    },
    contentContainer: {
        flex: 6,
        paddingLeft: spaces.mds_global_space_16,
        paddingRight: spaces.mds_global_space_12
    },
    priceText: {
        ...fonts.style.mds_ui_font_body_bold,
        fontWeight: '600'
    },
    locationText: {
        ...fonts.style.mds_ui_font_medium_bold,
        color: colors.mds_global_color_grey_50,
        paddingTop: spaces.mds_global_space_4,
    }
})