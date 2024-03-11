import { extendTheme } from 'native-base'


const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: "#E3F2F9",
            100: "#C5E4F3",
            200: "#A2D4EC",
            300: "#7AC1E4",
            400: "#47A9DA",
            500: "#0088CC",
            600: "#007AB8",
            700: "#006BA1",
            800: "#005885",
            900: "#003F5E",
        },
        // Redefining only one shade, rest of the color will remain same.
        amber: {
            400: "#d97706",
        },
    },
    config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: "dark",
    },
    fontConfig: {
        Roboto: {

            400: {
                normal: "Roboto-Regular",
            },
            600: {
                normal: "Roboto-Bold",
            },
        },
        Poppins: {
            300: {
                normal: "Roboto-Regular",
            },
            400: {
                normal: "Roboto-Medium",
            },
            500: {
                normal: "Roboto-SemiBold",
            },
            600: {
                normal: "Roboto-Bold",
            },
        },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
        heading: "Roboto",
        body: "Poppins",
        mono: "Roboto",
    },

});

export default theme;