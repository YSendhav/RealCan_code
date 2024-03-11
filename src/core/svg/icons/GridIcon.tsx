import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '../types'

function Icon({
    color = colors.mds_global_color_black,
    size = 24,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
            <Path d="M853.333333 42.666667H170.666667a128 128 0 0 0-128 128v682.666666a128 128 0 0 0 128 128h682.666666a128 128 0 0 0 128-128V170.666667a128 128 0 0 0-128-128z m42.666667 128v298.666666h-341.333333V128h298.666666a42.666667 42.666667 0 0 1 42.666667 42.666667zM170.666667 128h298.666666v341.333333H128V170.666667a42.666667 42.666667 0 0 1 42.666667-42.666667zM128 853.333333v-298.666666h341.333333v341.333333H170.666667a42.666667 42.666667 0 0 1-42.666667-42.666667z m725.333333 42.666667h-298.666666v-341.333333h341.333333v298.666666a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill={color} />
        </Svg>
    )
}

export default Icon