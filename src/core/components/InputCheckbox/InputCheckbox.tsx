import React, { FC, ReactNode } from 'react'
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from 'react-native'
import { colors, fonts, radius, spaces } from '~/core/constants'
import * as Icons from '~/core/svg'

type InputCheckboxProps = {
    selected: boolean
    onPress?: () => void
    disabled?: boolean
    containerStyle?: StyleProp<ViewStyle>
    selectedColor?: string
    unselectedColor?: string
    value?: string | number | null | undefined
    label?: string
    labelStyle?: StyleProp<TextStyle>
    renderLabelComponent?: () => ReactNode
    radio?: boolean
    accessibilityIdForMultipleSelectCheckox?: boolean
}

const InputCheckbox: FC<InputCheckboxProps> = ({
    selected,
    onPress,
    disabled = false,
    containerStyle,
    selectedColor,
    unselectedColor,
    value,
    label,
    labelStyle,
    renderLabelComponent,
    radio = false,
    accessibilityIdForMultipleSelectCheckox = false,
}) => {
    const _renderIcon = () =>
        selected ? (
            radio ? (
                <Icons.RadioFilledIcon
                    color={selectedColor || colors.mds_global_color_red}
                />
            ) : (
                <Icons.CheckBoxFilledIcon
                    style={styles.checkboxFrameFilled}
                    color={selectedColor || colors.mds_global_color_red}
                />
            )
        ) : radio ? (
            <Icons.RadioOutlinedIcon
                color={unselectedColor || colors.mds_global_color_black}
            />
        ) : (
            <Icons.CheckBoxOutlinedIcon
                style={styles.checkboxFrameOutlined}
                color={unselectedColor || colors.mds_global_color_black}
            />
        )

    const _renderLabel = () =>
        !!label && <Text style={[styles.label, labelStyle]}>{label}</Text>

    return (
        <Pressable
            key={value}
            style={() => [styles.container, containerStyle]}
            onPress={onPress}
            disabled={disabled}
        >
            {_renderIcon()}
            {!renderLabelComponent ? _renderLabel() : renderLabelComponent()}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    checkboxFrameFilled: {
        borderRadius: radius.mds_global_radius_4,
        overflow: 'hidden',
        backgroundColor: colors.mds_global_color_red,
    },
    checkboxFrameOutlined: {
        borderRadius: radius.mds_global_radius_4,
        overflow: 'hidden',
    },
    label: {
        ...fonts.style.mds_ui_font_body_regular,
        marginLeft: spaces.mds_global_space_16,
    },
})

export default InputCheckbox
