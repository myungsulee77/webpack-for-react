commonPaths = require('./common-paths');
const incstr = require('./incstr');
const webpack = require('webpack');
const port = process.env.PORT || 3000;



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
  mode: 'development',
  entry: {
    app: `${commonPaths.appEntry}/index.js`
  },
  output: {
    filename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
              getLocalIdent: (context, localIdentName, localName) => {
                  return generateScopedName(localName, context.resourcePath);
              },
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    hot: true,
    open: true
  }
};
module.exports = config;