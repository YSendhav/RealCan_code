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
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} {...props}>
            <Path d="M85.333333 213.333333l298.666667-128 256 128 268.928-115.242666a21.333333 21.333333 0 0 1 29.738667 19.626666V810.666667l-298.666667 128-256-128-268.928 115.242666a21.333333 21.333333 0 0 1-29.738667-19.626666V213.333333z m554.666667 629.930667V306.176l-2.773333 1.194667L384 180.736v537.088l2.773333-1.194667L640 843.264z" fill={color} />
        </Svg>
    )
}

export default Icon

