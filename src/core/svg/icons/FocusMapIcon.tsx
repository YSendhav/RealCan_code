import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '~/core/svg/types'

function Icon({
    color = colors.mds_global_color_black,
    size = 16,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props} >
            <Path d="M554.666667 42.666667l0.042666 130.645333A341.504 341.504 0 0 1 850.688 469.333333H981.333333v85.333334l-130.645333 0.042666a341.504 341.504 0 0 1-295.978667 295.978667L554.666667 981.333333h-85.333334v-130.645333a341.504 341.504 0 0 1-296.021333-295.978667L42.666667 554.666667v-85.333334h130.645333A341.504 341.504 0 0 1 469.333333 173.312V42.666667h85.333334z m-42.666667 213.333333a256 256 0 1 0 0 512 256 256 0 0 0 0-512z m0 170.666667a85.333333 85.333333 0 1 1 0 170.666666 85.333333 85.333333 0 0 1 0-170.666666z" fill={color} />
        </Svg>
    )
}

export default Icon
