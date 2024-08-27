import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'source.unsplash.com',
      },
      {
        hostname: 'picsum.photos',
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
