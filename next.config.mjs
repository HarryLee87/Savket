/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // register supabase storage domain
    // option 1) remotePatterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cyumfhjuozcbgmbmqoek.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],

    // option 2) domains
    // domains: ['cyumfhjuozcbgmbmqoek.supabase.co'],
  },
};

export default nextConfig;
