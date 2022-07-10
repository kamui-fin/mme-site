import { getStrapiMedia } from "lib/api-strapi/api";
import NextImage from "next/image"

export const Image = ({ image, className = "" }) => {
    const { alternativeText, width, height } = image.data.attributes;

    return (
        <img
            className={className}
            src={getStrapiMedia(image)}
            alt={alternativeText || ""}
        />
    );
};
