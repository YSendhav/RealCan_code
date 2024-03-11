import { ReactElement } from 'react'
import {
    showMessage,
    hideMessage,
    MessageType,
    MessageOptions,
} from 'react-native-flash-message'
import { FLASH_MESSAGE_ANIMATION_DURATION } from '~/core/constants'
import coreStyles from '~/core/styles'
// import * as Icons from '~/core/svg'

// const messageIconsMapping: {
//     [key in MessageType]: ReactElement
// } = {
//     info: Icons.ToastInfoIcon({}),
//     success: Icons.ToastSuccessIcon({}),
//     warning: Icons.ToastWarningIcon({}),
//     danger: Icons.ToastWarningIcon({}),
//     none: Icons.ToastInfoIcon({}),
//     default: Icons.ToastInfoIcon({}),
// }

const getDefaultMessageOptions = ({
    type,
    ...options
}: MessageOptions): MessageOptions => ({
    // renderFlashMessageIcon: () => messageIconsMapping[type || 'default'],
    style: coreStyles.flashMessage,
    titleStyle: coreStyles.flashMessageTitle,
    textStyle: coreStyles.flashMessageText,
    duration: FLASH_MESSAGE_ANIMATION_DURATION,
    floating: true,
    animationDuration: 400,
    type: type,
    ...options,
})

const showFlashMessage = ({ type, ...options }: MessageOptions): void =>
    showMessage({ ...getDefaultMessageOptions({ type, ...options }) })

export { showFlashMessage, hideMessage, getDefaultMessageOptions }
