import { Dimensions, PixelRatio } from 'react-native'
import FastImage, { Source } from 'react-native-fast-image'


const IMAGE_HEIGHT_MULTIPLIER = 0.20
const IMAGE_WIDTH_SUBTRAHEND = 80

export const getImageSize = (): number => {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
        Dimensions.get('screen')
    const imageHeightBasedSize = SCREEN_HEIGHT * IMAGE_HEIGHT_MULTIPLIER
    const imageWidthBasedSize = SCREEN_WIDTH - IMAGE_WIDTH_SUBTRAHEND
    const imageSize =
        imageHeightBasedSize > imageWidthBasedSize
            ? imageWidthBasedSize
            : imageHeightBasedSize
    return imageSize
}

const resizeTypeMap: { [key: string]: string } = {
    [FastImage.resizeMode.cover]: 'fill',
    [FastImage.resizeMode.contain]: 'fit',
}


// export const getResizedImgUri = (
//     dimensions: { width?: number; height?: number },
//     uri?: string,
//     resizeMode: 'contain' | 'cover' = FastImage.resizeMode.contain,
// ): undefined | string => {
//     const isPerformanceImprovements = getFeatureToggle
//         ? getFeatureToggle(PERFORMANCE_IMPROVEMENTS_FLAG)
//         : null

//     if (!uri) {
//         return undefined
//     }
//     if (
//         !isPerformanceImprovements ||
//         !resizedImageDomains.some(domain => uri.includes(domain))
//     ) {
//         return uri
//     }

//     const height =
//         typeof dimensions.height === 'number'
//             ? PixelRatio.getPixelSizeForLayoutSize(dimensions.height)
//             : ''

//     const width =
//         typeof dimensions.width === 'number'
//             ? PixelRatio.getPixelSizeForLayoutSize(dimensions.width)
//             : ''

//     const resizeType = resizeTypeMap[resizeMode] || FastImage.resizeMode.contain

//     return `${currentEnvConfig[RESIZE_IMG_URL]}${resizeType}:${width}:${height}:0/gravity:ce/plain/${uri}`
// }

export const getResizedImgSource = (
    source: number | Source,
    imgDimensions: { height?: number; width?: number },
) => {
    if (typeof source === 'number') {
        return source
    }
    const { uri, ...rest } = source
    return {
        ...rest,
        // uri: getResizedImgUri(imgDimensions, uri) || uri,
    }
}
