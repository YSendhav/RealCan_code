import { colors, fonts, radius, spaces } from "~/core/constants";
import { View, Text, SafeAreaView, Platform, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MyListsNavProps } from "~/core/navigation/types";
import { useAppSelector, useAppDispatch } from "~/store/hooks";
import { FlatList } from "native-base";
import { mockDataType } from "~/core/components/_mock_data/MockData";
import { Favourite } from "../type";
import { CardV2 } from "~/core/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Icons from '~/core/svg'
import { removeListByIdAction } from "../actions";
import SocialLoginModal from "~/features/auth/container/SocialLoginModal";
import { Modal } from "react-native-paper";
import GoogleSign from "~/features/auth/component/organisms/GoogleSignin";
import { SocialIcon } from '@rneui/themed';
type Props = {}

const MyList: React.FC<MyListsNavProps> = (props: Props) => {
    const { favouriteList } = useAppSelector(state => state.favourite)
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>()
    const dispatch = useAppDispatch()
    const toggleAuthModal = () => {
        setModalVisible(!isModalVisible)
    }
    let googleRef = useRef<GoogleSign>(null)
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
                    setModalVisible(true)
                }

            }).catch(err => console.log("err", err))
        }, [])
    )
    const renderItem = ({ item }: { item: mockDataType }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { dispatch(removeListByIdAction(item.MLSNumber)) }} style={styles.circleIconContainer}>
                    <Icons.CrossCircleIcon color={colors.mds_global_color_grey_40} size={20} />
                </TouchableOpacity>
                <CardV2
                    images={item?.cardImg}
                    price={item?.price}
                    location={item?.propertyAddress}
                    isCarIcon={false}
                    fValue={item.furnitureValue}
                    bValue={item.bathValue}
                    lValue={item.lotSizeSqft}
                    containerStyle={styles.cardContainer}
                />

            </View>
        )
    }
    const sendDataToParent = (data: any) => {
        setToken(data)
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                !token?.length ?
                    <SocialLoginModal
                        sendDataToParent={sendDataToParent}
                        isModalVisible={isModalVisible}
                        closeModal={toggleAuthModal}
                        showCloseIcon={false}
                    />
                    :
                    <FlatList
                        data={favouriteList}
                        renderItem={renderItem}
                    />
            }
        </SafeAreaView>
    )
}

export default MyList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? spaces.mds_global_space_16 : 0,

    },
    cardContainer: {
        marginHorizontal: spaces.mds_global_space_12,
        marginTop: Platform.OS === 'ios' ? spaces.mds_global_space_10 : 0
    },
    circleIconContainer: {
        position: 'absolute',
        zIndex: 100,
        right: 20,
        top: 20
    },
    loginText: {
        ...fonts.style.mds_ui_font_body_bold,
        paddingLeft: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_10,

    },
    modalContainer: {
        backgroundColor: colors.mds_global_color_white,
        marginVertical: 150,
        // height:
        marginHorizontal: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_10,
        zIndex: 1000
    }
})
