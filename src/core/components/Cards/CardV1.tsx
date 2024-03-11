import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import FastImage, { Source } from 'react-native-fast-image'
import images from '~/core/assets/images'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { Avatar, Button, Card, CardProps, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { heightToDp, widthToDp } from '~/core/constants/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getImageSize } from '~/core/utils/imageHelper'


type CardV1Props = {
  // TODO after we get dynemic data then it's require.
  image?: Source
  listedPrice?: string
  listedSaleStatus?: string
  timeRemaning?: string
  containerStyle?: ViewStyle
  evenRow?: boolean
}

const CardV1: React.FC<CardV1Props> = ({
  image,
  listedPrice,
  timeRemaning,
  listedSaleStatus,
  containerStyle,
  evenRow

}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginBottom: insets.bottom + 20, }, evenRow && styles.evenRowStyle]}>
      <View style={styles.cardContentContainer}>
        <View style={{ flex: 3 }}>
          <FastImage
            source={image}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContent}>
          <Text style={styles.textContent}>{timeRemaning}</Text>
          <Text style={styles.textContent}>{listedSaleStatus}</Text>
          <Text style={styles.textContent}>{listedPrice}</Text>

        </View>
      </View>
      <View style={styles.borderBottomContainer} />

    </View>
  )
}

export default CardV1

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.mds_global_radius_2,
    backgroundColor: colors.mds_global_color_white,
    flex: 1,

  },
  detailsContent: {
    flex: 6,
  },
  image: {
    width: widthToDp(25),
    height: widthToDp(20),
    backgroundColor: 'red'
  },
  borderBottomContainer: {
    height: 1,
    flex: 6,
    backgroundColor: colors.mds_global_color_grey_40,
    marginLeft: widthToDp(34),

  },
  cardContentContainer: {
    ...coreStyles.flexDirectionRow,
    paddingLeft: spaces.mds_global_space_14,
    paddingVertical: spaces.mds_global_space_14,
    flex: 1
  },
  textContent: {
    ...fonts.style.mds_ui_font_footnote_bold,
    paddingBottom: spaces.mds_global_space_2
  },
  evenRowStyle: {
    backgroundColor: colors.mds_global_color_light_pink
  },


})