import { createAction } from '@reduxjs/toolkit'
import { mockDataType } from "~/core/components/_mock_data/MockData";

export const setStatusBarAction = createAction<boolean>('GET_STATUS_BAR_ACTION')
export const setFavoutiteItemAction = createAction<mockDataType>('SET_FAVOURITE_ITEM_ACTION')
export const getFavoutiteItemAction = createAction<mockDataType>('GET_FAVOURITE_ITEM_ACTION')