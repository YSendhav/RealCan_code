
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ListingCardComponent from '~/core/components/ListingCardComponent/ListingCardComponent'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BrowseConatinerNavProps, Routes } from '~/core/navigation/types'
import { mockDataType } from '~/core/components/_mock_data/MockData'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { removeListByIdAction, setFavouriteListAction } from '~/features/myList/actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SocialLoginModal from '~/features/auth/container/SocialLoginModal'
import { colors, fonts, radius, spaces } from '~/core/constants';
// import {
//     GoogleSignin,

// } from '@react-native-google-signin/google-signin';
import { SocialIcon } from '@rneui/themed';
import GoogleSign from '~/features/auth/component/organisms/GoogleSignin'
import * as Icons from '~/core/svg'
import { Modal } from 'react-native-paper'
import { browseString } from '../../constant'

type BottomSheetCardComponentProps = {
    cardItems: any
}

const BottomSheetCardComponent: React.FC<BottomSheetCardComponentProps> = ({
    cardItems
}) => {
    const navigation = useNavigation<BrowseConatinerNavProps['navigation']>()
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    let fbRef = useRef(null)
    let googleRef = useRef<GoogleSign>(null)
    const [token, setToken] = useState<string | null>()
    const [googleUserInfo, setGoogleUserInfo] = useState<string>()
    console.log("token", token)
    const getFavouriteListsFromStore = useAppSelector(state => state.favourite.favouriteList)
    const dispatch = useAppDispatch()
    const navigateToPropertyDetailsPage = (mlsNumber: string) => {
        navigation.navigate(Routes.PropertyDetailsPage, { mlsNumber: mlsNumber })
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
                    setModalVisible(false)
                } else {
                    setToken(null)
                }

            }).catch(err => console.log("err", err))
        }, [])
    )

    const favouriteItemOnClick = (wishListItem: mockDataType) => {
        try {
            if (token !== null) {
                let tmp = [...getFavouriteListsFromStore]

                if (tmp.length) {
                    let flag = getFavouriteListsFromStore.every((el, i) => el.MLSNumber !== wishListItem.MLSNumber)
                    let isExist = getFavouriteListsFromStore.findIndex((el, i) => el.MLSNumber == wishListItem.MLSNumber)

                    if (flag) {
                        tmp.push(wishListItem)
                    } else if (isExist != -1) {
                        tmp.splice(isExist, 1)
                    }
                } else {
                    tmp.push(wishListItem)
                }

                dispatch(setFavouriteListAction(tmp))

            } else {
                setModalVisible(true)
            }
        } catch (error) {
            console.log("errror==>", error)
        }

    }
    const toggleAuthModal = () => {
        setModalVisible(!isModalVisible)
    }
    const sendDataToParent = (data: any) => {
        setToken(data)
    }
    const renderItem = ({ item }: { item: mockDataType, }) => {
        let isInWishlist = false
        getFavouriteListsFromStore.map((innerItem, index) => {
            if (innerItem.MLSNumber === item.MLSNumber) {
                isInWishlist = true
                return;
            }
        })

        return (
            <View>
                <ListingCardComponent
                    cardData={cardItems}
                    cardItemMLSNumber={item.MLSNumber}
                    cardClickEvent={() => navigateToPropertyDetailsPage(item.MLSNumber)}
                    cardComponentItems={item}
                    favouriteItemClick={() => favouriteItemOnClick(item)}
                    toggleFavourite={isInWishlist}
                />
            </View>
        )
    }

    return (
        <>
            <FlatList
                data={cardItems}
                renderItem={renderItem}
                keyExtractor={(item, idx) => item.MLSNumber.toString() + idx}
            />
            {

                isModalVisible && <SocialLoginModal
                    sendDataToParent={sendDataToParent}
                    isModalVisible={isModalVisible}
                    closeModal={toggleAuthModal}
                />
            }
        </>

    )
}

export default BottomSheetCardComponent
const styles = StyleSheet.create({
    facebookSocialBtn: {
        backgroundColor: colors.mds_global_color_red_100,
        paddingVertical: spaces.mds_global_space_14,
        paddingHorizontal: spaces.mds_global_space_16,
        borderRadius: 6,
        elevation: 17,
        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
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

    }
})
