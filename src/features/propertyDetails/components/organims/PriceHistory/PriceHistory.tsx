import { FlatList, StyleSheet, View, } from 'react-native'
import React from 'react'
import { colors, fonts, spaces } from '~/core/constants'
import { Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { _mock_data } from '~/core/components';
import { propertyDetailsPageStrings } from '../../../constant';
import { CardV1 } from '~/core/components'
import images from '~/core/assets/images';

const PriceHistory: React.FC = () => {

    const cardDetailsArray = [
        {
            img: images.W7249440_1,
            listedForSaleStatus: 'Listed for sale',
            listedPrice: '$2,750,000',
            remaningTimeStatus: '23 days ago'
        },
        {
            img: images.W7250444_3,
            listedForSaleStatus: 'Listed without selling',
            listedPrice: '$3,799,999',
            remaningTimeStatus: '7 month ago'
        },

    ]

    return (
        <View style={styles.container}>
            <Text style={styles.priceHistoryText}>{propertyDetailsPageStrings.heading.priceHistory}</Text>
            <View style={styles.comparedAndRateContainer}>
                <View>
                    <View style={{ ...coreStyles.flexDirectionRow }}>
                        <Icons.RoundArrowupIcon color={colors.mds_global_color_green_100} size={16} />
                        <Text style={styles.nilText}>-</Text>
                    </View>
                    <Text style={styles.comparedToLastSoldText}>{propertyDetailsPageStrings.label.comparedToLastSold}</Text>
                </View>
                <View>
                    <View style={{ ...coreStyles.flexDirectionRow }}>
                        <Icons.RoundArrowupIcon color={colors.mds_global_color_green_100} size={16} />
                        <Text style={styles.nilText}>-</Text>
                    </View>
                    <Text style={styles.comparedToLastSoldText}>{propertyDetailsPageStrings.label.appreciationRate}</Text>
                </View>
            </View>
            <View style={styles.priceHistoryCardContainer}>
                {
                    cardDetailsArray.map((item, index) => {
                        let evenRow = index % 2 == 0;
                        return (
                            <View key={index}>
                                <CardV1
                                    image={item.img}
                                    listedPrice={item.listedPrice}
                                    listedSaleStatus={item.listedForSaleStatus}
                                    timeRemaning={item.remaningTimeStatus}
                                    // containerStyle={[styles.rowStyle, evenRow && styles.evenRowStyle]}
                                    evenRow={evenRow}
                                />
                            </View>

                        )
                    })
                }

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        ...coreStyles.globalContainer,
        paddingTop: spaces.mds_global_space_14
    },
    priceHistoryText: {
        ...fonts.style.mds_ui_font_heading_h3_bold,
    },
    comparedAndRateContainer: {
        paddingTop: spaces.mds_global_space_16,
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    },
    comparedToLastSoldText: {
        ...fonts.style.mds_ui_font_caption_bold,

    },
    nilText: {
        color: colors.mds_global_color_grey_50,
        paddingLeft: spaces.mds_global_space_6
    },
    priceHistoryCardContainer: {
        marginTop: spaces.mds_global_space_14
    },

})

export default PriceHistory;