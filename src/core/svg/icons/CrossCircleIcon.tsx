import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '~/core/svg/types'

function Icon({
    color = colors.mds_global_color_black,
    fill = colors.mds_global_color_white,
    size = 24,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
            <Circle cx={12} cy={12} r={12} fill={color} />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.707 7.293a1 1 0 00-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 101.414 1.414L12 13.414l3.293 3.293a1 1 0 001.414-1.414L13.414 12l3.293-3.293a1 1 0 00-1.414-1.414L12 10.586 8.707 7.293z"
                fill={fill}
            />
        </Svg>
    )
}

export default Icon
