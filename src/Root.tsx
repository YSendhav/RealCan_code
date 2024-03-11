import { SafeAreaView, StyleSheet, View, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base'
import theme from '~/core/utils/theme';
import { Navigation } from '~/core/navigation';
import FlashMessage from 'react-native-flash-message';
import { StatusBar } from 'react-native'
import { colors } from './core/constants';
import { useAppSelector } from './store/hooks';
import { navigationRef } from './core/navigation/RootNavigation';
type CustomStatusBarProps = {
    backgroundColor: string,
    height: number
}
const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
    backgroundColor,
    height
}) => {
    const isStutasVal = useAppSelector(state => state.browse.isStatusBarValue)

    return (
        Platform.OS === 'ios' ?
            <View style={{ height: height, backgroundColor: backgroundColor }}>
            </View>
            :
            <StatusBar
                translucent
                animated={true}
                backgroundColor={isStutasVal ? 'transparent' : colors.mds_global_color_grey_20}
                barStyle="dark-content"
            />
    )

}

const Root: React.FC = () => {
    const isStutasVal = useAppSelector(state => state.browse.isStatusBarValue)

    const insets = useSafeAreaInsets();
    return (
        <NativeBaseProvider theme={theme}>
            <CustomStatusBar height={0}
                backgroundColor={isStutasVal ? 'transparent' : colors.mds_global_color_grey_20}
            />
            <Navigation />
            <FlashMessage position="top" />
        </NativeBaseProvider>
    )
}

export default Root;


const styles = StyleSheet.create({

})