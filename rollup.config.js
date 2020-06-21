import {basename, join, relative} from 'path';
import {cleanPlugin} from '@alorel/rollup-plugin-clean';
import nodeResolve from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import {sassPlugin} from "@alorel/rollup-plugin-scss";
import {modularCssExporterPlugin, modularCssProcessorPlugin} from '@alorel/rollup-plugin-modular-css';
import {IifeIndexRendererRuntime as IndexRendererRuntime} from '@alorel/rollup-plugin-index-renderer-iife';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import {copyPlugin} from '@alorel/rollup-plugin-copy';
import {generateSW} from "rollup-plugin-workbox";
import {description} from './package.json';
import {manifestJsonPlugin} from '@alorel/rollup-plugin-manifest-json';

const publicPath = process.env.CI ? '/rs3-fish-flingers-assist/' : '/';
const srcDir = join(__dirname, 'src');
const distDir = join(__dirname, 'dist');
const isProd = process.env.NODE_ENV === 'production';

global.__ROLLUP_BUILD_DESCRIPTION = description;

const indexRenderer = new IndexRendererRuntime({
  base: publicPath,
  entrypoint: 'main',
  input: join(srcDir, 'index.pug'),
  outputFileName: 'index.html',
  pugOptions: {
    self: true,
    globals: [
      '__ROLLUP_BUILD_DESCRIPTION'
    ]
  }
});

const regAllStyles = /\.s?css$/;
const resolveExt = ['.mjs', '.js', '.ts', '.tsx', '.jsx', '.json'];
const styleDir = join(srcDir, 'assets', 'styles');

export default function ({watch}) {
  return {
    input: {
      main: join(srcDir, isProd ? 'entry.prod.tsx' : 'entry.dev.ts')
    },
    output: {
      assetFileNames: `[name]${isProd ? '.[hash]' : ''}[extname]`,
      dir: distDir,
      format: 'iife',
      entryFileNames: `[name]${isProd ? '.[hash]' : ''}.js`,
      chunkFileNames: `[name]${isProd ? '.[hash]' : ''}.js`,
      sourcemap: !isProd
    },
    plugins: [
      alias({
        entries: [
          {find: /^preact\/(compat|hooks|debug|devtools)$/, replacement: 'preact/$1/dist/$1.module.js'},
          {find: 'lodash', replacement: 'lodash-es'},
          {find: '~bootstrap', replacement: join(styleDir, 'bootstrap.scss')},
          {find: /^~style:\\(.+)$/, replacement: join(styleDir, '$1')}
        ]
      }),
      nodeResolve({
        extensions: resolveExt,
        mainFields: ['fesm5', 'esm5', 'module', 'main', 'browser']
      }),
      cleanPlugin(),
      url({
        include: /\.png/,
        limit: 0,
        publicPath,
        fileName: `[dirname][name]${isProd ? '.[hash]' : ''}[extname]`
      }),
      sassPlugin({
        baseUrl: publicPath,
        include: /\.scss$/,
        sassOpts: {
          sourceMap: false
        }
      }),
      (() => {
        const processorConfig = {
          before: [
            require('autoprefixer')(),
          ]
        };
        const opts = {
          include: regAllStyles,
          sourceMap: false,
          processorConfig
        };
        if (isProd) {
          processorConfig.before.push(
            require('cssnano')()
          );

          let fileCounter = 0;
          const fileIds = {};
          const selectorIds = {};
          processorConfig.namer = function (absoluteFile, selector) {
            const file = relative(__dirname, absoluteFile);
            if (!(file in selectorIds)) {
              selectorIds[file] = {
                counter: 0,
                ids: {}
              };
              fileIds[file] = fileCounter.toString(36);
              fileCounter++;
            }

            const selectors = selectorIds[file];
            if (!selectors.ids[selector]) {
              selectors.ids[selector] = selectors.counter.toString(36);
              selectors.counter++;
            }

            const fileId = `f${fileIds[file]}`;
            const selectorId = `s${selectors.ids[selector]}`;

            return fileId + selectorId;
          }
        } else {
          const reg = /[.\s]/g;
          processorConfig.namer = (file, selector) => `${basename(file).replace(reg, '_')}--${selector}`;
        }

        return modularCssProcessorPlugin(opts);
      })(),
      modularCssExporterPlugin({
        pureLoadStyle: false,
        styleImportName: 'loadStyle',
        include: regAllStyles,
        sourceMap: false
      }),
      typescript(),
      replacePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.PUBLIC_PATH': JSON.stringify(publicPath)
      }),
      copyPlugin({
        defaultOpts: {
          glob: {
            cwd: join(srcDir, 'assets')
          },
          emitNameKind: 'fileName'
        },
        copy: [
          'favicon.png'
        ]
      }),
      manifestJsonPlugin({
        input: join(srcDir, 'manifest.json'),
        baseDir: join(srcDir, 'assets'),
        minify: isProd,
        fileName: 'manifest.json',
        replace: [
          [/__DESCRIPTION__/, description],
          [/__PUBLIC_PATH__/, publicPath]
        ],
        watch
      }),
      indexRenderer.createPlugin(),
      indexRenderer.createOutputPlugin(),
      generateSW({
        swDest: join(distDir, 'service-worker.js'),
        mode: isProd ? 'production' : 'development',
        globDirectory: 'dist',
        globPatterns: ['**/*.{js,png,html}'],
        manifestTransforms: [manifestEntries => {
          const indexEntry = {
            url: publicPath
          };

          return {
            manifest: manifestEntries
              .reduce(
                (acc, entry) => {
                  acc.push({
                    ...entry,
                    url: publicPath + entry.url
                  });
                  if (entry.url === 'index.html') {
                    indexEntry.revision = entry.revision;
                  }

                  return acc;
                },
                [indexEntry]
              )
          }
        }],
        cacheId: 'rs3-fish-flingers',
        cleanupOutdatedCaches: true,
        sourcemap: false,
        runtimeCaching: (() => {
          const base = {
            handler: 'StaleWhileRevalidate',
            method: 'GET'
          };

          return [
            {
              ...base,
              urlPattern: /polyfill\.io/
            },
            {
              ...base,
              urlPattern: publicPath
            },
            {
              ...base,
              handler: 'NetworkFirst',
              urlPattern: publicPath + 'manifest.json'
            }
          ]
        })()
      }),
      ...(() => {
        if (!isProd) {
          return [];
        }

        const ecma = 5;
        const ie8 = false;
        const safari10 = true;

        return [
          require('@alorel/rollup-plugin-iife-wrap').iifeWrapPlugin({
            ssrAwareVars: []
          }),
          require('@alorel/rollup-plugin-threaded-terser').threadedTerserPlugin({
            terserOpts: {
              compress: {
                drop_console: true,
                keep_infinity: true,
                typeofs: false,
                ecma
              },
              ecma,
              ie8,
              mangle: {
                safari10
              },
              output: {
                comments: false,
                ie8,
                safari10
              },
              safari10,
              sourceMap: false
            }
          })
        ]
      })(),
    ]
  };
};
