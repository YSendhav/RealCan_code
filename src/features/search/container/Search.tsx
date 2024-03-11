import { colors, fonts, spaces, SEARCH_INPUT_HEIGHT, MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_IOS, MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_ANDROID } from "~/core/constants";
import { View, Text, StyleSheet, Platform, Keyboard, TextInput, Image, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Routes, SearchPageNavProps } from "~/core/navigation/types";
import { SearchBar } from "~/core/components";
import { SearchBarStrings } from "../constant";
import images from "~/core/assets/images";
import FastImage from 'react-native-fast-image'
import { getImageSize } from "~/core/utils/imageHelper";
import SearchSuggationBar from "./SearchSuggationBar";
import ListingsContainer from "./ListingsContainer";
import { _mock_data } from "~/core/components";
import { searchMockDataType } from "../type";
import { useIsFocused } from "@react-navigation/native";
import { setStatusBarAction } from "~/features/browse/actions";
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from "react-native-google-places-autocomplete";
import * as Icons from '~/core/svg'

type Props = {}

const Search: React.FC<SearchPageNavProps> = ({
    route,
    navigation
}) => {
    const [search, setSearch] = useState<string>('');
    const [filteredDataSource, setFilteredDataSource] = useState<searchMockDataType[]>([]);
    const [issFocusSearch, setIsFocusSearch] = useState<boolean>(false)
    const searchInputRef = useRef<TextInput | null>()
    const googlePlacesInputRef = useRef<GooglePlacesAutocompleteRef>(null)
    const [searchKeyword, setSearchKeyword] = useState<string>('')

    const updateSearch = (search: string) => {
        setSearch(search);
        setSearchKeyword(search)
    };
    const isFocused = useIsFocused();

    const onPressIn = () => {
    }
    const getPlaceHolder = () => {
        let placeholder = SearchBarStrings.placeholder.city_Neighbourhood_MLS
        if (Platform.OS === 'ios') {
            placeholder =
                placeholder.length > MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_IOS
                    ? placeholder.slice(0, MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_IOS) + '...'
                    : placeholder
        } else {
            placeholder =
                placeholder.length > MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_ANDROID
                    ? placeholder.slice(0, MAX_SEARCH_PLACEHOLDER_TEXT_LENGTH_ANDROID) +
                    '...'
                    : placeholder
        }
        return placeholder
    }
    const onCloseSearchBox = () => {
        setIsFocusSearch(false)
        Keyboard.dismiss()
    }
    const onSubmitEditing = () => {
        onCloseSearchBox()
    }

    const onClear = () => {
        googlePlacesInputRef.current?.setAddressText('')
        setSearchKeyword('')
        setIsFocusSearch(false)
        setSearch('')
    }
    useEffect(() => {
        isFocused && setSearch('')
    }, [isFocused])

    const onBlur = () => {
        onCloseSearchBox()
    }
    const onFocous = () => {
        setIsFocusSearch(true)
    }

    const onCloseSearchInput = () => {
        searchInputRef.current = null
        onCloseSearchBox()
    }

    const multipleKeysSearch = () => {

    }

    const searchFilterFunction = (text: string) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the MockData and update FilteredDataSource
            const newData = _mock_data.filter((ele) => {
                if (ele.MLSNumber.toUpperCase().includes(text.toUpperCase())) {
                    return ele;
                }
                if (ele.propertyAddress.toUpperCase().includes(text.toUpperCase())) {
                    return ele;
                }
            })
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(_mock_data);
            setSearch(text);
        }
    };

    const imageSize = getImageSize()
    const navigateToBrowsePageWithItem = (item: any) => {
        onClear()
        setSearch('')
        navigation.navigate(Routes.BrowseConatiner, { item: item })

    };
    const navigateToBack = () => {
        navigation.goBack()
        onClear()
        Keyboard.dismiss()
    }
    return (

        <SafeAreaView style={styles.container}>
            {/* TODO we will use in future */}
            <View style={styles.searchBarContainer}>
                <SearchBar
                    onPressIn={onPressIn}
                    text={search}
                    focused={issFocusSearch}
                    onClose={onCloseSearchInput}
                    onBlur={onBlur}
                    onFocus={onFocous}
                    showClearIcon={true}
                    onClear={onClear}
                    placeholder={getPlaceHolder()}
                    onChangeText={(text) => { searchFilterFunction(text) }}
                    navigateToBack={navigateToBack}
                />
            </View>

            {/* TODO we will use folowing feture when implement google api */}

            {/* <View style={styles.searchBarContainer}>
                <GooglePlacesAutocomplete
                    placeholder={getPlaceHolder()}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    textInputProps={{
                        //onFocus: () => focusInput(),
                        //onBlur: () => blurInput(),
                        onChangeText: (text) => setSearchKeyword(text),
                        clearButtonMode: 'never',
                    }}
                    query={{
                        // key: '',
                        language: 'en',
                    }}

                    ref={googlePlacesInputRef}
                    onFail={error => console.log("error in api search", error)}
                    renderLeftButton={() => {
                        return (
                            <View style={styles.searchInputLeftRightIcon}>
                                {
                                    searchKeyword.length >= 1 ?
                                        <TouchableOpacity onPress={navigateToBack}>
                                            <Icons.ArrowLeftIcon color={colors.mds_global_color_black} size={15} />
                                        </TouchableOpacity>
                                        :
                                        <Icons.SearchOutlineIcon color={colors.mds_global_color_black} size={17} />
                                }
                            </View>
                        )
                    }
                    }
                    renderRightButton={() => {
                        return (
                            <View style={[styles.searchInputLeftRightIcon, { right: 0 }]}>
                                {
                                    searchKeyword.length ?
                                        <TouchableOpacity onPress={onClear}>
                                            <Icons.CrossCircleIcon color={colors.mds_global_color_grey_40} size={20} />
                                        </TouchableOpacity>
                                        :
                                        null
                                }
                            </View>
                        )
                    }
                    }
                    styles={{
                        textInput: styles.searchTextInput
                    }}
                />
            </View> */}

            {
                // searchKeyword.length > 1 ?
                search.length > 1 ?
                    (
                        <>
                            <View style={styles.searchSuggationContainer}>
                                <SearchSuggationBar onPressGetItem={navigateToBrowsePageWithItem} searchSuggationData={filteredDataSource} />
                            </View>
                            <View style={styles.listingSuggationContainer}>
                                <ListingsContainer />
                            </View>
                        </>
                    )
                    :
                    <View style={styles.textContainer}>
                        <FastImage
                            source={images.searchBackgroundImage}
                            style={{
                                width: imageSize,
                                height: imageSize,
                            }}
                        />
                        <View style={styles.labelHeadingContainer}>
                            <Text style={styles.labelHeading}>
                                {SearchBarStrings.message.find_Your_Home_With_Us}
                            </Text>
                            <Text style={styles.labelSubHeading}>{SearchBarStrings.message.enter_A_City_Address_Neighbourhood}</Text>
                        </View>
                    </View>

            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: spaces.mds_global_space_12,
        paddingBottom: spaces.mds_global_space_36,
        paddingTop: Platform.OS === 'android' ? spaces.mds_global_space_28 : 0
    },
    searchBarContainer: {
        marginTop: spaces.mds_global_space_5,
        flex: 0.6,
        zIndex: 1
    },
    searchSuggationContainer: {
        flex: 5,
    },
    listingSuggationContainer: {
        marginTop: spaces.mds_global_space_12,
        flex: 2
    },
    textContainer: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBgImage: {
        width: 150,
        height: 150
    },
    labelHeading: {
        ...fonts.style.mds_ui_font_body_bold,
        color: colors.mds_global_color_black,
        textAlign: 'center'
    },
    labelSubHeading: {
        ...fonts.style.mds_ui_font_medium_bold,
        color: colors.mds_global_color_black,
        textAlign: 'center',
        paddingTop: spaces.mds_global_space_6
    },
    labelHeadingContainer: {
        marginTop: spaces.mds_global_space_16,

    },
    itemStyle: {
        padding: 10,
    },
    searchInputLeftRightIcon: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        top: 15,
        paddingHorizontal: spaces.mds_global_space_10
    },
    searchTextInput: {
        ...fonts.style.mds_ui_font_medium_bold,
        color: colors.mds_global_color_black_100,
        paddingLeft: spaces.mds_global_space_36,
        backgroundColor: colors.mds_global_color_white,
    },
})

export default Search;

