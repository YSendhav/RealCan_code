import React, { FC } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Platform,
    ViewStyle,
    StyleProp,
    ViewProps,
} from 'react-native'
import {
    colors,
    fonts,
    MAX_BADGE_VALUE,
    spaces,
} from '~/core/constants'

interface BadgeProps extends ViewProps {
    count: number
    containerStyle?: StyleProp<ViewStyle>
}

const Badge: FC<BadgeProps> = ({ count, containerStyle, ...props }) => {
    return (
        <View style={[styles.container, containerStyle]} {...props}>
            <Text style={styles.title}>
                {count > MAX_BADGE_VALUE ? `${MAX_BADGE_VALUE}+` : count}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: colors.mds_global_color_red,
        paddingHorizontal: spaces.mds_global_space_4,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        left: spaces.mds_global_space_16,
        top: -3,
        minWidth: 16,
        height: 16,
        ...Platform.select({
            android: {
                top: 0,
            },
        }),
    },
    title: {
        textAlign: 'center',
        ...fonts.style.mds_ui_font_caption_semi,
        color: colors.mds_global_color_white,
        lineHeight: 16,
        ...Platform.select({
            android: {
                top: 1,
            },
        }),
    },
})

export default Badge
