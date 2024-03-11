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
            <Path d="M679.0656 223.66208c-16.80384 8.3968-44.26752 8.3968-61.07136 0L405.99552 117.66784c-16.80384-8.3968-44.26752-8.3968-61.07136 0L102.4 238.92992V921.6l242.5344-121.27232c16.80384-8.3968 44.26752-8.3968 61.07136 0l211.99872 106.00448c16.80384 8.3968 44.26752 8.3968 61.07136 0L921.6 785.07008V102.4L679.0656 223.66208zM409.6 195.79904l204.8 102.4v530.00192l-204.8-102.4V195.79904z m-238.92992 85.32992l170.65984-85.32992v530.00192l-170.65984 85.32992V281.12896z m682.65984 461.74208l-170.65984 85.32992V298.19904l170.65984-85.32992v530.00192z" fill={color} />
        </Svg>
    )
}

export default Icon

