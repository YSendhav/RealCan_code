import { Platform, Dimensions, PixelRatio } from 'react-native';

const statusBarHeight = 55;
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => Math.round((width / guidelineBaseWidth) * size);
const verticalScale = (size: number) => Math.round((height / guidelineBaseHeight) * size);

const moderateScale = (size: Number | any, factor = 0.5) =>
    Math.round(size + (scale(size) - size) * factor);

const indent = moderateScale(16);
const halfIndent = moderateScale(indent / 2);
const OneAndHalfIndent = moderateScale(indent * 1.5);
const doubleAndHalfIndent = moderateScale(indent * 2.5);
const doubleIndent = moderateScale(indent * 2);
const tripleIndent = moderateScale(indent * 3);
const fourIndent = moderateScale(indent * 4);
const fifthIndent = moderateScale(indent * 5);
const sixIndent = moderateScale(indent * 6);
const seventhIndent = moderateScale(indent * 7);
const eightIndent = moderateScale(indent * 8);

const verticalIndent = verticalScale(indent);
const verticaOneAndHalflIndent = verticalScale(indent * 5);
const doubleVerticalIndent = verticalScale(indent * 2);
const halfVerticalIndent = verticalScale(indent / 2);

const borderRadius = 4;

const iconSize = moderateScale(28);
const bigIconSize = moderateScale(40);
const iconMargin = Platform.OS === 'android' ? 16 : 10;



const widthToDp = (number: number) => {
    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

const heightToDp = (number: number) => {
    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};

export { widthToDp, heightToDp }

export default {
    window: {
        width,
        height,
    },
    statusBarHeight,
    scale,
    verticalScale,
    moderateScale,
    indent,
    halfIndent,
    doubleIndent,
    OneAndHalfIndent,
    doubleAndHalfIndent,
    tripleIndent,
    fourIndent,
    fifthIndent,
    sixIndent,
    seventhIndent,
    eightIndent,
    verticalIndent,
    verticaOneAndHalflIndent,
    halfVerticalIndent,
    doubleVerticalIndent,
    borderRadius,
    iconSize,
    bigIconSize,
    iconMargin,
    isSmallDevice: width < 375
};