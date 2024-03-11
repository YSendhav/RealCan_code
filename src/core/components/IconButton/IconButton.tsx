import React from 'react'
import {
    Pressable,
    StyleSheet,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
} from 'react-native'
import { colors } from '~/core/constants'
import coreStyles from '~/core/styles'

type ButtonProps = {
    icon: React.ReactNode
    onPress?: (event: GestureResponderEvent) => void
    round?: boolean
    containerStyle?: StyleProp<ViewStyle>
    disabled?: boolean
    pressedContainerStyle?: StyleProp<ViewStyle>
    accessibilityId?: string
}

const IconButton: React.FC<ButtonProps> = ({
    icon,
    onPress,
    round,
    containerStyle,
    pressedContainerStyle,
    disabled,
    accessibilityId = 'icon_button',
}) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                round && styles.round,
                containerStyle,
                pressed && styles.pressed,
                pressed && pressedContainerStyle ? pressedContainerStyle : {},
            ]}
            hitSlop={20}
            onPress={onPress}
            disabled={disabled}
        >
            {icon}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    round: {
        backgroundColor: colors.mds_global_color_white,
        width: 48,
        height: 48,
        borderRadius: 48,
        ...coreStyles.shadow,
    },
    pressed: {
        opacity: 0.5,
    },
})

export default IconButton
