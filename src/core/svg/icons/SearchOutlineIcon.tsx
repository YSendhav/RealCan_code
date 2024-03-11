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
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
            <Path d="M409.6 672c57.6 0 112-19.2 156.8-54.4l265.6 265.6 22.4-22.4 22.4-22.4-265.6-265.6c32-44.8 54.4-96 54.4-156.8 0-140.8-115.2-256-256-256s-256 115.2-256 256c3.2 140.8 115.2 256 256 256z m0-448c105.6 0 192 86.4 192 192s-86.4 192-192 192-192-86.4-192-192 86.4-192 192-192z" fill={color} />
        </Svg>
    )
}

export default Icon
