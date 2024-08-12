/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000', "symmetrical-trout-g59wx4j7rjv3wrr6-3000.app.github.dev"]
        }
    }
};

export default nextConfig;
