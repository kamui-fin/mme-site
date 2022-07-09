import { getStrapiMedia } from "lib/api-strapi/api";
import NextImage from "next/image"

export const Image = ({ image }) => {
    const { alternativeText, width, height } = image.data.attributes;

    return (
        <NextImage
            layout="responsive"
            width={width}
            height={height}
            objectFit="contain"
            src={getStrapiMedia(image)}
            alt={alternativeText || ""}
            />
    );
};
