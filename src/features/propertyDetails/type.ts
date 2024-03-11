import { StringOmit } from "@rneui/base"

type imagesObj = {
    img: any
}

export type propertyDetailsType = {
    MLSNumber: string,
    type: string,
    levels: string,
    size: string,
    garage: string,
    taxes: number | string,
    daysActive: number,
    maintenanceFees: number | string,
    approxAge: string,
    lotSize: string,
    avgPricePerSqft: number,
    propertyAddress: string,
    price: string,
    activeStatus: string,
    images: imagesObj[]
    estPrice: string,
    estSell: string
}

export type imageViewerType = {
    url: string
    props: {
        source: undefined
    }
}
export type renderFactsItemType = {
    title: string
    value: string | number
}