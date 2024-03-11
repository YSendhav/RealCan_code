import { FlatList, SafeAreaView, StyleSheet, TouchableHighlight, TouchableOpacity, View, Platform, Dimensions } from 'react-native'
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import FastImage, { Source } from 'react-native-fast-image'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { Avatar, Button, Card, CardProps, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { widthToDp } from '~/core/constants/layout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '~/core/assets/images'
import ImageViewer from 'react-native-image-zoom-viewer'
import { Modal } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { getImageSize } from '~/core/utils/imageHelper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { CardIconsSet } from '..';

type ListingCardeWithMultiImagesProps = {
    // TODO after we get dynemic data then it's require.
    imagesProp?: Source
    price?: number
    location?: string
    count?: number
    timeRemaning?: string
    toggleFavourite?: boolean
}

const ListingCardeWithMultiImages: React.FC<ListingCardeWithMultiImagesProps> = ({
    imagesProp,
    price,
    location,
    timeRemaning,
    toggleFavourite
}) => {
    const [heartIconToggle, setHeartIconToggle] = useState<boolean>(false)
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(0)
    const [totalCountOfImage, setTotalCountOfImage] = useState<number>(0)
    const [boxHeight, setBoxHeight] = useState(57)
    const insets = useSafeAreaInsets();
    const imageSize = getImageSize()
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['28%', '100%'], [])

    const imageArray = [
        {
            url: '',
            props: {
                // Or you can set source directory.
                source: images.entireHouseProperty
            }
        },
        {
            url: '',
            props: {
                // Or you can set source directory.
                source: images.entireHouseProperty2
            }
        },
        {
            url: '',
            props: {
                // Or you can set source directory.
                source: images.entireHouseProperty3
            }
        },
        // {
        //     url: '',
        //     props: {
        //         // Or you can set source directory.
        //         source: images.entireHouseProperty4
        //     }
        // },
        // {
        //     url: '',
        //     props: {
        //         // Or you can set source directory.
        //         source: images.entireHouseProperty5
        //     }
        // },
    ];
    const closeModal = () => {
        setModalVisible(!isModalVisible)
    }
    // for show images zoom
    const showImagesModal = (index: number, length: number) => {
        setModalVisible(!isModalVisible)
        setCurrentIndexImage(index)
        setTotalCountOfImage(length)
    }

    return (

        <View style={[styles.container,]}>
            <View style={{ flex: 1, }}>
                <FlatList
                    data={imageArray}
                    scrollEnabled={false}
                    style={{ flex: 1 }}

                    renderItem={({ item, index }) =>
                        <View style={styles.imageContainerStyle}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => showImagesModal(index, imageArray.length)}>
                                <FastImage
                                    style={{

                                        height: 250,
                                        width: '100%',

                                    }}
                                    source={item.props.source}

                                // resizeMode={
                                //     FastImage.resizeMode.contain
                                // }
                                />
                                {/* <Card.Cover style={styles.cardCoverContainer} source={item.props.source} /> */}
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item) => item.props.source}
                />
                {/* {imageArray.map((ele, index) => {
                    return (
                        <TouchableOpacity onPress={() => showImagesModal(index, imageArray.length)}>
                            <Card.Cover style={styles.cardCoverContainer} source={ele.props.source} />
                        </TouchableOpacity>
                    )
                })} */}
                <View style={styles.favouriteIconContainer}>
                    <TouchableOpacity onPress={() => setHeartIconToggle(!heartIconToggle)}>
                        {
                            !heartIconToggle ?
                                <Icons.HeartOutlineIcon size={24} color={colors.mds_global_color_white} />
                                :
                                <Icons.HeartIcon size={24} color={colors.mds_global_color_white} />
                        }
                    </TouchableOpacity>


                </View>
                <View style={styles.forSaleLabel}>
                    <Text style={styles.forSaleText}>For sale</Text>
                </View>
                <BottomSheet
                    ref={bottomSheetRef}
                    topInset={insets.top}
                    backgroundStyle={styles.container}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <View style={styles.cardContentContainer}>
                        <View style={styles.detailsContainer}>
                            <Text style={styles.priceText} variant="titleLarge">$565,000</Text>
                            <Text style={styles.locationText} variant="bodyMedium">203 - 1105 Leger Way Milton, Ontario</Text>
                            <CardIconsSet />
                        </View>
                        <View style={styles.remaningContainer}>
                            <Text style={styles.remaningTimeText} variant="bodyMedium">47 minute ago</Text>
                        </View>

                    </View>

                </BottomSheet>

                {/* TODO we need to this action in future */}
                {/* <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions> */}
            </View>


            <Modal visible={isModalVisible} transparent={true}>
                <ImageViewer
                    // renderArrowLeft={() => <Icons.ArrowLeftIcon />}
                    imageUrls={imageArray}
                    onChange={(index?: number) => setCurrentIndexImage(index!)}
                    renderIndicator={() =>
                        <View style={styles.imageViwerIndicaterContainer}>
                            <Text style={styles.imageViwerIndicaterText}>
                                {currentIndexImage + 1}
                            </Text>
                            <Text style={styles.imageViwerIndicaterText}>
                                {' '}{'of'}{' '}
                            </Text>
                            <Text style={styles.imageViwerIndicaterText}>
                                {totalCountOfImage}
                            </Text>
                        </View>
                    }
                    index={currentIndexImage}
                    renderHeader={() =>
                        <TouchableOpacity onPress={() => closeModal()} style={styles.imageViewArrowIconContainer}>
                            <Icons.ArrowLeftIcon size={18} color={colors.mds_global_color_white} />
                        </TouchableOpacity>
                    }
                />

            </Modal>

        </View>
    )
}

export default ListingCardeWithMultiImages

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.mds_global_radius_16,
        flex: 1,
    },
    cardContainer: {
        borderRadius: radius.mds_global_radius_24,
        backgroundColor: colors.mds_global_color_white
    },
    cardCoverContainer: {
        borderRadius: 0,
        marginBottom: spaces.mds_global_space_4
    },
    cardContentContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        marginTop: spaces.mds_global_space_16,
        backgroundColor: colors.mds_global_color_white,
        borderTopRightRadius: radius.mds_global_radius_16,
        borderTopLeftRadius: radius.mds_global_radius_16,
    },
    priceText: {
        ...fonts.style.mds_ui_font_body_bold,
        color: colors.mds_global_color_black,
        fontWeight: '500'

    },
    detailsContainer: {
        flex: 5
    },
    remaningContainer: {
        flex: 5
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
    IconsContainer: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between',
        paddingTop: spaces.mds_global_space_10
    },
    flexDirectionRow: {
        ...coreStyles.flexDirectionRow,
    },
    iconCountText: {
        ...fonts.style.mds_ui_font_subText_bold,
        color: colors.mds_global_color_black,
        paddingLeft: spaces.mds_global_space_4
    },
    favouriteIconContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingTop: spaces.mds_global_space_16,
        paddingRight: spaces.mds_global_space_10,
    },
    forSaleLabel: {
        width: widthToDp(25),
        borderRadius: radius.mds_global_radius_20,
        backgroundColor: colors.mds_global_color_blue_10,
        paddingHorizontal: spaces.mds_global_space_18,
        paddingVertical: spaces.mds_global_space_6,
        position: 'absolute',
        bottom: 130,
        left: 10

    },
    forSaleText: {
        ...fonts.style.mds_ui_font_subText_bold,
        color: colors.mds_global_color_white,
        textAlign: 'center'
    },
    imageViewArrowIconContainer: {
        backgroundColor: 'black',
        top: Platform.OS === 'ios' ? 50 : 10,
        position: 'absolute',
        left: 20,
        zIndex: 1000
    },
    imageViwerIndicaterContainer: {
        position: 'absolute',
        left: 50,
        top: Platform.OS === 'ios' ? 52 : 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageViwerIndicaterText: {
        color: colors.mds_global_color_white
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 1,
    },

})