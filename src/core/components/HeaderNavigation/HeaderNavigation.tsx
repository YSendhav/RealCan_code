import React, { FC } from 'react'
import {
    Header as NavigationHeader,
    HeaderBackButtonProps,
} from '@react-navigation/elements'
import { StackActions } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { HeaderLeftButton, HeaderRightButton } from '.'
import { colors, spaces } from '~/core/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
interface HeaderProps extends NativeStackHeaderProps {
    headerLeftDisabled?: boolean
    onPressHeaderLeft?: () => void
    headerRightDisabled?: boolean
    onPressHeaderRight?: () => void
    headerLeftLabel?: string
    headerRightLabel?: string
    headerRightButtonDisabled?: boolean
    rightIcon?: React.ReactNode
    showSafeArea?: boolean
    showLanguageToggle?: boolean
    showUnderline?: boolean
}

type Header = (props: HeaderBackButtonProps) => React.ReactNode

const Header: FC<HeaderProps> = (props: HeaderProps) => {
    const { options, showSafeArea = true } = props

    const goBack = () => {
        props.navigation.dispatch(StackActions.pop(1))
    }

    const headerLeft =
        options?.headerLeft === undefined
            ? () => (
                <HeaderLeftButton
                    onPress={props.onPressHeaderLeft || goBack}
                    disabled={Boolean(props.headerLeftDisabled)}
                    label={props.headerLeftLabel}
                />
            )
            : (options?.headerLeft as Header)

    const headerRight =
        options?.headerRight === undefined
            ? () => (
                <HeaderRightButton
                    onPress={props.onPressHeaderRight || goBack}
                    disabled={Boolean(props.headerRightDisabled)}
                    label={props.headerRightLabel}
                    disabledButton={props.headerRightButtonDisabled}
                    icon={
                        props.rightIcon
                    }
                />
            )
            : (options?.headerRight as Header)

    return showSafeArea ? (
        <SafeAreaView edges={['top']}>
            <NavigationHeader
                {...props}
                {...(options || {})}
                headerTitleAlign="center"
                title={options?.title as string}
                headerStyle={
                    props.showUnderline
                        ? headerStyles.headerStyleUnderlined
                        : headerStyles.headerStyle
                }
                headerLeft={headerLeft}
                headerRight={headerRight}
                headerLeftContainerStyle={headerStyles.headerLeftContainerStyle}
                headerRightContainerStyle={headerStyles.headerRightContainerStyle}
            />
        </SafeAreaView>
    ) : (
        <NavigationHeader
            {...props}
            {...(options || {})}
            headerTitleAlign="center"
            title={options?.title as string}
            headerStyle={headerStyles.headerStyle}
            headerLeft={headerLeft}
            headerRight={headerRight}
            headerLeftContainerStyle={headerStyles.headerLeftContainerStyle}
            headerRightContainerStyle={headerStyles.headerRightContainerStyle}
        />
    )
}

export default Header

const headerStyles = StyleSheet.create({
    headerLeftContainerStyle: {
        paddingHorizontal: spaces.mds_global_space_16,
    },
    headerRightContainerStyle: {
        paddingHorizontal: spaces.mds_global_space_16,
    },
    headerStyle: {
        shadowColor: colors.mds_global_opacity_0,
    },
    headerStyleUnderlined: {
        shadowColor: colors.mds_global_opacity_0,
        borderBottomWidth: 1,
        borderBottomColor: colors.mds_global_color_grey_20,
        height: 60,
    },
})
