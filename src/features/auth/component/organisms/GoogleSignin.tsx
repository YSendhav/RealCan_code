import React, { Component, useEffect } from 'react'

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { View, Text, Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


class GoogleSign extends Component {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {

        if (Platform.OS == 'ios') {
            GoogleSignin.configure({
                webClientId: '1073967982990-03ib5hgn091etcg9a7vhne8oolluncnu.apps.googleusercontent.com',
                offlineAccess: true,
            })
        } else {
            GoogleSignin.configure({
                webClientId: '823251935913-tuat6bk3gmd06alo4qb1qvck346ajpcc.apps.googleusercontent.com',
                offlineAccess: true,
            })
        }
        
        GoogleSignin.configure();
        this.isSignedIn()
    }


    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            Alert.alert('User is already signed in')
            this.getCurrentUserInfo()
        } else {
            console.log('please login')
        }
        // setisLoginScreenPresented(isSignedIn)
        // console.log('isSignedIn', isSignedIn)
    };

    getCurrentUserInfo = async () => {
        try {
            await GoogleSignin.signInSilently();
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                console.log("user has not signed in yet")
            } else {
                // some other error
            }
        }
    };

    googleSignIn = async () => {
        let googleUserInfo = {
            userData: null,
            error: null
        } as any
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo:-',userInfo)
            googleUserInfo.userData = userInfo


        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                googleUserInfo.error = error
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                googleUserInfo.error = error
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                googleUserInfo.error = error
            } else {
                // some other error happened
                googleUserInfo.error = error
            }
        }
        return googleUserInfo
    };
    render() {

        return <View>

        </View>
    }

}

export default GoogleSign



