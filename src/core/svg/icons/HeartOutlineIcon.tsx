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
            <Path d="M714.07688 108.265796c-78.336136 0-152.170748 35.124985-201.437825 92.215238-49.267077-57.091276-123.099642-92.215238-201.437825-92.215238-138.79409 0-246.201331 105.373932-246.201331 241.502309 0 166.860309 152.171772 300.780391 382.722658 507.156692l64.916499 57.092299 64.916499-57.092299C808.108486 650.548496 960.279235 516.628414 960.279235 349.768105 960.279235 213.639728 852.871993 108.265796 714.07688 108.265796L714.07688 108.265796zM540.268322 799.156092l-9.093099 8.131191-18.535145 16.305361-18.534122-16.305361-9.049097-8.131191c-108.544135-97.111758-202.224748-180.978864-264.211521-255.971859-60.151985-72.851215-86.993307-132.500756-86.993307-193.417151 0-47.977711 18.142196-92.172259 51.058886-124.455523 32.786731-32.17377 77.638241-49.901527 126.292358-49.901527 56.260351 0 111.86681 25.530466 148.763139 68.284199l52.67571 61.112869 52.677756-61.112869c36.895305-42.753733 92.499717-68.284199 148.760069-68.284199 48.65514 0 93.50665 17.727757 126.292358 49.901527 32.917714 32.283264 51.058886 76.477812 51.058886 124.455523 0 60.915371-26.841322 120.564913-86.992283 193.417151C742.449068 618.177228 648.767432 702.044334 540.268322 799.156092L540.268322 799.156092zM540.268322 799.156092" fill={color} />
        </Svg>
    )
}

export default Icon