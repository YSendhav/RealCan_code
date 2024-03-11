import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheet, Button, Modal, Switcher } from '~/core/components'
import * as Icons from '~/core/svg'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { browseString } from '../../constant'
import coreStyles from '~/core/styles'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'

type FilterModalProps = {
    modalVisible: boolean
    onCloseModal?: () => void
    cancelButtonTitle?: string
}

const FilterModal: React.FC<FilterModalProps> = ({
    modalVisible,
    onCloseModal,
    cancelButtonTitle
}) => {
    const [justRentealChecked, setJustRentealChecked] = useState<boolean>(false)
    const [soldLeasedChecked, setSoldLeasedChecked] = useState<boolean>(false)
    const [featuresCount, setFeaturesCount] = useState<number>(0)
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
    const snapPoints = useMemo(() => ['100%'], []);

    const justRentalSwitchPress = () => {
        setJustRentealChecked(!justRentealChecked)
    }
    const soldLeasedSwitchPress = () => {
        setSoldLeasedChecked(!soldLeasedChecked)
    }
    const increaseFeaturesCount = () => {
        setFeaturesCount(featuresCount + 1)
    }
    const decreaseFeaturesCount = () => {
        if (featuresCount > 0) {
            setFeaturesCount(featuresCount - 1)
        }

    }
    const featuresContentArray = [
        {
            label: browseString.label.bedrooms
        },
        {
            label: browseString.label.bathrooms
        },
        {
            label: browseString.label.parking
        },

    ]
    const homeTypeContentArray = [
        {
            label: browseString.label.detachedHome
        },
        {
            label: browseString.label.semiDetachedHome
        },
        {
            label: browseString.label.freeholdTownhouse
        },
        {
            label: browseString.label.condoTownhouse
        },
        {
            label: browseString.label.condoApartment
        },

    ]
    const aminitiesContentArray = [
        {
            label: browseString.label.garage
        },
        {
            label: browseString.label.pool
        },
        {
            label: browseString.label.waterfront
        },
        {
            label: browseString.label.fireplace
        },

    ]

    return (
        <BottomSheet
            visible={modalVisible}
            getSnapPoints={snapPoints}
            contentStyle={styles.bottomsheetContainer}

        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onCloseModal}>
                        {<Icons.CloseIcon color={colors.mds_global_color_black_100} size={18} />}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.resetText}>{browseString.heading.reset}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.getAlertsContainer}>
                    <View style={styles.getAlertsContainerTextContent}>
                        <Icons.NotificationPlusIcon color={colors.mds_global_color_gold_100} size={16} />
                        <Text style={styles.getAlertsContainerText}>{browseString.label.getAlertsForYourSearch}</Text>
                    </View>
                    <Button
                        title={browseString.button.saveSearch}
                        onPress={() => { }}
                        style={styles.saveSearchButtonContainer}
                        dark={true}
                        outline={true}
                        small={true}
                        textStyle={styles.saveSearchButtonText}
                    />
                </View>

                <View style={styles.filterTypeContainer}>
                    <Text style={styles.headings}>{browseString.heading.filterType}</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelText}>{browseString.button.justRentals}</Text>
                        <Switcher
                            isChecked={justRentealChecked}
                            onToggle={justRentalSwitchPress}
                            size={'medium'}
                        />
                    </View>
                    <View style={styles.switchContainer}>
                        <Text style={styles.labelText}>{browseString.button.soldLeasedOnly}</Text>
                        <Switcher
                            isChecked={soldLeasedChecked}
                            onToggle={soldLeasedSwitchPress}
                            size={'medium'}
                        />
                    </View>

                </View>

                <View style={styles.priceRangeContainer}>
                    <Text style={styles.headings}>{browseString.heading.priceRange}</Text>
                    <View style={styles.priceRangeButtonContainer}>
                        <Button
                            title={browseString.button.min}
                            onPress={() => { }}
                            style={styles.priceRangeButton}
                            dark={true}
                            outline={true}
                            small={true}
                            textStyle={styles.priceRangeButtonText}
                        />
                        <Icons.DashIcon color={colors.mds_global_color_black_100} size={22} />
                        <Button
                            title={browseString.button.max}
                            onPress={() => { }}
                            style={styles.priceRangeButton}
                            dark={true}
                            outline={true}
                            small={true}
                            textStyle={styles.priceRangeButtonText}
                        />
                    </View>
                </View>

                <View style={styles.featuresContainer}>
                    <Text style={styles.headings}>{browseString.heading.features}</Text>
                    {
                        featuresContentArray.map((item, index) => {
                            return (
                                <View key={index} style={styles.featuresContentContainer}>
                                    <Text style={styles.labelText}>{item.label}</Text>
                                    <View style={styles.featuresIconsContainer}>
                                        {
                                            featuresCount === 0 ?
                                                <Icons.CircleMinusIcon color={colors.mds_global_color_grey_40} size={28} />
                                                :
                                                <TouchableOpacity onPress={() => { decreaseFeaturesCount() }}>
                                                    <Icons.CircleMinusIcon color={colors.mds_global_color_black_100} size={28} />
                                                </TouchableOpacity>

                                        }
                                        <Text style={[styles.labelText, { paddingHorizontal: spaces.mds_global_space_5 }]}>{browseString.label.any}</Text>
                                        <TouchableOpacity onPress={() => { increaseFeaturesCount() }}>
                                            <Icons.CirclePlusIcon color={colors.mds_global_color_black_100} size={28} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                <View style={styles.featuresContainer}>
                    <Text style={styles.headings}>{browseString.heading.homeType}</Text>
                    {
                        homeTypeContentArray.map((item, index) => {
                            return (
                                <View key={index} style={styles.homeTypeContentContainer}>
                                    <Text style={styles.labelText}>{item.label}</Text>
                                    <Icons.CheckMarkIcon />
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.amenitiesContainer}>
                    <Text style={styles.headings}>{browseString.heading.amenities}</Text>
                    {
                        aminitiesContentArray.map((item, index) => {
                            return (
                                <View key={index} style={styles.amenitiesContentContainer}>
                                    <Text style={styles.labelText}>{item.label}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View style={styles.listedDateContainer}>
                    <Text style={styles.headings}>{browseString.heading.listedDate}</Text>
                    <View style={styles.listedDtaeButtonContainer}>
                        <Button
                            title={browseString.button.since}
                            onPress={() => { }}
                            style={styles.listedDtaeButton}
                            dark={true}
                            outline={true}
                            small={true}
                            textStyle={styles.listedDtaeButtonText}
                        />
                        <Icons.DashIcon color={colors.mds_global_color_black_100} size={22} />
                        <Button
                            title={browseString.button.until}
                            onPress={() => { }}
                            style={styles.listedDtaeButton}
                            dark={true}
                            outline={true}
                            small={true}
                            textStyle={styles.listedDtaeButtonText}
                        />
                    </View>
                </View>

                <View style={styles.applyBtnContainer}>
                    <Button
                        title={browseString.button.apply}
                        small={true}
                        onPress={() => { }}
                        style={styles.applyBtn}
                    />
                </View>
            </ScrollView>
        </BottomSheet >

    )
}

export default FilterModal

const styles = StyleSheet.create({
    content: {

    },
    getAlertsContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_28
    },
    getAlertsContainerTextContent: {
        ...coreStyles.flexDirectionRow,
    },
    getAlertsContainerText: {
        ...fonts.style.mds_ui_font_caption_regular,
        paddingLeft: spaces.mds_global_space_4
    },
    saveSearchButtonContainer: {
        backgroundColor: colors.mds_global_color_white,
        height: 40,
        borderRadius: radius.mds_global_radius_4,
    },
    saveSearchButtonText: {
        ...fonts.style.mds_ui_font_caption_bold
    },
    filterTypeContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_6
    },
    switcherContainer: {

    },
    switchContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingBottom: spaces.mds_global_space_14
    },
    headings: {
        ...fonts.style.mds_ui_font_caption_bold,
        fontWeight: '500',
        color: colors.mds_global_color_grey_30,
        paddingTop: spaces.mds_global_space_24,
        paddingBottom: spaces.mds_global_space_12
    },
    featuresContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_6
    },
    labelText: {
        ...fonts.style.mds_ui_font_footnote_semi,

    },
    featuresContentContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingVertical: spaces.mds_global_space_6
    },
    featuresIconsContainer: {
        ...coreStyles.flexDirectionRow
    },
    modalHeader: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_22,
    },
    bottomsheetContainer: {
        paddingHorizontal: spaces.mds_global_space_12,
        // zIndex: 111
    },
    priceRangeContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_22
    },
    priceRangeButtonContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'

    },
    priceRangeButtonText: {
        ...fonts.style.mds_ui_font_caption_semi,
        color: colors.mds_global_color_grey_40,
        textAlign: 'left',
    },
    priceRangeButton: {
        width: '40%',
        borderRadius: radius.mds_global_radius_4,
        backgroundColor: colors.mds_global_color_light_pink
    },
    homeTypeContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_22
    },
    homeTypeContentContainer: {
        paddingVertical: spaces.mds_global_space_10,
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    },
    amenitiesContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_22
    },
    amenitiesContentContainer: {
        paddingVertical: spaces.mds_global_space_10,
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    },
    listedDateContainer: {
        ...coreStyles.divider,
        paddingBottom: spaces.mds_global_space_22
    },
    listedDtaeButtonContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'

    },
    listedDtaeButtonText: {
        ...fonts.style.mds_ui_font_caption_semi,
        color: colors.mds_global_color_black_100,
        textAlign: 'left',
    },
    listedDtaeButton: {
        width: '40%',
        borderRadius: radius.mds_global_radius_4,
        backgroundColor: colors.mds_global_color_light_pink,
        borderColor: colors.mds_global_color_black_100
    },
    applyBtn: {
        justifyContent: 'center',
        borderRadius: radius.mds_global_radius_4,
    },
    applyBtnContainer: {
        ...coreStyles.divider,
        paddingVertical: spaces.mds_global_space_22
    },
    resetText: {
        ...fonts.style.mds_ui_font_footnote_bold
    }
})