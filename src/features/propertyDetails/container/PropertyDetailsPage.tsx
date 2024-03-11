import { FlatList, StyleSheet, TouchableOpacity, View, Platform, Dimensions, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { colors, fonts, radius, spaces } from '~/core/constants'
import { Modal, Text } from 'react-native-paper';
import coreStyles from '~/core/styles'
import * as Icons from '~/core/svg'
import { widthToDp } from '~/core/constants/layout'
import ImageViewer from 'react-native-image-zoom-viewer'
import { Modal as RNModal } from 'react-native';
import { Button, Header } from '~/core/components';
import { PropertyDetailsPageNavProps } from '~/core/navigation/types';
import { _mock_data } from '~/core/components';
import { propertyDetailsType, imageViewerType } from '../type';
import { propertyDetailsPageStrings } from '../constant';
import PropertyDetailsBottomsheet from '../components/templates';
import { mockDataType } from '~/core/components/_mock_data/MockData';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setFavouriteListAction } from '~/features/myList/actions';
import GoogleSign from '~/features/auth/component/organisms/GoogleSignin';
import { SocialIcon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import SocialLoginModal from '~/features/auth/container/SocialLoginModal';


const PropertyDetailsPage: React.FC<PropertyDetailsPageNavProps> = ({
    route,
    navigation
}) => {
    const getMLSNumber = route?.params?.mlsNumber
    const getFavouriteListsFromStore = useAppSelector(state => state.favourite.favouriteList)
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [socialModalVisible, setSocialModalVisible] = useState<boolean>(false)
    const [currentIndexImage, setCurrentIndexImage] = useState<number>(0)
    const [totalCountOfImage, setTotalCountOfImage] = useState<number>(0)
    const [propertyDetails, setPropertyDetails] = useState<mockDataType>()
    const [imageArray, setImageArray] = useState<imageViewerType[]>([])
    const [heartToggle, setHeartToggle] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>()

    const dispatch = useAppDispatch()
    const closeModal = () => {
        setModalVisible(!isModalVisible)
    }
    let googleRef = useRef<GoogleSign>(null)
    // for show images zoom
    const showImagesModal = (index: number, length: number) => {
        setModalVisible(!isModalVisible)
        setCurrentIndexImage(index)
        setTotalCountOfImage(length)
    }

    const getToken = async () => {
        const value = await AsyncStorage.getItem("tokenId")
        return value;
    }

    useFocusEffect(
        useCallback(() => {
            getToken().then(res => {
                if (res) {
                    setToken(res)
                    setSocialModalVisible(false)
                } else {
                    setToken(null)
                }

            }).catch(err => console.log("err", err))
        }, [])
    )

    const renderheaderLeftContent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1 }}>
                <Icons.ArrowLeftIcon size={18} color={colors.mds_global_color_white} />
            </TouchableOpacity>
        )
    }
    const toggleAuthModal = () => {
        setSocialModalVisible(!socialModalVisible)
    }
    const favouriteItemClick = () => {
        if (token !== null) {
            let tmp = [...getFavouriteListsFromStore]

            if (tmp.length) {
                let flag = getFavouriteListsFromStore.every((el, i) => el.MLSNumber !== getMLSNumber)
                let isExist = getFavouriteListsFromStore.findIndex((el, i) => el.MLSNumber == getMLSNumber)

                if (flag) {
                    tmp.push(propertyDetails!)
                } else if (isExist != -1) {
                    tmp.splice(isExist, 1)
                }
            } else {
                tmp.push(propertyDetails!)
            }

            dispatch(setFavouriteListAction(tmp))

        } else {
            setSocialModalVisible(true)
        }
    }
    const renderHeaderRightContent = () => {
        return (
            <View style={[styles.flexDirectionRow, styles.headerRightIconContainer]}>
                <View style={styles.headerIconContainer}>
                    <Icons.MapOutlineIcon color={colors.mds_global_color_white} />
                </View>
                <View style={styles.headerIconContainer}>
                    <Icons.ShareIcon color={colors.mds_global_color_white} />
                </View>
                <TouchableOpacity onPress={favouriteItemClick} style={styles.headerIconContainer}>
                    {
                        heartToggle ?
                            <Icons.HeartIcon color={colors.mds_global_color_white} />
                            :
                            <Icons.HeartOutlineIcon color={colors.mds_global_color_white} />

                    }

                </TouchableOpacity>
            </View>
        )
    }
    // for get details of property
    const renderPropertyDetailsOfCard = async () => {
        let demoArr: imageViewerType[] = []
        const found = _mock_data.find(obj => {
            return obj?.MLSNumber === getMLSNumber;
        });

        found?.images.map(ele => {
            const newObj = {
                url: '',
                props: {
                    source: ele.img
                }
            };
            return demoArr.push(newObj)
        })
        setImageArray([...demoArr])
        setPropertyDetails(found)

        return found;
    }
    useEffect(() => {


        renderPropertyDetailsOfCard()
    }, [])
    useEffect(() => {
        let isInWishlist = false
        getFavouriteListsFromStore.map((innerItem, index) => {
            if (innerItem.MLSNumber === getMLSNumber) {
                isInWishlist = true
                return;
            }
        })
        setHeartToggle(isInWishlist)


    }, [getFavouriteListsFromStore, heartToggle])

    const sendDataToParent = (data: any) => {
        setToken(data)
    }
    return (

        <View style={[styles.container,]}>
            <FlatList
                data={propertyDetails?.images}
                // TODO will be use in future
                scrollEnabled={false}
                renderItem={({ item, index }) =>
                    <View style={styles.imageContainerStyle}>
                        <TouchableOpacity onPress={() => showImagesModal(index, imageArray.length)}>
                            <FastImage
                                style={styles.imageStyle}
                                source={item.img}
                            />
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={(item) => item.img}
            />
            <View style={styles.favouriteIconContainer}>
                <Header
                    headerContainerStyle={styles.headerContainer}
                    leftComponent={renderheaderLeftContent()}
                    rightComponent={renderHeaderRightContent()}
                />
            </View>
            <View style={styles.forSaleLabel}>
                <Text style={styles.forSaleText}>{propertyDetailsPageStrings.label.forSale}</Text>
            </View>

            <PropertyDetailsBottomsheet propertyDetailsofCard={propertyDetails} />


            <View style={[styles.flexDirectionRow, styles.btnContainer]}>

                <Button
                    title={propertyDetailsPageStrings.button.callUs}
                    small={true}
                    onPress={() => { }}
                    style={styles.callusBtn}
                />
                <Button
                    title={propertyDetailsPageStrings.button.takeATour}
                    onPress={() => { }}
                    small={true}
                    style={styles.takeTourBtn}
                />
            </View>


            <RNModal visible={isModalVisible} transparent={true}>
                <ImageViewer
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

            </RNModal>
            {

                socialModalVisible && <SocialLoginModal
                    sendDataToParent={sendDataToParent}
                    isModalVisible={socialModalVisible}
                    closeModal={toggleAuthModal}
                />
            }

        </View>
    )
}

export default PropertyDetailsPage

const styles = StyleSheet.create({
    container: {
        borderRadius: radius.mds_global_radius_16,
        flex: 1
    },
    flexDirectionRow: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    },
    favouriteIconContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    forSaleLabel: {
        width: widthToDp(25),
        borderRadius: radius.mds_global_radius_20,
        backgroundColor: colors.mds_global_color_blue_10,
        paddingHorizontal: spaces.mds_global_space_18,
        paddingVertical: spaces.mds_global_space_6,
        position: 'absolute',
        bottom: 220,
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
        marginBottom: spaces.mds_global_space_4,
    },
    imageStyle: {
        height: 250,
        width: '100%',
    },
    callusBtn: {
        paddingHorizontal: spaces.mds_global_space_48,
        borderRadius: radius.mds_global_radius_4
    },
    takeTourBtn: {
        paddingHorizontal: spaces.mds_global_space_52,
        borderRadius: radius.mds_global_radius_4
    },
    btnContainer: {
        paddingTop: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingHorizontal: spaces.mds_global_space_12,
        backgroundColor: colors.mds_global_color_white,
        borderTopWidth: 0.3,
        borderTopColor: colors.mds_global_color_grey_40,
    },
    headerContainer: {
        backgroundColor: colors.withOpacity(colors.mds_global_color_black_100, 0.1),
        paddingHorizontal: spaces.mds_global_space_18,
    },
    headerIconContainer: {
        paddingHorizontal: spaces.mds_global_space_8
    },
    headerRightIconContainer: {
        paddingRight: spaces.mds_global_space_10
    },
    socialModalContainer: {
        backgroundColor: colors.mds_global_color_white,
        marginVertical: 150,
        marginHorizontal: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_10,
        zIndex: 1000
    },
    loginText: {
        ...fonts.style.mds_ui_font_body_bold,
        paddingLeft: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_10,

    },
})