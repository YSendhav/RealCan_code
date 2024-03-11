import { colors, spaces } from "~/core/constants";
import { View, Text, SafeAreaView, Platform, StyleSheet, GestureResponderEvent, Alert } from 'react-native'
import React from 'react'
import { MenuNavProps } from "~/core/navigation/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "~/core/components";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {}

const Menu: React.FC<MenuNavProps> = (props: Props) => {
    const logoutCall = async () => {
        try {
            const logoutVal = await GoogleSignin.signOut();
            if (logoutVal === null) {
                Alert.alert('You are successfully logout!')
                await AsyncStorage.removeItem('tokenId');
            } else {
                Alert.alert('Something went wrong')
            }

            //   this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity>
                <View style=>
                    <Text>Logout</Text>
                </View>
            </TouchableOpacity> */}
            <Button
                title={"Logout"}
                onPress={logoutCall} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? spaces.mds_global_space_28 : 0,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Menu;