import { colors, spaces } from "~/core/constants";
import { View, Text, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { NotificationsNavProps } from "~/core/navigation/types";
import ListingCardComponent from "~/core/components/ListingCardComponent/ListingCardComponent";
import { ListingCardeWithMultiImages } from "~/core/components";

type Props = {}

const Notification: React.FC<NotificationsNavProps> = (props: Props) => {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? spaces.mds_global_space_28 : 0 }}>
            <Text style={{ color: 'black' }}>Under development</Text>
        </SafeAreaView>
    )
}

export default Notification;