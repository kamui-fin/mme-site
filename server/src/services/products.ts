import axios from "axios"
import qs from "qs"
import { STRAPI_URL } from "../config"

interface StrapiResponse<T> {
    data: T
}

interface Product {
    id: number
    attributes: {
        title: string
        description: string
        author: string
        price: number
        coverType: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        availability: string
    }
}

export const getStrapiURL = (path = "") => {
    return `${STRAPI_URL}${path}`
}

export const httpStrapi = async <T>(path: string, urlParamsObject = {}, options = {}): Promise<StrapiResponse<T>> => {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    }

    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`

    const response = await axios(requestUrl, mergedOptions)

    if (response.status !== 200) {
        console.error(response.statusText)
        throw new Error(`An error occured please try again`)
    }
    return response.data
}

export const getPrice = async (itemId: number) => {
    const res: StrapiResponse<Product> = await httpStrapi(`/products/${itemId}`)
    return res.data.attributes.price
}

export const calculateOrderAmount = async (items: number[]): Promise<number> => {
    let total = 0
    for (let itemId of items) {
        total += await getPrice(itemId)
    }
    return total
}
