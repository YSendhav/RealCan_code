import { colors, fonts, radius, spaces } from "~/core/constants";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Dimensions, TouchableHighlight, Image, Platform, FlatList } from 'react-native'
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { BrowseConatinerNavProps, Routes } from "~/core/navigation/types";
import * as Icons from '~/core/svg'
import MapView, { Marker, Callout } from 'react-native-maps';
import { CardV2, ToggleTwoWaySwitcher } from "~/core/components";
import coreStyles from '~/core/styles'
import { browseString } from '../constant'
import BottomSheetCardComponent from "../component/organisms/BottomSheetCardComponent";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import FilterModal from "../component/organisms/FilterModal";
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { setStatusBarAction } from "../actions";
import { navigationRef } from "~/core/navigation/RootNavigation";
import { _mock_data } from "~/core/components";
import images from "~/core/assets/images";
import { ScrollView } from "react-native-gesture-handler";
import { widthToDp } from "~/core/constants/layout";
import { mockDataType } from "~/core/components/_mock_data/MockData";

type Props = {}

const Browse: React.FC<BrowseConatinerNavProps> = ({
    route,
    navigation
}) => {
    const isBrowseRoute = navigationRef?.current?.getCurrentRoute()?.name
    const [isToggleSelectedValue, setIsToggleSelectedValue] = useState<string>()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [cardVisible, setCardVisible] = useState<boolean>(false)
    const [selectedListingIndex, setSelectedListingIndex] = useState<number>()
    const [listingCardData, setListingCardData] = useState<mockDataType[]>([])
    const [region, setRegion] = useState({
        latitude: 43.485828, longitude: -79.848061,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
    })
    const [searchRegionArray, setSearchRegionArray] = useState<mockDataType[]>([])
    const searchItem = route.params?.item
    useEffect(() => {

    }, [searchItem])

    const bottomSheetRef = useRef<BottomSheet>(null);
    const mapRef = useRef<MapView>(null);
    const dispatch = useAppDispatch()
    const switchOptions = [
        { label: "Active", value: "A" },
        { label: "Sold", value: "S" },
    ];
    const snapPoints = useMemo(() => ['8%', '100%'], [])
    const onPressValue = (value: string) => {
        setIsToggleSelectedValue(value)
    }
    const handleClosePress = () => {
        bottomSheetRef.current?.snapToIndex(0)
    }
    const insets = useSafeAreaInsets();
    useEffect(() => {
        if (searchItem?.length !== 0 && searchItem !== undefined && searchItem !== null) {
            setRegion(prev => ({ ...prev, latitude: searchItem?.latitude, longitude: searchItem?.longitude }))
            let filterSearchRegion = _mock_data.filter((ele, index) => {
                if (ele.latitude === searchItem?.latitude && ele.longitude === searchItem?.longitude) {
                    return ele
                }
            })
            setSearchRegionArray(filterSearchRegion)

        } else {
            let filterSearchRegion = _mock_data.filter((ele, index) => {
                if (ele.latitude === region?.latitude && ele.longitude === region?.longitude) {
                    return ele
                }
            })
            setSearchRegionArray(filterSearchRegion)
        }

    }, [searchItem])


    useEffect(() => {
        if (searchItem?.length !== 0 && searchItem !== undefined && searchItem !== null) {
            const userRegion = {
                latitude: region.latitude,
                longitude: region.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            };

            mapRef.current?.animateToRegion(userRegion);
        } else {
            const userRegion = {
                latitude: 43.485828,
                longitude: -79.848061,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            };

            mapRef.current?.animateToRegion(userRegion);
        }
    }, [region, searchItem])
    const onPressListings = (index: number, markerItem: any) => {
        const getItem = searchRegionArray.filter((ele, idx) => {
            if (idx === index) { return ele }
        })
        setListingCardData(getItem)
        setSelectedListingIndex(index)
        return (
            setCardVisible(!cardVisible)
        )
    }
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused && isBrowseRoute === 'BrowseConatiner') {
            dispatch(setStatusBarAction(true))

        } else {
            dispatch(setStatusBarAction(false))
        }

    }, [dispatch, isFocused])
    useEffect(() => {
        isFocused && setCardVisible(false)
    }, [isFocused])

    const zoomOutMap = () => {
        if (mapRef.current) {
            const newRegion = {
                ...region,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
            };
            setRegion(newRegion);
            mapRef.current.animateToRegion(newRegion, 100);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.switchButtonContainer}>
                <ToggleTwoWaySwitcher
                    options={switchOptions}
                    onPress={(value: string) => onPressValue(value)}
                    textColor={colors.mds_global_color_grey_50}

                    selectedColor={colors.mds_global_color_white}
                    buttonColor={colors.mds_global_color_blue_10}
                    borderColor={colors.mds_global_color_white}
                    containerStyle={styles.switchContainerStyle}
                />
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.whiteBgContainer}>
                            <Icons.FilterIcon color={colors.mds_global_color_black} size={20} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => zoomOutMap()}>
                        <View style={styles.whiteBgContainer}>
                            <Icons.FocusMapIcon color={colors.mds_global_color_black} size={20} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: region.latitudeDelta,
                        longitudeDelta: region.longitudeDelta,
                    }}
                    showsUserLocation={true}
                    ref={mapRef}
                    zoomEnabled={true}
                    onMapReady={() => {
                        mapRef.current?.fitToSuppliedMarkers(['mk1', 'mk2'], {
                            edgePadding:
                            {
                                top: 50,
                                right: 50,
                                bottom: 50,
                                left: 50
                            }

                        })
                    }}
                >
                    {
                        searchRegionArray.map((marker, index) => {
                            return (
                                <Marker
                                    draggable
                                    coordinate={{
                                        latitude: marker.coordinates?.latitude ?? region.latitude,
                                        longitude: marker.coordinates?.longitude ?? region.longitude,
                                    }}
                                    // onDragEnd={
                                    //     (e) => {
                                    //         let tempMapRegion = region;
                                    //         tempMapRegion.latitude = e.nativeEvent.coordinate.latitude;
                                    //         tempMapRegion.longitude = e.nativeEvent.coordinate.longitude
                                    //         mapRef.current?.animateToRegion(tempMapRegion);
                                    //     }

                                    // }
                                    key={index}
                                    onPress={() => { Platform.OS === 'android' && onPressListings(index, marker) }}
                                    style={{ flex: 1 }}
                                    identifier={'index'}
                                >

                                    <TouchableOpacity
                                        style={[styles.mapMarker, {
                                            backgroundColor: cardVisible && index === selectedListingIndex ? colors.mds_global_color_black_100 : colors.mds_global_color_blue_10,
                                        }]}
                                        onPress={e => onPressListings(index, marker)}
                                    >
                                        <Text style={styles.mapMarkerCountText}>1</Text>
                                    </TouchableOpacity>


                                </Marker>
                            )
                        })
                    }

                </MapView>
            </View>
            <View style={styles.renderItemCard}>
                {
                    cardVisible &&
                    <FlatList
                        data={listingCardData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => item.MLSNumber.toString() + index}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate(Routes.PropertyDetailsPage, { mlsNumber: item.MLSNumber }) }}
                            >
                                <CardV2
                                    images={item.cardImg}
                                    location={item.propertyAddress}
                                    price={item.price}
                                    fValue={item.furnitureValue}
                                    lValue={item.lotSizeSqft}
                                    bValue={item.bathValue}
                                    isCarIcon={false}
                                    containerStyle={{ width: '97%', }}
                                />
                            </TouchableOpacity>
                        }
                    />

                }
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                topInset={insets.top}
                backgroundStyle={styles.container}
                index={0}
                snapPoints={snapPoints}
                containerStyle={{ zIndex: 2 }}
            >
                <View style={styles.bottomSheetContainer}>
                    <Text style={styles.contentText}>{`${browseString.title.view} ${searchRegionArray.length} ${browseString.title.listings}`}</Text>
                    <Icons.ChevronDownSmIcon size={10} color={colors.mds_global_color_black} />
                </View>
                <View style={styles.bottomSheetCardComponentContainer}>
                    <BottomSheetCardComponent cardItems={searchRegionArray} />
                </View>
                <TouchableOpacity style={styles.bottomSheetMapContainer} onPress={handleClosePress} >
                    <Icons.MapOutlineIcon color={colors.mds_global_color_white} size={16} />
                    <Text style={styles.bottomSheetMapText}>{browseString.label.MAP}</Text>
                </TouchableOpacity>
            </BottomSheet>
            {modalVisible && <FilterModal modalVisible={modalVisible} onCloseModal={() => setModalVisible(!modalVisible)} />}

        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        paddingHorizontal: spaces.mds_global_space_12,

    },
    switchButtonContainer: {
        paddingTop: spaces.mds_global_space_48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1
    },
    close: {
        minHeight: 44,
    },
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    statusBar: {
        // height: StatusBar.currentHeight,
    },
    switchContainerStyle: {
        width: 120
    },
    bottomSheetContainer: {
        backgroundColor: colors.mds_global_color_white,
        alignSelf: 'center',
        ...coreStyles.flexDirectionRow
    },
    contentText: {
        ...fonts.style.mds_ui_font_caption_bold,
        color: colors.mds_global_color_black,
        paddingRight: spaces.mds_global_space_4,
    },
    bottomSheetMapContainer: {
        backgroundColor: colors.withOpacity(colors.mds_global_color_black_100, 0.8),
        alignSelf: 'center',
        borderRadius: radius.mds_global_radius_20,
        position: 'absolute',
        bottom: 10,
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: spaces.mds_global_space_10,
        paddingHorizontal: spaces.mds_global_space_18,
    },
    bottomSheetMapText: {
        ...fonts.style.mds_ui_font_caption_bold,
        color: colors.mds_global_color_white,
        paddingLeft: spaces.mds_global_space_4
    },
    whiteBgContainer: {
        backgroundColor: colors.mds_global_color_white,
        borderRadius: radius.mds_global_radius_30,
        alignSelf: 'center',
        justifyContent: 'center',
        padding: spaces.mds_global_space_8,
        marginRight: 5
    },
    iconsContainer: {
        ...coreStyles.flexDirectionRow,

    },
    bottomSheetCardComponentContainer: {
        marginTop: spaces.mds_global_space_20,
        marginBottom: spaces.mds_global_space_20
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    mapMarker: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    mapMarkerCountText: {
        ...fonts.style.mds_ui_font_footnote_bold,
        color: colors.mds_global_color_white
    },
    renderItemCard: {
        position: 'absolute',
        bottom: 60,
        paddingLeft: 20,

    }


})

export default Browse;