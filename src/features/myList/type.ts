import { mockDataType } from "~/core/components/_mock_data/MockData";


export type Favourite = {
    deleted?: boolean
    favouriteListItems: mockDataType
}

export type setFavouriteItem = {
    favouriteListItem: mockDataType
}

export type GetFavouritePayload = {
    MLSNumber: string
    loading?: boolean
}

export type FavouritesState = {
    favouriteList: mockDataType[]
    loading: boolean
}