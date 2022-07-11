import axios from "axios"
import qs from "qs"
import { STRAPI_URL } from "../config"

export const getStrapiURL = (path = "") => {
    return `${STRAPI_URL}${path}`
}

export const httpStrapi = async (path: string, urlParamsObject = {}, options = {}) => {
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

export const getPrice = (itemId: number) => {
    const res = httpStrapi(`/products/${itemId}`)
    return res.data.attributes.price
}

export const calculateOrderAmount = async (items: number[]): number => {
    let total = 0;
    for (let itemId of items) {
        total += getPrice(itemId);
    }
    return total
}
