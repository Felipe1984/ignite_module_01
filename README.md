## Introdução  

O objetivo aqui é aprender como configurar um projeto react do zero, usando o webpack e babel.

### Comandos  
* Iniciar repositório:  
   * **yarn init -y**; ou
   * **npm init -y**
* Instalação do react:
   * **yarn add react**;
   * **yarn add react-dom**;
* Conversão de arquivos com webpack:
   * **yarn webpack**

## Códigos da aplicação

### Pasta src
Onde ficam os códigos, principalmente javascript, daa aplicação

### Pasta public
Aqui ficam arquivos públicos da aplicação como:
* index.html;
* robots.txt;
* favicon.ico;
* assets em geral;
* etc.

## Configuração do babel
### Instalação
yarn add @babel/core @babel/cli @babel/preset-env -D

* @babel/core:  
Basicamente é a biblioteca babel em si
* @babel/cli:  
Permite usar a linha de comandos, exemplor: yarn babel -h mostra uma breve ajuda sobre os comandos e opções contidas no pacote
* @babel/preset-env:  
Identifica o ambiente em que a aplicação está sendo executada para melhor converção do código

### Babel com react
Para que o babel entenda o jsx usado pelo react é necessário a instalação de outro preset:  
yarn add @babel/preset-react -D

### Arquivo de configuração
#### babel.config.js
exemplo de composição do arquivo de configuração:
```
module.exports = {
   presets: [
      '@babel/preset-env',
      '@babel/preset-react
   ]
}
```


### Convertendo arquivo

yarn babel src/index.js --out-file dist/bundle.js  

O código acima converte o arquivo criando o arquivo bundle.js na pasta dist, que, caso não exista, será criada.

## Webpack

### Introdução
O webpack traz em suas funcionalidades, vários loaders, fazendo com que a aplicação entenda não só javascript e html, mas também arquivos css, imagens, scss, entre outros. A aplicação javascript passa a "saber" como tratar a importação de cada um desses arquivos.

### Instalação
yarn add webpack webpack-cli webpack-dev-server -D

### Arquivo de configuração  
#### webpack.config.js

instale a dependência **yarn add babel-loader -D** e configure:
```
const path = require('path');

module.exports = {
   entry: path(__dirname, 'src', 'index.jsx'),// diz qual o arquivo principal da aplicação
   output: {
      path: path(__dirname, 'dist'), // aponta o diretório de saída
      filename: 'bundle.js', // nome do arquivo de saída no diretório apontado
   },
   resolve: {
      extensions: [
         '.js',
         '.jsx'
      ]
   },

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
```

### Convertendo com webpack

Use **yarn webpack** para converter o código



### Modos de execução
* Production:  
   * Execução em ambiente de produção. É um pouco mais demorado pois realiza todas as otimizações feitas já para o ambiente de produção.
* Development:  
   * Execução em ambiente de desenvolvimento. É mais rápido para gerar os arquivos, pois não realiza as otimizações.

ao definir a opção **mode** no arquivo de configuração podemos fornecer **development** ou **production**

### Injetando javascript
Instale: **yarn add html-webpack-plugin -D**

Agora no arquivo de configuração do webpack importe **html-webpack-plugin** e adicione a opção **plugins**; forneça um array com uma instância de html-webpack-plugin passando como parâmetro um objeto de configuração com o índice **template** tendo o caminho como valor, exemplo:

```
...
const HtmlWebpackPlugin = require('html-webpack-plugin');
...
module.exports = {
   ...
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "public", "index.htm")
      })
   ],
   ...
}
```

## Renderização com react

No arquivo index.jsx devemos importar a função **render** de **react-dom**. E no arquivo index.htm devemos ter uma **div** com **id='root'**, que irá renderizar toda a aplicação.  
A função **render** recebe dois parâmetros. O primeiro é o que queremos renderizar e o segundo é dentro de qual elemento queremos renderizar o elemento.

### Importação React  
A partir da versão 17 do react não é mais necessário importar o React em todos os arquivos que renderizam jsx.  
Para isso funcionar no arquivo de configuração do babel adicionamos um objeto de confituração junto ao preset react, envolveldo ele com um array, assim:
```
module.exports = {
   presets: [
      '@babel/preset-env',
      ['@babel/preset-react', {
         runtime: automatic
      }]
   ]
}
```