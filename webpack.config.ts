const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// const webpackDevServer = require("@types/webpack-dev-server")

// import * as path from "path";
// import * as HtmlWebpackPlugin from "html-webpack-plugin";
// import * as ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import "webpack-dev-server";
import * as webpack from "webpack";

const config: webpack.Configuration = {
   mode: isDevelopment ? 'development' : 'production',
   devtool: isDevelopment ? 'eval-source-map' : 'source-map',
   entry: path.resolve(__dirname, 'src', 'index.tsx'),// diz qual o arquivo principal da aplicação
   output: {
      path: path.resolve(__dirname, 'dist'), // aponta o diretório de saída
      filename: 'bundle.js', // nome do arquivo de saída no diretório apontado
   },
   resolve: {
      extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
   },
   plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "public", "index.htm")
      })
   ].filter(Boolean),
   module: {
      rules: [
         {
            test: /\.[jt]sx$/, // testa se um arquivo termina com a expressão regular
            exclude: /node_modules/, // exclui a pasta node_modules, pois cada biblioteca deve converter seus arquivos js
            use: {
               loader: 'babel-loader',
               options: {
                  plugins: [
                     isDevelopment && require.resolve('react-refresh/babel')
                  ].filter(Boolean)
               }
            }// é uma dependência que também deve ser instalada
         },
         {
            test: /\.s?css$/, // testa se um arquivo termina com a expressão regular
            exclude: /node_modules/, // exclui a pasta node_modules, pois cada biblioteca deve converter seus arquivos js
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]// é uma dependência que também deve ser instalada
         },
         // {
         //    test: /\.scss$/, // testa se um arquivo termina com a expressão regular
         //    exclude: /node_modules/, // exclui a pasta node_modules, pois cada biblioteca deve converter seus arquivos js
         //    use: [ 'style-loader', 'css-loader', 'sass-loader' ]// é uma dependência que também deve ser instalada
         // },
      ]
   },
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'public')
      },
      port: 3000,
      hot: true,
   }
};

export default config;