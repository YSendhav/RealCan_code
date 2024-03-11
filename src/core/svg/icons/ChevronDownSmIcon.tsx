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
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none" {...props}>
            <Path
                d="M12.331 4.75671L13.0743 4.08774L14.4123 5.57433L13.669 6.24329L12.331 4.75671ZM8 10L8.66896 10.7433L8 11.3454L7.33104 10.7433L8 10ZM2.33104 6.24329L1.58774 5.57433L2.92567 4.08774L3.66896 4.75671L2.33104 6.24329ZM13.669 6.24329L8.66896 10.7433L7.33104 9.25671L12.331 4.75671L13.669 6.24329ZM7.33104 10.7433L2.33104 6.24329L3.66896 4.75671L8.66896 9.25671L7.33104 10.7433Z"
                fill={color}
            />
        </Svg>
    )
}

export default Icon
