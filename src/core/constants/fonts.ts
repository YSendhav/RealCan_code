import colors from '~/core/constants/colors'
import { RFValue } from "react-native-responsive-fontsize";

const family = {
    poppins: {
        regular: 'Poppins-Regular',
        semi: 'Poppins-SemiBold',
        bold: 'Poppins-Bold',
    },
    roboto: {
        regular: 'Roboto-Regular',
        bold: 'Roboto-Bold',
    }
}
export const fontSizeGlobal = {
    mds_global_font_size_40: RFValue(40),
    mds_global_font_size_32: RFValue(32),
    mds_global_font_size_30: RFValue(30),
    mds_global_font_size_28: RFValue(28),
    mds_global_font_size_24: RFValue(24),
    mds_global_font_size_20: RFValue(20),
    mds_global_font_size_18: RFValue(18),
    mds_global_font_size_16: RFValue(16),
    mds_global_font_size_15: RFValue(15),
    mds_global_font_size_14: RFValue(14),
    mds_global_font_size_13: RFValue(13),
    mds_global_font_size_12: RFValue(12),
    mds_global_font_size_11: RFValue(11),
    mds_global_font_size_10: RFValue(10),
    mds_global_font_size_9: RFValue(9),
}

const fontSize = {
    large: fontSizeGlobal.mds_global_font_size_40,
    h1: fontSizeGlobal.mds_global_font_size_32,
    h2: fontSizeGlobal.mds_global_font_size_24,
    h3: fontSizeGlobal.mds_global_font_size_20,
    body: fontSizeGlobal.mds_global_font_size_16,
    medium: fontSizeGlobal.mds_global_font_size_14,
    subText: fontSizeGlobal.mds_global_font_size_13,
    footnote: fontSizeGlobal.mds_global_font_size_12,
    small: fontSizeGlobal.mds_global_font_size_11,
    caption: fontSizeGlobal.mds_global_font_size_10,
}

const fontStyleTheme = {
    heading_large: {
        fontSize: fontSize.large,
        color: colors.mds_global_color_black,
    },
    heading_h1: {
        fontSize: fontSize.h1,
        color: colors.mds_global_color_black,
    },
    heading_h2: {
        fontSize: fontSize.h2,
        color: colors.mds_global_color_black,
    },
    heading_h3: {
        fontSize: fontSize.h3,
        color: colors.mds_global_color_black,
    },
    body: {
        fontSize: fontSize.body,
        color: colors.mds_global_color_black,
    },
    medium: {
        fontSize: fontSize.medium,
    },
    subText: {
        fontSize: fontSize.subText,
        color: colors.mds_global_color_black,
    },
    footnote: {
        fontSize: fontSize.footnote,
        color: colors.mds_global_color_black,
    },
    small: {
        fontSize: fontSize.small,
        color: colors.mds_global_color_black,
    },
    caption: {
        fontSize: fontSize.caption,
        color: colors.mds_global_color_black,
    },
    grey_text: {
        fontSize: fontSize.caption,
        color: colors.mds_global_color_grey_50,
    },
}

const createStyleFont = () => {
    type RegularFontTypeGenerator<Type> = {
        [Property in keyof Type as `mds_ui_font_${Uncapitalize<
            string & Property
        >}_regular`]: Type[Property]
    }

    type SemiBoldFontTypeGenerator<Type> = {
        [Property in keyof Type as `mds_ui_font_${Uncapitalize<
            string & Property
        >}_semi`]: Type[Property]
    }

    type BoldFontTypeGenerator<Type> = {
        [Property in keyof Type as `mds_ui_font_${Uncapitalize<
            string & Property
        >}_bold`]: Type[Property]
    }

    //@ts-ignore
    const boldFonts: BoldFontTypeGenerator<typeof fontStyleTheme> = {}

    //@ts-ignore
    const semiBoldFonts: SemiBoldFontTypeGenerator<typeof fontStyleTheme> = {}
    //@ts-ignore
    const regularFonts: RegularFontTypeGenerator<typeof fontStyleTheme> = {}

    Object.entries(fontStyleTheme).forEach(([key, value]) => {
        //@ts-ignore
        boldFonts[`mds_ui_font_${key}_bold`] = {
            ...value,
            fontFamily: family.poppins.bold
        },
            //@ts-ignore
            semiBoldFonts[`mds_ui_font_${key}_semi`] = {
                ...value,
                fontFamily: family.poppins.semi
            },
            //@ts-ignore
            regularFonts[`mds_ui_font_${key}_regular`] = {
                ...value,
                fontFamily: family.poppins.regular
            }
    })
    return { ...regularFonts, ...semiBoldFonts, ...boldFonts }
}

export default {
    family,
    style: {
        ...createStyleFont(),
        mds_ui_font_number_bold: {
            fontFamily: family.roboto.bold,
            fontSize: fontSizeGlobal.mds_global_font_size_20,
        },
    },
}