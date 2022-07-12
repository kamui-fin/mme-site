/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        loader: "default",
        domains: ["localhost"],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        })
        return config
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    rewrites: [
        {
            source: "/cms",
            destination: process.env.STRAPI_URL,
        },
    ]
}

module.exports = nextConfig
