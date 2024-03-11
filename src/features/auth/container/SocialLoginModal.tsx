import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
// import { Modal } from 'react-native';
import FacebookSignin from '../component/organisms/FacebookSignin';
import { LoginManager, LoginButton } from "react-native-fbsdk";
import FastImage from 'react-native-fast-image';
import images from '~/core/assets/images';
import { colors, fonts, radius, spaces } from '~/core/constants';
import { SocialIcon } from '@rneui/themed';
import GoogleSign from '../component/organisms/GoogleSignin';
import * as Icons from '~/core/svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native-paper'
import { browseString } from '~/features/browse/constant';

type SocialLoginModalProps = {
    isModalVisible: boolean
    closeModal: () => void
    sendDataToParent: (data: any) => void
    showCloseIcon?: boolean
}

const SocialLoginModal: React.FC<SocialLoginModalProps> = ({ isModalVisible, closeModal, sendDataToParent, showCloseIcon = true }) => {
    // const [isModalVisible, setModalVisible] = useState<boolean>(true)
    const [fbUserInfo, setFbUserInfo] = useState<string>('')
    const [googleUserInfo, setGoogleUserInfo] = useState<string>()
    const [fbToken, setFbToken] = useState<string>('')
    let fbRef = useRef(null)
    let googleRef = useRef<GoogleSign>(null)

    return (

        <Modal
            visible={isModalVisible}
            contentContainerStyle={styles.container}
        >

            {
                showCloseIcon ? <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}>
                    <Icons.CrossCircleIcon color={colors.mds_global_color_grey_40} />
                </TouchableOpacity>
                    :
                    null
            }
            <View style={{ paddingVertical: 100, }}>

                {/* TODO we will use in future */}
                {/* <FacebookSignin ref={fbRef} /> */}
                <GoogleSign ref={googleRef} />
                {/* TODO we will use in future */}
                {/* <SocialIcon
                    button
                    style={{ width: 'auto' }}
                    title="Sign In facebook"
                    type="facebook"
                    onPress={() => {

                        fbRef?.current?.fbLogin().then((res: any) => {
                            console.log("res::", res)
                            if (res) {
                                let fdata = res.userInfo.name
                                setFbUserInfo(fdata)

                                //   props.login(fdata)
                                setFbToken(res.accessTokenInfo)
                            }

                        })



                    }}
                /> */}


                <View style={{ marginTop: spaces.mds_global_space_20 }}>
                    <Text style={styles.loginText}>{browseString.heading.pleaseLogin}</Text>
                    <SocialIcon
                        button
                        style={{ width: 'auto' }}
                        title="Sign In google"
                        type="google"
                        onPress={() => {

                            googleRef.current?.googleSignIn().then(async (res: any) => {

                                let gdata = res.userData.user.id
                                setGoogleUserInfo(gdata)
                                await AsyncStorage.setItem("tokenId", res.userData.user.id)
                                sendDataToParent(res.userData.user.id);
                                closeModal()

                            }).catch((err: any) => {
                                console.log("err===>", err)
                            })

                        }}
                    />
                </View>

            </View>


        </Modal>

    )
}

export default SocialLoginModal

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
        justifyContent: 'center',
        backgroundColor: colors.mds_global_color_white,
        marginVertical: 150,
        marginHorizontal: spaces.mds_global_space_12,
        borderRadius: radius.mds_global_radius_10,
    },
    loginText: {
        ...fonts.style.mds_ui_font_body_bold,
        paddingLeft: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_10,
    }
})

// X08WBi6jzSxKDVR4drqm84yr9iU=