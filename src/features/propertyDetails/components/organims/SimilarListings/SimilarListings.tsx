import { Image, Pressable, StyleSheet, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FastImage, { Source } from 'react-native-fast-image'
import images from '~/core/assets/images'
import { colors, fonts, radius, spaces } from '~/core/constants'
// import { Avatar, Button, Card, CardProps, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { widthToDp } from '~/core/constants/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, CardIconsSet, CardV2 } from '~/core/components'
import { Card } from '@rneui/themed';
import { propertyDetailsPageStrings } from '~/features/propertyDetails/constant'


const SimilarListings = () => {
    const similarListingsCardArray = [
        {
            price: "$565,000",
            location: "72 Spitfire Dr S, Hamilton, Ontario",
            parkingValue: 1,
            bathValue: 1,
            furnitureValue: 1,
            lotSize: "3250 sqft",
            img: images.W7255672_1
        },
        {
            price: "$375,000",
            location: "2361 Awenda Dr, Oakville, Ontario",
            parkingValue: 1,
            bathValue: 1,
            furnitureValue: 1,
            lotSize: "4250 sqft",
            img: images.W7250444_1
        },
        {
            price: "$885,000",
            location: "635 Cargill Path, Milton, Ontario",
            parkingValue: 1,
            bathValue: 1,
            furnitureValue: 1,
            lotSize: "3250 sqft",
            img: images.W7253236_1
        },
    ]

    return (

        <View>
            <Text style={styles.listingsHeading}>{propertyDetailsPageStrings.heading.similarListings}</Text>
            <View style={styles.cardContainer}>
                {
                    similarListingsCardArray.map((ele, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => { }}
                                key={index}
                            >
                                <View key={index} >
                                    <CardV2
                                        images={ele.img}
                                        location={ele.location}
                                        price={ele.price}
                                        fValue={ele.furnitureValue}
                                        lValue={ele.lotSize}
                                        bValue={ele.bathValue}
                                        isCarIcon={false}
                                        containerStyle={styles.cardV2Container}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View>
                <Button
                    title={propertyDetailsPageStrings.button.viewAll}
                    onPress={() => { }}
                    style={styles.viewAllButtonContainer}
                    dark={true}
                    outline={true}
                    small={true}
                />
            </View>
        </View>


    )
}

export default SimilarListings

const styles = StyleSheet.create({
    listingsHeading: {
        ...fonts.style.mds_ui_font_heading_h3_bold,
        ...coreStyles.globalContainer

    },
    cardContainer: {
        paddingTop: spaces.mds_global_space_20
    },
    viewAllButtonContainer: {
        backgroundColor: colors.mds_global_color_white,
        height: 50,
        marginTop: spaces.mds_global_space_4,
        borderRadius: radius.mds_global_radius_4,
        marginHorizontal: spaces.mds_global_space_12,
        justifyContent: 'center'
    },
    pressed: {
        backgroundColor: 'grey',
    },
    cardV2Container: {
        marginHorizontal: spaces.mds_global_space_14,
    }
})