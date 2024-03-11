import React from 'react'
import {
    StyleSheet,
    View,
    Modal as RNModal,
    Text,
    TextStyle,
    StyleProp,
    ViewStyle,
} from 'react-native'
import { fonts, colors, spaces } from '~/core/constants'
import { Button } from '~/core/components'
import coreStyles from '~/core/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

export type ModalProps = {
    visible: boolean
    title?: string
    resetTitle?: string
    description?: string
    icon?: React.ReactNode
    onConfirm?: () => void
    onCancel?: () => void
    confirmButtonTitle?: string
    cancelButtonTitle?: string
    titleStyle?: StyleProp<TextStyle>
    descriptionStyle?: StyleProp<TextStyle>
    cancelButtonStyle?: StyleProp<ViewStyle>
    confirmButtonStyle?: StyleProp<ViewStyle>
    buttonContainerStyle?: StyleProp<ViewStyle>
    column?: boolean
    columnReverse?: boolean
    inverseButtonStyle?: boolean
    modalHeader?: boolean
    children: React.ReactNode | React.ReactNode[] | React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    visible,
    title,
    resetTitle,
    description,
    icon,
    onCancel,
    onConfirm,
    confirmButtonTitle,
    cancelButtonTitle,
    descriptionStyle,
    titleStyle,
    cancelButtonStyle,
    confirmButtonStyle,
    column,
    inverseButtonStyle,
    columnReverse,
    buttonContainerStyle,
    modalHeader,
    children
}) => (
    <RNModal transparent={true} visible={visible}>
        <View style={styles.container}>
            <View style={styles.content}>
                {
                    modalHeader &&
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={onCancel}>
                            {icon}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {resetTitle && <Text>{resetTitle}</Text>}
                        </TouchableOpacity>
                    </View>
                }

                <View
                    style={[
                        styles.buttonsContainer,
                        column && styles.column,
                        columnReverse && styles.columnReverse,
                        buttonContainerStyle,
                    ]}
                >
                    {onCancel && cancelButtonTitle && (
                        <Button
                            outline={!inverseButtonStyle}
                            small
                            style={
                                column
                                    ? [cancelButtonStyle, styles.cancelColumnButton]
                                    : [styles.button, styles.cancelButton, cancelButtonStyle]
                            }
                            title={cancelButtonTitle}
                            onPress={onCancel}
                        />
                    )}
                    {confirmButtonTitle && onConfirm && (
                        <Button
                            outline={inverseButtonStyle}
                            small
                            style={
                                column
                                    ? [confirmButtonStyle]
                                    : [styles.button, confirmButtonStyle]
                            }
                            title={confirmButtonTitle}
                            onPress={onConfirm}
                        />
                    )}
                </View>
                <View>
                    {children}
                </View>
            </View>
        </View>
    </RNModal>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.withOpacity(colors.mds_global_color_black, 0.2),
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spaces.mds_global_space_16,
    },
    content: {
        backgroundColor: colors.mds_global_color_white,
        paddingHorizontal: spaces.mds_global_space_16,
        paddingVertical: spaces.mds_global_space_16,
        width: '100%',
        borderRadius: 8,
    },
    info: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spaces.mds_global_space_8,
    },
    title: {
        ...fonts.style.mds_ui_font_heading_h3_regular,
        color: colors.mds_global_color_black,
        textAlign: 'center',
        marginTop: spaces.mds_global_space_32,
    },
    description: {
        ...fonts.style.mds_ui_font_body_regular,
        color: colors.mds_global_color_grey_50,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spaces.mds_global_space_24,
    },
    column: {
        flexDirection: 'column',
    },
    columnReverse: {
        flexDirection: 'column-reverse',
    },
    button: {
        flex: 1,
    },
    cancelButton: {
        marginRight: spaces.mds_global_space_16,
    },
    cancelColumnButton: {
        marginBottom: spaces.mds_global_space_16,
    },
    modalHeader: {
        ...coreStyles.flexDirectionRow,
        justifyContent: 'space-between'
    }
})

export default Modal
