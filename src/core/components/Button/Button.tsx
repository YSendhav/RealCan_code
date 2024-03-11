import React, { useState } from 'react'
import {
    View,
    Pressable,
    StyleSheet,
    Text,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    ActivityIndicator,
    TextStyle,
} from 'react-native'
import { fonts, colors, spaces, radius } from '~/core/constants'

type ButtonProps = {
    title: string
    disabled?: boolean
    icon?: React.ReactNode
    onPress: (event: GestureResponderEvent) => void
    style?: StyleProp<ViewStyle>
    disabledStyle?: StyleProp<ViewStyle>
    outline?: boolean
    dark?: boolean
    small?: boolean
    loader?: boolean
    textStyle?: StyleProp<TextStyle>
    iconLeft?: boolean
    testId?: string
}

const Button: React.FC<ButtonProps> = ({
    title,
    icon,
    disabled,
    onPress,
    style,
    disabledStyle,
    outline,
    dark,
    small,
    loader,
    textStyle,
    iconLeft,
    testId,
    ...props
}) => {
    const [isPressed, setPressed] = useState(false)

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                small && styles.small,
                outline && styles.outline,
                dark && styles.dark,
                disabled
                    ? disabledStyle
                        ? disabledStyle
                        : styles.disabled
                    : undefined,
                disabled && outline && styles.disabledOutline,
                style,
                pressed && styles.pressed,
            ]}
            disabled={disabled}
            testID={testId}
            onPress={loader ? undefined : onPress}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            {...props}
        >
            {loader && (
                <ActivityIndicator
                    size={small ? 'small' : 'large'}
                    color={colors.mds_global_color_red_20}
                />
            )}
            {icon && !loader && iconLeft && (
                <View style={styles.iconContainerLeft}>{icon}</View>
            )}
            {!loader && (
                <Text
                    style={[
                        styles.title,
                        small && styles.titleSmall,
                        outline && styles.textOutline,
                        dark && styles.textDark,
                        textStyle,
                        disabled && styles.textDisabled,
                        isPressed && styles.textPressed,
                    ]}
                >
                    {title}
                </Text>
            )}
            {icon && !loader && !iconLeft && (
                <View style={styles.iconContainer}>{icon}</View>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spaces.mds_global_space_16,
        backgroundColor: colors.mds_global_color_gold_100,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.mds_global_radius_8,
        height: 48,
    },
    small: {
        height: 40,
    },
    pressed: {
        backgroundColor: 'transparent',
    },
    disabled: {
        backgroundColor: colors.mds_global_color_grey_20,
        opacity: 1,
    },
    textDisabled: {
        color: colors.mds_global_color_grey_40,
    },
    title: {
        ...fonts.style.mds_ui_font_body_semi,
        color: colors.mds_global_color_white,
    },
    titleSmall: {
        ...fonts.style.mds_ui_font_footnote_semi,
        color: colors.mds_global_color_white,
    },
    iconContainer: {
        marginLeft: spaces.mds_global_space_8,
    },
    iconContainerLeft: {
        marginRight: spaces.mds_global_space_8,
    },
    outline: {
        backgroundColor: colors.mds_global_color_white,
        borderWidth: 1.2,
        borderColor: colors.mds_global_color_grey_50,
    },
    dark: {
        borderColor: colors.mds_global_color_grey_40,
    },
    textOutline: {
        color: colors.mds_global_color_red,
    },
    textDark: {
        color: colors.mds_global_color_black,
    },
    disabledOutline: {
        borderColor: colors.mds_global_color_grey_40,
        backgroundColor: colors.mds_global_color_white,
    },
    textPressed: {
        color: colors.mds_global_color_white,
    },
})

export default Button
