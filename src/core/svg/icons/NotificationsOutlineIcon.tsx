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
            <Path d="M544 129.728V64h-64v65.728a288 288 0 0 0-256 286.272V704l-57.6 76.8a32 32 0 0 0 25.6 51.2h163.2a160 160 0 0 0 313.6 0H832a32 32 0 0 0 25.6-51.2l-57.6-76.8V416a288 288 0 0 0-256-286.272z m-256 595.584V416a224 224 0 1 1 448 0v309.312L768 768H256l32-42.688zM512 896a96 96 0 0 1-90.56-64h181.12A96 96 0 0 1 512 896z" fill={color} fill-opacity=".9" />
        </Svg>
    )
}

export default Icon
