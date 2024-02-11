/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com"
    ]
  },
  redirects() {
    return [
      {
        source: "/learning-paths/:path",
        destination: "/learning-paths/:path/videos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
