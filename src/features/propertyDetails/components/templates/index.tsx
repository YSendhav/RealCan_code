import { StyleSheet, View, Platform, Dimensions, } from 'react-native'
import React, { useMemo, useRef, useState } from 'react'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, CardIconsSet, _mock_data } from '~/core/components';
import { propertyDetailsType, imageViewerType } from '../../type';
import { propertyDetailsPageStrings } from '../../constant';
import PropertyDetailsTab from '../organims/PropertyDetailsBottomsheetTab/PropertyDetailsTab';
import { ScrollView } from 'react-native-gesture-handler';
import PriceHistory from '../organims/PriceHistory/PriceHistory';
import SimilarListings from '../organims/SimilarListings/SimilarListings';
import { mockDataType } from '~/core/components/_mock_data/MockData';

type PropertyDetailsBottomsheetProps = {
    propertyDetailsofCard: mockDataType | undefined
}
const PropertyDetailsBottomsheet: React.FC<PropertyDetailsBottomsheetProps> = ({
    propertyDetailsofCard
}) => {
    const spliteStrLocation = propertyDetailsofCard?.propertyAddress?.replace(",", "\n")
    const androidOS = Platform.OS === 'android'
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() =>
        androidOS ? ['34%', '85%'] : ['30%', '85%']
        , [])



    return (

        <BottomSheet
            ref={bottomSheetRef}
            topInset={insets.top}
            backgroundStyle={styles.container}
            index={0}
            snapPoints={snapPoints}

        >
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.cardContentContainer}>

                    <View style={styles.flexDirectionRow}>
                        <Text style={styles.priceText} variant="titleLarge">{propertyDetailsofCard?.price}</Text>
                        <Text style={styles.remaningTimeText} variant="bodyMedium">{propertyDetailsofCard?.activeStatus}</Text>
                    </View>
                    <View style={styles.flexDirectionRow}>
                        <View style={styles.flexDirectionRow}>
                            <Icons.RoundArrowupIcon size={16} color={colors.mds_global_color_green_100} />
                            <Text style={[styles.estPriceAndSellText, styles.greenColor]}>{`${propertyDetailsPageStrings.label.estPrice}${' '}${propertyDetailsofCard?.estPrice}`}</Text>
                        </View>

                        <View style={styles.flexDirectionRow}>
                            <Icons.EstSellToLimitIcon size={12} color={colors.mds_global_color_red_100} />
                            <Text style={[styles.estPriceAndSellText, styles.redColor]}>{`${propertyDetailsPageStrings.label.estSell}${' '}${propertyDetailsofCard?.estSell}`}</Text>
                        </View>
                    </View>
                    <Text style={styles.locationText}>
                        {propertyDetailsofCard?.propertyAddress?.replace(",", "\n")}
                    </Text>
                    <CardIconsSet />
                    <View>
                        <Button
                            title={propertyDetailsPageStrings.button.priceHistory}
                            onPress={() => { }}
                            style={styles.priceButtonContainer}
                            dark={true}
                            outline={true}
                            small={true}
                            icon={<Icons.WatchLaterIcon color={colors.mds_global_color_black_10} size={20} />}
                            iconLeft={true}
                        />
                    </View>

                </View>

                <View style={styles.topTabContainer}>
                    <PropertyDetailsTab />
                </View>

                <View style={styles.shedulePrivateContainer}>
                    <Icons.HomeIcon color={colors.mds_global_color_black_100} size={30} />
                    <View style={styles.shedulePrivateTextContainer}>
                        <Text style={styles.scheduleAPrivateTourText}>{propertyDetailsPageStrings.message.scheduleAPrivateTour}</Text>
                        <Text style={styles.contactUsText}>{propertyDetailsPageStrings.message.contactUs}</Text>
                    </View>

                </View>

                <View>
                    <PriceHistory />
                </View>
                <View style={{ ...coreStyles.divider, marginTop: spaces.mds_global_space_16 }} />
                <View style={styles.similarListingsContainer}>
                    <SimilarListings />
                </View>

            </ScrollView>
        </BottomSheet>


    )
}

export default PropertyDetailsBottomsheet

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.mds_global_radius_16,
    },
    cardContentContainer: {
        marginTop: spaces.mds_global_space_2,
        backgroundColor: colors.mds_global_color_white,
        borderTopRightRadius: radius.mds_global_radius_16,
        borderTopLeftRadius: radius.mds_global_radius_16,
        paddingHorizontal: spaces.mds_global_space_12,
    },
    priceText: {
        ...fonts.style.mds_ui_font_body_bold,
        color: colors.mds_global_color_black,
        fontWeight: '500'

    },
    remaningTimeText: {
        ...fonts.style.mds_ui_font_caption_bold,
        color: colors.mds_global_color_grey_40,
    },
    locationText: {
        ...fonts.style.mds_ui_font_footnote_bold,
        color: colors.mds_global_color_grey_40,
        paddingTop: spaces.mds_global_space_10,
    },
    IconsContainer: {
        ...coreStyles.flexDirectionRow,
        paddingTop: spaces.mds_global_space_8,
    },
    iconSubContainer: {
        paddingRight: spaces.mds_global_space_20,
        ...coreStyles.flexDirectionRow
    },
    flexDirectionRow: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    },
    iconCountText: {
        ...fonts.style.mds_ui_font_subText_bold,
        color: colors.mds_global_color_black,
        paddingLeft: spaces.mds_global_space_4,
    },
    favouriteIconContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    estPriceAndSellText: {
        ...fonts.style.mds_ui_font_caption_semi,
        paddingLeft: spaces.mds_global_space_4
    },
    greenColor: {
        color: colors.mds_global_color_green_100
    },
    redColor: {
        color: colors.mds_global_color_red_100
    },
    priceButtonContainer: {
        backgroundColor: colors.mds_global_color_white,
        height: 50,
        marginTop: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_4,
        justifyContent: 'center'
    },
    priceButtonText: {
        color: colors.mds_global_color_black_100
    },
    topTabContainer: {
        marginTop: spaces.mds_global_space_6,
    },
    shedulePrivateContainer: {
        paddingHorizontal: spaces.mds_global_space_12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: spaces.mds_global_space_32,
        ...coreStyles.borderBottomGrey
    },
    shedulePrivateTextContainer: {
        paddingLeft: spaces.mds_global_space_6
    },
    scheduleAPrivateTourText: {
        ...fonts.style.mds_ui_font_small_bold,
        color: colors.mds_global_color_blue_10
    },
    contactUsText: {
        ...fonts.style.mds_ui_font_small_bold,
        paddingTop: spaces.mds_global_space_2
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingBottom: spaces.mds_global_space_85
    },
    similarListingsContainer: {
        marginTop: spaces.mds_global_space_32
    }
})