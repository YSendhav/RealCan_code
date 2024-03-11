import { RootState } from '~/store/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectFavouriteList = (state: RootState) =>
    state.favourite.favouriteList