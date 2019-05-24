const commonPaths = require('./common-paths');
const incstr = require('./incstr');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// function for creating unique className
const createUniqueIdGenerator = () => {
  const index = {};
  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789'
  });
return (name) => {
    if (index[name]) {
      return index[name];
    }
    let nextId;
// className should be started with Numbers
    do {
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));
index[name] = generateNextId();
return index[name];
  };
};

const uniqueIdGenerator = createUniqueIdGenerator();
const generateScopedName = (localName, resourcePath) => {
  const componentName = resourcePath.split('/').slice(-2, -1);
  return `${uniqueIdGenerator(componentName)}_${uniqueIdGenerator(localName)}`
};




const config = {
  mode: 'production',
  entry: {
    app: [`${commonPaths.appEntry}/index.js`]
  },
  output: {
    filename: 'static/[name].[hash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: true,
                getLocalIdent: (context, localIdentName, localName) => {
                    return generateScopedName(localName, context.resourcePath);
                },
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    autoprefixer: {
                      browsers: 'last 2 versions'
                    }
                  }
                },
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                modules: true,
                sourceMap: true
              }
            },
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles/styles.[hash].css',
      allChunks: true
    })
  ]
};
module.exports = config;