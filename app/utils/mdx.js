// Node.js built-in imports removed for Cloudflare Pages compatibility
// import fs from 'fs';
// import path from 'path';

// This file cannot be used in Cloudflare Pages/browser context.
// If you need to access MDX files at runtime, use a manifest or static import instead.

export const POSTS_PATH = undefined;
export const postFilePaths = [];

if (typeof process !== 'undefined' && process.env && process.env.CF_PAGES) {
  throw new Error('app/utils/mdx.js uses Node.js built-ins and cannot run on Cloudflare Pages.');
}
