import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { colors } from '~/core/constants'
import { SvgIconType } from '~/core/svg/types'

function Icon({
    color = colors.mds_global_color_black,
    fill = colors.mds_global_color_white,
    size = 20,
    ...props
}: SvgIconType): React.ReactElement {
    return (
        <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
            <Path d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696C170.208 511.872 149.952 512 137.536 524.608c-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224 0.096 0.096 0.128 0.224 0.224 0.32 2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224l449.184-478.208C901.44 330.592 900.768 310.336 887.904 298.208z" fill={color} />
        </Svg>
    )
}

export default Icon
