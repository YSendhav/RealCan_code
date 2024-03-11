import React, { FC, ReactElement, ReactNode } from 'react'
import {
    Header as NavigationHeader,
    HeaderBackButtonProps,
} from '@react-navigation/elements'
import { StackActions } from '@react-navigation/native'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { colors, spaces } from '~/core/constants'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as Icons from '~/core/svg'

import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
type HeaderComponentProps = {
    title?: string;
    backgroundColor?: string
    headerContainerStyle?: ViewStyle
    rightComponent?: React.ReactElement
    leftComponent?: React.ReactElement
    centerComponent?: React.ReactElement
};

const Header: React.FunctionComponent<HeaderComponentProps> = ({
    title,
    rightComponent,
    leftComponent,
    centerComponent,
    backgroundColor,
    headerContainerStyle
}) => {
    return (
        <SafeAreaProvider>
            <HeaderRNE
                backgroundColor={backgroundColor}
                containerStyle={[styles.headerContainer, headerContainerStyle]}
                leftComponent={leftComponent}
                rightComponent={rightComponent}
                centerComponent={centerComponent}
            />
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    headerContainer: {
        paddingRight: 0,
        paddingTop: spaces.mds_global_space_16,
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        paddingVertical: 5,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;
