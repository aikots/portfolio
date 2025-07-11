import { mergeConfig } from 'vite';

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../app/components/**/*.stories.jsx',
    '../app/routes/**/*.stories.jsx'
  ],
  addons: [
    { name: '@storybook/addon-essentials', options: { backgrounds: false } },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.js',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.glsl'],
      build: {
        assetsInlineLimit: 1024,
      },
    });
  },
};

export default config;
