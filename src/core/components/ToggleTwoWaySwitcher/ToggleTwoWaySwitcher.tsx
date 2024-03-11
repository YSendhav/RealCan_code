import React, { FC, useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import ToggleSwitch, { ToggleSwitchProps } from 'toggle-switch-react-native'
import colors from '~/core/constants/colors'
import SwitchSelector from "react-native-switch-selector";

type optionsValue = {
    label: string,
    value: string
}

interface ISwitcherProps {
    onPress: (val: string) => void
    textColor: string
    selectedColor: string
    buttonColor: string
    borderColor: string
    containerStyle?: ViewStyle
    options: optionsValue[]
}

const ToggleTwoWaySwitcher: FC<ISwitcherProps> = ({
    onPress,
    containerStyle,
    options,
    textColor,
    selectedColor,
    buttonColor,
    borderColor,
}) => {
    return (
        <View>
            <SwitchSelector
                initial={0}
                onPress={onPress}
                textColor={textColor}
                selectedColor={selectedColor}
                buttonColor={buttonColor}
                borderColor={borderColor}
                hasPadding
                options={options}
                testID="gender-switch-selector"
                style={containerStyle}
            />
        </View>
    )
}

export default ToggleTwoWaySwitcher
