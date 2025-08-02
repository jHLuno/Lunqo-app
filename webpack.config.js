const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

// Simplified plugin to clean up outdated assets only
class CleanupAssetsPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CleanupAssetsPlugin', (compilation) => {
      // Only clean up outdated .js and .map files
      const publicDir = path.resolve(__dirname, 'public');
      const preservedDirs = new Set(['favicons', 'images', 'fonts']);
      
      if (!fs.existsSync(publicDir)) return;

      const currentBuildScripts = new Set(
        Object.keys(compilation.assets)
          .filter((name) => name.endsWith('.js'))
          .map((name) => path.basename(name))
      );

      fs.readdirSync(publicDir).forEach((file) => {
        // Skip directories that must be preserved
        if (preservedDirs.has(file)) return;

        const filePath = path.join(publicDir, file);
        const ext = path.extname(file);
        const isMap = file.endsWith('.map');
        const isJs = ext === '.js';

        // If it's a JS or MAP and not part of current build assets, delete it
        if ((isJs || isMap) && !currentBuildScripts.has(file) && file !== 'index.html') {
          try {
            fs.unlinkSync(filePath);
            console.log(`Cleaned up outdated asset: ${file}`);
          } catch (err) {
            console.warn(`Failed to delete outdated asset ${file}:`, err);
          }
        }
      });
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
      clean: {
        keep: /^(?!.*\.(js|css)$).*$/ // Keep everything except .js and .css files
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
                  },
                  useBuiltIns: 'usage',
                  corejs: 3
                }],
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-transform-runtime'
              ]
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: !isProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !isProduction,
                postcssOptions: {
                  plugins: [
                    'tailwindcss',
                    'autoprefixer',
                    isProduction && 'cssnano'
                  ].filter(Boolean)
                }
              }
            }
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024 // 8kb
            }
          },
          generator: {
            filename: isProduction ? 'images/[name].[hash][ext]' : 'images/[name][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]' // No hashing for fonts
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body',
        scriptLoading: 'defer',
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
      }),
      new CleanupAssetsPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: isProduction ? 'single' : false,
      minimize: isProduction,
      minimizer: isProduction ? [
        '...',
        new (require('terser-webpack-plugin'))({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            mangle: true,
          },
        }),
      ] : [],
    },
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
  };
}; 