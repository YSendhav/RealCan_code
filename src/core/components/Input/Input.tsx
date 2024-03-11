import React, { FC, useRef, useState } from 'react'
import {
    Text,
    Platform,
    Keyboard,
    StyleSheet,
    TextInput,
    StyleProp,
    ViewStyle,
    Pressable,
    TextStyle,
} from 'react-native'
import {
    Input as RNEInput,
    InputProps as RNEInputProps,
} from 'react-native-elements'
// import { KeyboardInputAccessoryView } from '~/core/components'
import { colors, fonts, spaces } from '~/core/constants'
import * as Icons from '~/core/svg'


export type InputProps = {
    inputId: string
    label?: string
    showArrows?: boolean
    previousArrowDisabled?: boolean
    nextArrowDisabled?: boolean
    onPressPreviousArrow?: () => void
    onPressNextArrow?: () => void
    onInputRef?: (ref: TextInput | null) => void
    onPressLeftButton?: () => void
    onPressRightButton?: () => void
    containerStyle?: StyleProp<ViewStyle>
    labelStyle?: StyleProp<TextStyle>
    autoCompleteType?: string
} & RNEInputProps

const Input: FC<InputProps> = ({ inputId, ...props }) => {
    const inputRef = useRef<TextInput | null>()
    const isFocused = inputRef.current?.isFocused()

    const [hideText, setHideText] = useState(props.secureTextEntry)

    const toggleHideState = () => setHideText(!hideText)

    const label = props.label
        ? props.label
        : props.value
            ? props.placeholder
            : null

    return (
        <>
            <RNEInput
                {...props}
                containerStyle={[
                    styles.container,
                    isFocused && styles.containerActive,
                    !!props?.errorMessage && styles.containerError,
                    props.containerStyle,
                ]}
                inputContainerStyle={styles.inputContainer}
                inputStyle={[
                    styles.input,
                    (!!props.value || !!props.label) && styles.inputActive,
                ]}
                labelStyle={[
                    styles.label,
                    isFocused && styles.labelActive,
                    !!props?.errorMessage && styles.labelError,
                    props.labelStyle,
                ]}
                label={label}
                errorMessage={undefined}
                inputAccessoryViewID={inputId}
                autoCompleteType={props?.autoCompleteType || 'off'}
                ref={(ref: TextInput | null) => {
                    inputRef.current = ref
                    if (props.onInputRef) {
                        props.onInputRef(ref)
                    }
                }}
            // {...(props.secureTextEntry && {
            //     rightIcon: (
            //         <Pressable onPress={toggleHideState}>
            //             {hideText ? (
            //                 <Icons.EyeCrossedOutlinedSmIcon />
            //             ) : (
            //                 <Icons.EyeOutlinedSmIcon />
            //             )}
            //         </Pressable>
            //     ),
            //     secureTextEntry: hideText,
            //     rightIconContainerStyle: styles.rightIconContainer,
            // })}
            />
            {props?.errorMessage && (
                <Text
                    style={styles.error} >
                    {props?.errorMessage}
                </Text>
            )}
            {/* {Platform.OS === 'ios' && (
                <KeyboardInputAccessoryView
                    nativeID={inputId}
                    showArrows={props.showArrows}
                    previousArrowDisabled={props.previousArrowDisabled}
                    nextArrowDisabled={props.nextArrowDisabled}
                    onPressPreviousArrow={props.onPressPreviousArrow}
                    onPressNextArrow={props.onPressNextArrow}
                    onPressRightButton={() => {
                        Keyboard.dismiss()
                        props.onPressRightButton && props.onPressRightButton()
                    }}
                    onPressLeftButton={props.onPressLeftButton}
                />
            )} */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.mds_global_color_grey_30,
        borderRadius: 4,
        height: 53,
        marginVertical: spaces.mds_global_space_8,
        paddingHorizontal: 0,
        overflow: 'hidden',
        paddingVertical: spaces.mds_global_space_2,
    },
    containerActive: {
        borderColor: colors.mds_global_color_red,
    },
    containerError: {
        marginBottom: 0,
        borderColor: colors.mds_global_color_red_100,
    },
    inputContainer: {
        borderWidth: 0,
        borderColor: colors.mds_global_opacity_0,
        height: '100%',
    },
    input: {
        ...fonts.style.mds_ui_font_body_regular,
        height: '100%',
        paddingHorizontal: spaces.mds_global_space_16,
        lineHeight: 20,
    },
    inputActive: {
        lineHeight: 28,
        ...Platform.select({
            android: {
                marginTop: 15,
                lineHeight: 30,
            },
        }),
    },
    label: {
        position: 'absolute',
        ...fonts.style.mds_ui_font_footnote_regular,
        fontWeight: 'normal',
        color: colors.mds_global_color_grey_50,
        paddingHorizontal: spaces.mds_global_space_16,
    },
    labelActive: {
        ...fonts.style.mds_ui_font_footnote_semi,
        color: colors.mds_global_color_red,
        fontWeight: 'bold',
    },
    labelError: {
        color: colors.mds_global_color_red_100,
    },
    error: {
        ...fonts.style.mds_ui_font_footnote_regular,
        color: colors.mds_global_color_red_100,
        marginBottom: spaces.mds_global_space_8,
        marginHorizontal: spaces.mds_global_space_16,
    },
    rightIconContainer: {
        marginRight: spaces.mds_global_space_16,
    },
})

export default Input
