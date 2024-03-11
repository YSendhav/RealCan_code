const palette = {
    mds_global_color_yellow: '#FFCF00',
    mds_global_color_yellow_5: '#FFF7D4',
    mds_global_color_yellow_50: '#5C4B00',
    mds_global_color_yellow_30: '#FFF9E0',
    mds_global_color_red: '#F22643',
    mds_global_color_red_100: '#731221',
    mds_global_color_red_90: '#E82026',
    mds_global_color_red_80: '#F77D8E',
    mds_global_color_red_70: '#9D2538',
    mds_global_color_red_40: '#862709',
    mds_global_color_red_30: '#FDEDE7',
    mds_global_color_red_20: '#F77D8E',
    mds_global_color_red_10: '#FEE9EC',
    mds_global_color_red_5: '#F5EAEA',
    mds_global_color_brown: '#835111',
    mds_global_color_brown_80: '#3E3233',
    mds_global_color_green: '#00BF26',
    mds_global_color_green_70: '#F7FCF8',
    mds_global_color_green_100: '#025C26',
    mds_global_color_green_90: '#32D74B',
    mds_global_color_green_40: '#0B8A1C',
    mds_global_color_green_30: '#026429',
    mds_global_color_green_50: '#E7F5E2',
    mds_global_color_green_20: '#D0FFD9',
    mds_global_color_green_10: '#EBFFEF',
    mds_global_color_orange: '#F26233',
    mds_global_color_orange_20: '#FEF0EC',
    mds_global_color_orange_80: '#FFFAED',
    mds_global_color_blue: '#1BAFF2',
    mds_global_color_light_blue: '#EBF9FF',


    mds_global_color_teal: '#08C6BA',
    mds_global_color_pink_50: '#FFE7E8',
    mds_global_color_yellow_60: '#FFF5DC',
    mds_global_color_pink_40: '#FFEFF3',
    mds_global_color_green_60: '#DFF5E7',
    mds_global_color_red_50: '#FFDCD6',
    mds_global_color_yellow_20: '#FAEDC9',
    mds_global_color_yellow_10: '#F9F4E3',
    mds_global_color_purple_10: '#EAE4F5',
    mds_global_color_yellow_2: '#FFF4E9',
    mds_global_color_blue_40: '#E8ECF8',
    mds_global_color_blue_30: '#1274E6',
    mds_global_color_blue_20: '#ECF8FE',
    mds_global_color_blue_10: '#5A93C0',
    mds_global_color_pink_10: '#F9EAE3',
    mds_global_color_yellow_15: '#FFF7E1',
    mds_global_color_purple: '#6109FF',
    mds_global_color_purple_light: '#EEE6FF',
    mds_global_color_black: '#000',
    mds_global_color_white: '#ffffff',
    mds_global_color_grey_50: '#6B6B6B',
    mds_global_color_grey_40: '#8E8E8E',
    mds_global_color_grey_30: '#A6A6A6',
    mds_global_color_grey_20: '#E8E8E8',
    mds_global_color_grey_10: '#F4F4F4',
    mds_global_color_grey_5: '#F1F1F1',
    mds_global_color_light_pink: '#F6F4F4',
    mds_global_color_icon_line: '#06C755',
    mds_global_opacity_0: 'transparent',
    mds_global_opacity_black: '#000000B2',
    mds_global_color_gold_100: '#B68D40',
    mds_global_color_gold_50: '#D6AD60',
    mds_global_color_black_10: '#434343',
    mds_global_color_black_100: '#000000',
}

function withOpacity(color: string, opacity: number): string {
    if (!opacity || opacity > 1 || opacity < 0) {
        return color
    }

    opacity = Number(opacity.toFixed(2))

    const alphaHexValue = Math.ceil(opacity * 255)
        .toString(16)
        .toUpperCase()

    return color + alphaHexValue
}

const gradient = {
    mds_red_to_darkred: ['#D21E3A', '#E84861'],
}

export default {
    ...palette,
    withOpacity,
    ...gradient,
}