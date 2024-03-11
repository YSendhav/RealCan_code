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
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
            <Path d="M305.92 810.666667H170.666667a42.666667 42.666667 0 0 1 0-85.333334h135.253333a128.042667 128.042667 0 1 1 0 85.333334z m454.826667-341.333334H853.333333a42.666667 42.666667 0 0 1 0 85.333334h-92.586666a128.042667 128.042667 0 1 1 0-85.333334zM640 554.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m-128-256a42.666667 42.666667 0 0 1 0-85.333334h341.333333a42.666667 42.666667 0 0 1 0 85.333334h-341.333333z m-341.333333 256a42.666667 42.666667 0 0 1 0-85.333334h213.333333a42.666667 42.666667 0 0 1 0 85.333334H170.666667z m256 256a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334zM256 384a128 128 0 1 1 0-256 128 128 0 0 1 0 256z m0-85.333333a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z m426.666667 512a42.666667 42.666667 0 0 1 0-85.333334h170.666666a42.666667 42.666667 0 0 1 0 85.333334h-170.666666z" fill={color} />
        </Svg>
    )
}

export default Icon
