import { LoginManager, GraphRequest, GraphRequestManager, LoginButton, AccessToken, ini } from "react-native-fbsdk";

import { View, Text, Alert } from 'react-native'
import React, { Component, useRef } from 'react'


class FacebookSignin extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            name: '',
            token: ''
        }
    }

    fbLogin = async () => {

        let resultInfo = {
            accessTokenInfo: '',
            userInfo: '',
            error: ''
        }

        await LoginManager.logOut()
        await LoginManager.logInWithPermissions(["public_profile"]).then(async (result: any) => {
            if (result.isCancelled) {
                Alert.alert('login is cancelled.');
            } else {
                await AccessToken.getCurrentAccessToken().then(async (data: any) => {
                    console.log('token===<', data.accessToken.toString())

                    if (data.accessToken) {
                        resultInfo.accessTokenInfo = data.accessToken.toString()
                    }

                    await fetch('https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token=' + resultInfo.accessTokenInfo)
                        .then((response) => response.json())
                        .then((json) => {
                            // Some user object has been set up somewhere, build that user here
                            resultInfo.userInfo = json
                        })
                        .catch((err) => {
                            console.log("error", err)
                        })
                }).catch((err: any) => {
                    console.log("errr :: ", err)
                })
            }
        },
            function (error: string) {
                resultInfo.error = error
                console.log("Login fail with error: " + error);
            }

        )
        return resultInfo
    }

    render() {

        return <View>

        </View>
    }
}


export default FacebookSignin

