import React, { useLayoutEffect, useRef, useState, PropsWithChildren, FunctionComponent, useMemo } from 'react'
import {
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native'
import { colors, spaces } from '~/core/constants'
import RBSheet from 'react-native-raw-bottom-sheet'
import coreStyles from '~/core/styles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Icons from '~/core/svg'
import BottomSheet from '@gorhom/bottom-sheet'
import { AnimatedStyle } from 'react-native-reanimated'

type Props = {
    visible: boolean
    getSnapPoints?: Array<number | string>
    enableContentPanningGesture?: boolean
    enableHandlePanningGesture?: boolean
    enableOverDrag?: boolean
    contentStyle?: ViewStyle | AnimatedStyle
    backgroundStyle?: ViewStyle
    handleIndicatorStyle?: ViewStyle
    handleHeight?: number
    containerHeight?: number
    contentHeight?: number
    keyboardBehavior?: 'extend' | 'fillParent' | 'interactive'
    keyboardBlurBehavior?: 'none' | 'restore'
    children: React.ReactNode | React.ReactNode[] | React.ReactNode
    topInset?: number
    bottomInset?: number
    onClose?: () => void
    onChangeRef?: (ref: BottomSheet | null) => void
}

const BottomSheetModal: FunctionComponent<PropsWithChildren<Props>> = ({
    getSnapPoints,
    children,
    visible,
    contentStyle
}) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isActiveSheet, setIsActiveSheet] = useState(false)
    const snapPoints = useMemo(() => getSnapPoints, [])
    const insets = useSafeAreaInsets();

    const openRBSheet = () => {
        setIsActiveSheet(true)
        bottomSheetRef.current?.expand()
    }
    const closeRBSheet = () => {
        bottomSheetRef.current?.snapToIndex(0)
        setIsActiveSheet(false)
    }
    useLayoutEffect(() => {
        if (bottomSheetRef.current) {
            if (visible && !isActiveSheet) {
                openRBSheet()
            } else if (isActiveSheet && !visible) {
                closeRBSheet()
            }
        }
    }, [visible, bottomSheetRef, isActiveSheet])
    return (
        <BottomSheet
            ref={bottomSheetRef}
            topInset={insets.top}
            backgroundStyle={styles.container}
            snapPoints={snapPoints}
            style={contentStyle}
            containerStyle={{ zIndex: 2 }}
        >
            {children}
        </BottomSheet>
    )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.mds_global_color_white,
        flex: 1,
        // zIndex: 1
    },
})

export default BottomSheetModal
