import qs from "qs";
import axios from "axios"
import { STRAPI_URL } from "lib/constants";

export const getStrapiURL = (path = "") => {
    return `${STRAPI_URL}${path}`;
}

export const fetchAPI = async (path: string, urlParamsObject = {}, options = {}) => {
    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
        `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    const response = await axios(requestUrl, mergedOptions);

    if (response.status !== 200) {
        console.error(response.statusText);
        throw new Error(`An error occured please try again`);
    }
    return response.data;
}

export const getStrapiMedia = (media) => {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
}
