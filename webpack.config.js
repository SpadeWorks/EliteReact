module.exports = require("./make-webpack-config")({
    devServer: {
        historyApiFallback: true
    },
    devtool: 'source-map'
});
