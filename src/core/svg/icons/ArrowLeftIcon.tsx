import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '~/core/svg/types'

function Icon({
    color = colors.mds_global_color_black,
    size = 24,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        // <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        //     <Path
        //         d="M3 12h18M10 5l-7 7 7 7"
        //         stroke={color}
        //         strokeWidth={2}
        //         strokeLinecap="round"
        //         strokeLinejoin="round"
        //     />
        // </Svg>
        <Svg width={size} height={size} viewBox="0 0 1128 1024" {...props}><Path d="M1097.855149 473.209109h-929.064612L568.332002 76.916503a44.938006 44.938006 0 1 0-63.543869-63.55752L0 518.147115l493.403474 492.993954a43.90465 43.90465 0 0 0 62.110549-62.069598L168.544825 563.071471h929.310324a29.94957 29.94957 0 0 0 30.031475-30.031475v-29.881317a29.93592 29.93592 0 0 0-30.031475-29.94957z" fill={color} />
        </Svg>
    )
}

export default Icon
