import { colors, fonts, spaces, SEARCH_INPUT_HEIGHT, global, MIN_SEARCH_KEYWOARD_LENGTH, radius } from "~/core/constants";
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SearchPageNavProps } from "~/core/navigation/types";
import { SearchBar } from '@rneui/themed';
import * as Icon from '~/core/svg'
import { IconNode } from 'react-native-elements/dist/icons/Icon'
import coreStyles from '~/core/styles'

type SearchInputProps = {
    text?: string
    focused?: boolean
    showClearIcon?: boolean
    onChangeRef?: (ref: TextInput | null) => void
    onClose: () => void
    onBlur: () => void
    onFocus: () => void
    onClear: () => void
    onPressIn?: () => void
    onChangeText?: (text: string) => void
    placeholder: string
    navigateToBack?: () => void
}

const Search: React.FC<SearchInputProps> = ({
    text = '',
    focused,
    showClearIcon,
    onChangeRef,
    onBlur,
    onFocus,
    onClear,
    onPressIn,
    onChangeText,
    placeholder,
    navigateToBack
}) => {
    const [search, setSearch] = useState<string>();
    const [searchKeyword, setSearchKeyword] = useState<string>(text || '')
    useEffect(() => {
        setSearchKeyword(text || '')
    }, [text])

    const changeSearchRef = (ref: TextInput | null) => {
        if (onChangeRef) {
            onChangeRef(ref)
        }
    }
    const _renderSearchIcon = () =>
        (
            <Icon.SearchOutlineIcon size={18} color={colors.mds_global_color_black} />
        ) as IconNode & {
            name: string
        }
    const _renderLeftBackArrowIcon = () =>
    (
        <TouchableOpacity onPress={navigateToBack}>

            <Icon.ArrowLeftIcon size={18} color={colors.mds_global_color_black} />
        </TouchableOpacity>
    )

    const handleOnClear = () => {
        if (onClear) {
            setSearchKeyword('')
            onClear()
        }
    }

    const _renderClearIcon = () => {
        return (
            <TouchableOpacity
                onPress={handleOnClear}
            >
                <Icon.CrossCircleIcon
                    size={22}
                    color={colors.mds_global_color_grey_30}
                />
            </TouchableOpacity>
        ) as IconNode
    }

    return (
        <SearchBar
            platform={Platform.OS === 'ios' ? 'ios' : 'default'}
            ref={(searchRef: any) => changeSearchRef(searchRef)}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.mds_global_color_grey_40}
            placeholder={placeholder}
            searchIcon={searchKeyword.length === 0 ? _renderSearchIcon() : _renderLeftBackArrowIcon()}
            leftIconContainerStyle={styles.leftIconContainer}
            clearIcon={
                text && showClearIcon
                    ? _renderClearIcon()
                    : (null as unknown as IconNode & {
                        name: string
                    })
            }

            cancelButtonProps={{
                buttonStyle: styles.cancelButton,
            }}
            returnKeyType={'search'}
            showLoading={false}
            lightTheme
            loadingProps={{}}
            round={false}
            value={searchKeyword || ''}
            focusable={focused}
            onChangeText={onChangeText}
            onPressIn={onPressIn}
            onBlur={() => {
                if (searchKeyword.length < MIN_SEARCH_KEYWOARD_LENGTH) {
                    onBlur()
                }
            }}
            onFocus={onFocus}
            onClear={() => {
                return
            }} //onClear here does not do anything since we already have the handleOnClear take care when user want to clear the text from x icon

        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mds_global_opacity_0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        paddingBottom: 0,
        ...Platform.select({
            ios: {
                paddingTop: -spaces.mds_global_space_12,
            },
        }),
        ...Platform.select({
            ios: {
                shadowColor: colors.mds_global_color_black,
                shadowOffset: {
                    width: 0,
                    height: 1,
                },

                shadowOpacity: 0.22,

                // shadowRadius: 18,
            },
            android: {
                ...coreStyles.shadow
            }
        })

    },
    inputContainer: {
        backgroundColor: colors.mds_global_color_white,
        height: SEARCH_INPUT_HEIGHT,
        borderRadius: radius.mds_global_radius_4,
        borderWidth: 1,
        borderColor: colors.mds_global_color_grey_20,
        padding: 0,
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    input: {
        ...fonts.style.mds_ui_font_subText_regular,
        color: colors.mds_global_color_black,
        textAlignVertical: 'center',
    },
    cancelButton: {
        display: 'none',
    },
    cancelText: {
        ...fonts.style.mds_ui_font_body_regular,
        color: colors.mds_global_color_grey_40,
        padding: 0,
        margin: 0,
        marginLeft: 5,
    },
    leftIconContainer: {
        marginLeft: spaces.mds_global_space_12,
    },
})

export default Search;