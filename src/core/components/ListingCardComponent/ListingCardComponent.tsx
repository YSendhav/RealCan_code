import { Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FastImage, { Source } from 'react-native-fast-image'
import images from '~/core/assets/images'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { Avatar, Button, Card, CardProps, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { widthToDp } from '~/core/constants/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CardIconsSet } from '~/core/components'
import { mockDataType } from '../_mock_data/MockData'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { Favourite } from '~/features/myList/type'


type ListingCardComponentProps = {
    // TODO after we get dynemic data then it's require.
    images?: Source
    price?: number
    location?: string
    count?: number
    timeRemaning?: string
    toggleFavourite?: boolean
    cardComponentItems: mockDataType
    cardClickEvent: () => void
    cardItemMLSNumber?: string
    favouriteItemClick?: () => void
    cardData?: mockDataType[]
}

const ListingCardComponent: React.FC<ListingCardComponentProps> = ({
    cardComponentItems,
    cardClickEvent,
    cardItemMLSNumber,
    cardData,
    favouriteItemClick,
    toggleFavourite

}) => {
    const cardItems = cardComponentItems
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch()
    const spliteStrLocation = cardItems?.propertyAddress?.replace(",", "\n")
    const getFavouriteListsFromStore = useAppSelector(state => state.favourite.favouriteList)


    return (
        <TouchableOpacity onPress={cardClickEvent} style={styles.container}>
            <Card style={styles.cardContainer}>
                <Card.Cover style={styles.cardCoverContainer} source={cardItems.cardImg} />
                <View style={styles.favouriteIconContainer}>
                    <TouchableOpacity onPress={favouriteItemClick}>
                        {
                            toggleFavourite ?
                                <Icons.HeartIcon size={24} color={colors.mds_global_color_white} style={styles.heartIconShadow} />
                                :
                                <Icons.HeartOutlineIcon size={24} color={colors.mds_global_color_white} style={styles.heartIconShadow} />
                        }
                    </TouchableOpacity>

                </View>
                <View style={styles.forSaleLabel}>
                    <Text style={styles.forSaleText}>{cardItems.sellingStatus}</Text>
                </View>
                <Card.Content style={styles.cardContentContainer}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.priceText} variant="titleLarge">{cardItems.price}</Text>
                        <Text style={styles.locationText} variant="bodyMedium">{spliteStrLocation}</Text>
                        <CardIconsSet />
                    </View>
                    <View style={styles.remaningContainer}>
                        <Text style={styles.remaningTimeText} variant="bodyMedium">{cardItems.activeStatus}</Text>
                    </View>

                </Card.Content>
            </Card>

        </TouchableOpacity>
    )
}

export default ListingCardComponent

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.mds_global_radius_16,
        marginHorizontal: spaces.mds_global_space_12,
        marginTop: spaces.mds_global_space_4,
        flex: 1,
        marginBottom: spaces.mds_global_space_18,
    },
    cardContainer: {
        borderRadius: radius.mds_global_radius_24,
        backgroundColor: colors.mds_global_color_white
    },
    cardCoverContainer: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderRadius: radius.mds_global_radius_24
    },
    cardContentContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        marginTop: spaces.mds_global_space_16,
    },
    priceText: {
        ...fonts.style.mds_ui_font_body_bold,
        color: colors.mds_global_color_black,
        fontWeight: '500'

    },
    detailsContainer: {
        flex: 6
    },
    remaningContainer: {
        flex: 4
    },
    remaningTimeText: {
        ...fonts.style.mds_ui_font_caption_bold,
        alignSelf: 'flex-end',
        color: colors.mds_global_color_grey_40,

    },
    locationText: {
        ...fonts.style.mds_ui_font_footnote_bold,
        color: colors.mds_global_color_grey_40
    },
    favouriteIconContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingTop: spaces.mds_global_space_16,
        paddingRight: spaces.mds_global_space_10,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    forSaleLabel: {
        width: widthToDp(25),
        borderRadius: radius.mds_global_radius_20,
        backgroundColor: colors.mds_global_color_blue_10,
        paddingHorizontal: spaces.mds_global_space_18,
        paddingVertical: spaces.mds_global_space_6,
        position: 'absolute',
        bottom: 150,
        left: 20

    },
    forSaleText: {
        ...fonts.style.mds_ui_font_subText_bold,
        color: colors.mds_global_color_white,
        textAlign: 'center'
    },
    heartIconShadow: {
        shadowColor: colors.mds_global_color_black_10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 25,

    }
})