import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import pages from 'vituum/plugins/pages.js';
import handlebars from '@vituum/vite-plugin-handlebars';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

const spriteIconsInput = 'src/assets/images/sprite-icons/*.svg';
const spriteIconsOutput = 'src/assets/images/icons';
const JavaScriptFolderName = 'js';

const getTemplateFiles = (dir) => {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.hbs'))
    .map((file) => path.join(dir, `${file}.html`));
};

export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [
      pages(),
      handlebars({
        root: './src',
      }),
      mode === 'development' ? {} : ViteMinifyPlugin({}),
      ViteSvgSpriteWrapper({
        icons: spriteIconsInput,
        outputDir: spriteIconsOutput,
        sprite: {
          shape: {
            transform: [
              {
                svgo: {
                  plugins: [
                    'preset-default',
                    {
                      name: 'removeAttrs',
                      params: {
                        attrs: 'fill',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      }),
      ViteImageOptimizer({
        test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
        exclude: /sprite.*\.svg$/i,
        png: {
          quality: 80,
        },
        jpeg: {
          quality: 75,
        },
        jpg: {
          quality: 75,
        },
      }),
    ],
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    build: {
      assetsInlineLimit: 0,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        input: getTemplateFiles('./src/pages'),
        output: {
          assetFileNames({ originalFileNames, names }) {
            if (/\.(css|sass|less)$/.test(names[0])) {
              return 'css/[name]-[hash].css';
            }

            if (originalFileNames && originalFileNames.length > 0) {
              const originalPath = originalFileNames[0];
              const assetIndex = originalPath.indexOf('assets/');

              if (assetIndex !== -1) {
                const relativePath = originalPath.slice(assetIndex + 'assets/'.length);
                return `${relativePath}`;
              }
            }
            return '[name][extname]';
          },
          chunkFileNames:
            mode === 'development' ? `${JavaScriptFolderName}/[name]-[hash].js` : `${JavaScriptFolderName}/[name]-[hash].min.js`,
        },
      },
      minify: mode === 'development' ? false : true,
      outDir: 'dist',
    },
    server: {
      open: true,
    },
  };
});
