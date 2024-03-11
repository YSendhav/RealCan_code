import { colors, fonts, spaces } from '~/core/constants'
import { FlexAlignType, Platform, StyleSheet, TextStyle, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    globalContainer: {
        paddingHorizontal: spaces.mds_global_space_12
    },
    flashMessage: {
        top: spaces.mds_global_space_40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.mds_global_color_grey_20,
        marginHorizontal: spaces.mds_global_space_12,
        shadowColor: colors.mds_global_color_black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 8,
        alignItems: 'center' as FlexAlignType,
        backgroundColor: colors.mds_global_color_white,
        paddingVertical: spaces.mds_global_space_16,
        paddingHorizontal: spaces.mds_global_space_16,
    },
    flashMessageTitle: {
        ...fonts.style.mds_ui_font_body_semi,
        color: colors.mds_global_color_black,
        marginLeft: spaces.mds_global_space_16,
        ...(Platform.OS === 'ios' ? { lineHeight: 0 } : { lineHeight: 30 }),
    },
    flashMessageText: {
        ...fonts.style.mds_ui_font_footnote_semi,
        color: colors.mds_global_color_black,
        marginLeft: spaces.mds_global_space_16,
    },
    shadowTabBarAndroid: {
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        elevation: 24,
    },
    shadowTabBar: {
        shadowColor: colors.mds_global_color_black,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.16,
        shadowRadius: 18,
    },
    shadow: {
        shadowColor: colors.mds_global_color_black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 23,
    },
    flexDirectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    divider: {
        borderColor: colors.mds_global_color_grey_20,
        borderBottomWidth: 1,
    },
    dividerTop: {
        borderColor: colors.mds_global_color_grey_20,
        borderTopWidth: 1.5,
    },
    flex_1: {
        flex: 1
    },
    borderBottomGrey: {
        borderBottomWidth: 0.3,
        borderBottomColor: colors.mds_global_color_grey_40
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        // backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default styles