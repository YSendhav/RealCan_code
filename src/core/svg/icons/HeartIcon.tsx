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
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props} >
            <Path d="M512 910.933333 450.133333 854.613333C230.4 655.36 85.333333 523.52 85.333333 362.666667 85.333333 230.826667 188.586667 128 320 128 394.24 128 465.493333 162.56 512 216.746667 558.506667 162.56 629.76 128 704 128 835.413333 128 938.666667 230.826667 938.666667 362.666667 938.666667 523.52 793.6 655.36 573.866667 854.613333L512 910.933333Z" fill={color} />
        </Svg>

    )
}

export default Icon