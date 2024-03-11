import React, { FC } from 'react'
import IconButton from '../IconButton/IconButton'
import Button from '../Button/Button'
import * as Icons from '~/core/svg'
import { colors } from '~/core/constants'
import { Pressable, StyleSheet } from 'react-native'

interface HeaderRightButtonProps {
    onPress: () => void
    disabled?: boolean
    label: string | undefined
    disabledButton?: boolean
    loading?: boolean
    icon?: React.ReactNode
}

const HeaderRightButton: FC<HeaderRightButtonProps> = ({
    onPress,
    disabled,
    disabledButton,
    label,
    loading,
    icon,
}) => {
    if (!disabled && onPress) {
        if (label) {
            return (
                <Button
                    title={label}
                    small
                    onPress={onPress}
                    disabled={disabledButton}
                    disabledStyle={styles.disabledRightButton}
                    loader={loading}
                />
            )
        } else {
            return icon ? (
                <Pressable onPress={onPress}>{icon}</Pressable>
            ) : (
                <IconButton
                    icon={
                        <Icons.CloseIcon
                            color={colors.mds_global_opacity_0}
                            fill={colors.mds_global_color_black}
                            style={styles.close}
                        />
                    }
                    onPress={onPress}
                />
            )
        }
    } else {
        return null
    }
}

export default HeaderRightButton

const styles = StyleSheet.create({
    close: {
        minHeight: 44,
    },
    disabledRightButton: {
        backgroundColor: colors.mds_global_color_grey_20,
    },
})
