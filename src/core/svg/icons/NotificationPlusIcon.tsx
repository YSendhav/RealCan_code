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
        // <Svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" {...props}>
        //     <Path d="M544 129.728V64h-64v65.728a288 288 0 0 0-256 286.272V704l-57.6 76.8a32 32 0 0 0 25.6 51.2h163.2a160 160 0 0 0 313.6 0H832a32 32 0 0 0 25.6-51.2l-57.6-76.8V416a288 288 0 0 0-256-286.272z m-256 595.584V416a224 224 0 1 1 448 0v309.312L768 768H256l32-42.688zM512 896a96 96 0 0 1-90.56-64h181.12A96 96 0 0 1 512 896z" fill={color} fill-opacity=".9" />
        // </Svg>
        <Svg width={size} height={size} viewBox="0 0 512 512" fill="none" {...props}>
            <Path d="M365.71,292.57v73.14h-73.14v48.76h73.14v73.14h48.76v-73.14h73.14v-48.76h-73.14v-73.14 M243.81,0
		c-26.93,0-48.76,21.83-48.76,48.76c-0.17,2.35-0.17,4.72,0,7.07c-70.22,20.72-121.9,86.06-121.9,163.6v146.29l-48.76,48.76v24.38
		h227.96c-5.59-15.65-8.48-32.14-8.53-48.76c0-80.79,65.49-146.29,146.29-146.29c8.17,0.05,16.33,0.78,24.38,2.19v-26.58
		c0-77.53-51.69-142.87-121.9-163.6c0.17-2.35,0.17-4.72,0-7.07C292.57,21.83,270.74,0,243.81,0 M195.05,463.24
		c0,26.93,21.83,48.76,48.76,48.76c16.09,0,31.14-7.94,40.23-21.21c-7.88-8.35-14.76-17.6-20.48-27.55H195.05z" fill={color} />
        </Svg>
    )
}

export default Icon
