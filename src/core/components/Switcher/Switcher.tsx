import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import ToggleSwitch, { ToggleSwitchProps } from 'toggle-switch-react-native'
import colors from '~/core/constants/colors'
import { heightToDp, widthToDp } from '~/core/constants/layout'

const THUMB_DIAMETER = {
    small: 17,
    medium: 22,
    large: 26,
}

const TRACK_WIDTH = {
    small: 44,
    medium: 50,
    large: 55,
}

const TRACK_HEIGHT = {
    small: 22,
    medium: 30,
    large: 30,
}

export enum SwitcherState {
    ON = 'on',
    OFF = 'off',
}

interface ISwitcherProps {
    isChecked: boolean
    onToggle: () => void
    disabled?: boolean
    size?: ToggleSwitchProps['size']
}

const Switcher: FC<ISwitcherProps> = ({
    isChecked,
    onToggle,
    size = 'medium',
    disabled = false,
}) => {
    const onColor = disabled
        ? colors.mds_global_color_grey_30
        : colors.mds_global_color_green_90
    const offColor = disabled
        ? colors.mds_global_color_grey_30
        : colors.withOpacity(colors.mds_global_color_grey_50, 30)

    const stateStringValue = isChecked ? SwitcherState.ON : SwitcherState.OFF

    const trackStyle = useMemo(
        () => ({ height: TRACK_HEIGHT[size], width: TRACK_WIDTH[size] }),
        [size],
    )
    const thumbStyle = useMemo(
        () => ({
            width: THUMB_DIAMETER[size],
            height: THUMB_DIAMETER[size],
            borderRadius: THUMB_DIAMETER[size] / 2,
        }),
        [size],
    )

    return (
        <View>
            <ToggleSwitch
                disabled={disabled}
                isOn={isChecked}
                onColor={onColor}
                offColor={offColor}
                trackOnStyle={trackStyle}
                trackOffStyle={trackStyle}
                thumbOffStyle={thumbStyle}
                thumbOnStyle={thumbStyle}
                size={size}
                onToggle={onToggle}
                useNativeDriver={false}
            />
        </View>
    )
}

export default Switcher
