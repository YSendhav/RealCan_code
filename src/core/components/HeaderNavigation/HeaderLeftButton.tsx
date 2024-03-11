import React, { FC } from 'react'
import IconButton from '../IconButton/IconButton'
import * as Icons from '~/core/svg'
import { colors, fonts } from '~/core/constants'
import { Pressable, Text, StyleSheet } from 'react-native'

interface HeaderLeftButtonProps {
    onPress: () => void
    disabled?: boolean
    label: string | undefined
    tintColor?: string
    pressColor?: string
    pressOpacity?: number
    labelVisible?: boolean
}

const HeaderLeftButton: FC<HeaderLeftButtonProps> = ({
    onPress,
    disabled,
    label,
}) => {
    if (!disabled && onPress) {
        if (label) {
            return (
                <Pressable hitSlop={20} onPress={onPress}>
                    <Text style={styles.title}>{label}</Text>
                </Pressable>
            )
        } else {
            return (
                <IconButton
                    icon={<Icons.ChevronLeftIcon color={colors.mds_global_color_black} />}
                    onPress={onPress}
                />
            )
        }
    } else {
        return null
    }
}

export default HeaderLeftButton

const styles = StyleSheet.create({
    title: {
        ...fonts.style.mds_ui_font_body_regular,
    },
})
