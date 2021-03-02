const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [{
    test: /\.(js|jsx)$/,
    use: ["babel-loader", "source-map-loader"],
    exclude: /node_modules/,
},
// {
//   test: /\.css$/,
//   use: ['style-loader', 'css-loader']
// },
{
    test: /\.(scss|css)$/,
    use: [
        MiniCssExtractPlugin.loader, // creates style nodes from JS strings
        {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
                importLoaders: 1
            }
        },
        'postcss-loader', // post process the compiled CSS
        'sass-loader' // compiles Sass to CSS, using Node Sass by default
    ]
},
{
    test: /\.(gif|png|jpe?g|webm|webp)$/i,
    use: [
        'file-loader?name=images/[name].[ext]',
        {
            loader: 'image-webpack-loader',
            options: {
                webP: {
                    quality: 75
                }
                //   bypassOnDebug: true, // webpack@1.x
                //   disable: true, // webpack@2.x and newer
            },
        },
    ],
},
{
    test: /\.svg$/,
    use: [{
        loader: '@svgr/webpack',
        options: {
            rule: {
                include: [
                    '/src/images/svg'
                ]
            }
        }
    }],
},
]