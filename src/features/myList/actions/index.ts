import { createAction } from '@reduxjs/toolkit'
import { mockDataType } from "~/core/components/_mock_data/MockData";
import { Favourite, GetFavouritePayload } from '../type';

export const getFavoutiteItemAction = createAction<GetFavouritePayload>('GET_FAVOURITE_ITEM_ACTION')

export const setFavoutiteItemAction = createAction<mockDataType>('SET_FAVOURITE_ITEM_ACTION')

export const getFavouriteListAction = createAction('GET_FAVOURITE_LIST')

export const setFavouriteListAction =
    createAction<mockDataType[]>('SET_FAVOURITE_LIST')

export const clearFavouriteListAction = createAction('CLEAR_FAVOURITE_LIST')

export const deleteFavouriteAction = createAction<Favourite>('DELETE_FAVOURITE')

export const removeListByIdAction = createAction<string>('REMOVE_LIST_BY_ID')