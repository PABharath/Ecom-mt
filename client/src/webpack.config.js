const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
  devtool: 'cheap-module-source-map', // Use 'cheap-module-source-map' for a simpler source map
};
