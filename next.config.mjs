/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bzsenbkckfhepfqlbglp.supabase.co",
        pathname: "/storage/v1/object/public/kad-kahwin/**",
      },
      {
        protocol: "https",
        hostname: "r2.ismiabbas.xyz",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
