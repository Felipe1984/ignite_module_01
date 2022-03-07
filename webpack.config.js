const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: 'development',
   entry: path.resolve(__dirname, 'src', 'index.jsx'),// diz qual o arquivo principal da aplicação
   output: {
      path: path.resolve(__dirname, 'dist'), // aponta o diretório de saída
      filename: 'bundle.js', // nome do arquivo de saída no diretório apontado
   },
   resolve: {
      extensions: [
         '.js',
         '.jsx'
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "public", "index.htm")
      })
   ],
   module: {
      rules: [
         {
            test: /\.jsx$/, // testa se um arquivo termina com a expressão regular
            exclude: /node_modules/, // exclui a pasta node_modules, pois cada biblioteca deve converter seus arquivos js
            use: 'babel-loader'// é uma dependência que também deve ser instalada
         }
      ]
   }
}