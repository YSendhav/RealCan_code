import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '../types'

function Icon({
    color = colors.mds_global_color_black,
    size = 24,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.707 4.293a1 1 0 00-1.414 1.414L10.586 12l-6.293 6.293a1 1 0 101.414 1.414L12 13.414l6.293 6.293a1 1 0 001.414-1.414L13.414 12l6.293-6.293a1 1 0 00-1.414-1.414L12 10.586 5.707 4.293z"
                fill={color}
            />
        </Svg>
    )
}

export default Icon
