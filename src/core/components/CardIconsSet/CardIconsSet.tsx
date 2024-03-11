import * as Icons from '~/core/svg'
import { colors, fonts, spaces } from '~/core/constants'

import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import coreStyles from '~/core/styles'

type CardIconsSetProps = {
    getCount?: number | string
    isFurnitureValue?: number | string
    isBathValue?: number | string
    isLotSizeValue?: number | string
    isParkingValue?: number | string
    isFurnitureIcon?: boolean
    isBathTubIcon?: boolean
    isGridIcon?: boolean
    isCarIcon?: boolean
}

const CardIconsSet: React.FC<CardIconsSetProps> = ({
    getCount,
    isFurnitureIcon = true,
    isBathTubIcon = true,
    isGridIcon = true,
    isCarIcon = true,
    isFurnitureValue,
    isBathValue,
    isLotSizeValue,
    isParkingValue
}) => {
    const iconsArray = [
        {
            icons: <Icons.FurnitureIcon size={22} color={colors.mds_global_color_black} />,
            count: isFurnitureValue ? isFurnitureValue : 1,
            isPresent: isFurnitureIcon
        },
        {
            icons: <Icons.BathTubIcon size={18} color={colors.mds_global_color_black} />,
            count: isBathValue ? isBathValue : 1,
            isPresent: isBathTubIcon
        },
        {
            icons: <Icons.GridIcon size={18} color={colors.mds_global_color_black} />,
            count: isLotSizeValue ? isLotSizeValue : '-',
            isPresent: isGridIcon
        },
        {
            icons: <Icons.CarIcon size={18} color={colors.mds_global_color_black} />,
            count: isParkingValue ? isParkingValue : 1,
            isPresent: isCarIcon
        },
    ]
    return (
        <View style={styles.IconsContainer}>
            {
                iconsArray?.map((ele, index) => {
                    return (
                        <View key={index} >
                            {
                                ele.isPresent ?
                                    <View style={[styles.flexDirectionRow]}>
                                        {ele.icons}
                                        <Text style={styles.iconCountText}>{ele.count}</Text>
                                    </View>

                                    :
                                    null
                            }


                        </View>
                    )
                })
            }
        </View >

    )
}
export default CardIconsSet;
const styles = StyleSheet.create({
    IconsContainer: {
        ...coreStyles.flexDirectionRow,
        // justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_10
    },
    flexDirectionRow: {
        ...coreStyles.flexDirectionRow,
        paddingRight: spaces.mds_global_space_24
    },
    iconCountText: {
        ...fonts.style.mds_ui_font_subText_bold,
        color: colors.mds_global_color_black,
        paddingLeft: spaces.mds_global_space_4
    },
})

