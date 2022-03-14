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
Onde ficam os códigos, principalmente javascript, da aplicação

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

### Dev server

Existe uma forma mais simples de compilar nosso bundle a cada vez que o código da aplicação é alterado, em vez de sempre executarmos **yarn webpack**.  
Para isso, devemos instalar webpack-dev-server como funcionalidade de desenvolvimento: **yarn add webpack-dev-server -D**  
Depois de instalar o pacote acima devemos configurar a propriedade **devServer** com um objeto de configuração:

```
...
   devServer: {
      static: {
         directory: path.resolve(__dirname, 'public')
      },
      port: 3000 // por padrão a porta é 8080, esta opção permite usar outra porta
   }
...
```
Assim, basicamente dizemos nessa configuração onde está nosso arquivo html estático.
Para mais detalhes acesse a [documentação oficial](https://webpack.js.org/configuration/dev-server/#devserver)

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

### Sourcemap devtool

Permite debugar o código de desenvolvimento após o build da aplicação.
Para configurar essa funcionalidade no webpack insira a propriedade, **devtool** no arquivo de configuração do webpack. Usamos sourcemaps diferentes para desenvolvimento e para produção. **eval-source-map** é uma boa opção para desenvolvimento

#### Ambiente de desenvolvimento vs ambiente de produção

A variável de ambiente pode ser usada para definir se estamos em ambiente de produção ou de desenvolvimento. Definindo assim o modo do wepack com os valores **"production" ou "development"** e os valores de devtool como **"eval-source-map" ou "source-map"** conforme o caso.  
Nos sistemas Unix podemos criar variáveis ambiente no terminal diretamente sem problemas, porém em sistemas ruindows teremos problemas. Logo, por questão de boa prática, usaremos a biblioteca **cross-env** como dependência de desenvolvimento.  
Acrescente os seguintes scripts ao package.json:
```
"scripts": {
   "dev": "webpack serve",
   "build": "cross-env NODE_ENV=production webpack"
},
```

### Arquivos css no javascript
Para utilizar os arquivos css é necessário criar uma nova regra para o arquivo css e instalar os loaders: **style-loader** e o **css-loader**

### Arquivos Sass

Para utilizar o sass instale **yarn add sass -D**, **node-sass está deprecated embora ainda receba atualizações**, e usaremos o loader **sass-loader**.

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
## Estados do React e webpack
Toda vez que salvamos nosso projeto o webpack renderiza toda a página do zero resetando todos os estados.  
Para manter os estados no ambiente de desenvolvimento, instalaremos **yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh**.  
Feito isso basta importar e adicionar o plugin às configurações do webpack.
```
const reactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")
...
plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "public", "index.htm")
      })
   ].filter(Boolean),
...
devServer: {
      ...
      hot: true,
   }
```
como no caso do código acima, se estivermos em ambiente de produção não teremos a execução da função, mas o valor **false**, que não corresponde a um plugin, evitamos um erro adicionando **filter** ao final filtrando os valores booleanos.

Devemos também alterar a configuração das regras do loader do babel como abaixo:
```
{
   ...
   test: /\.jsx$/, // testa se um arquivo termina com a expressão regular
   exclude: /node_modules/, // exclui a pasta node_modules, pois cada biblioteca deve converter seus arquivos js
   use: {
      loader: 'babel-loader',
      options: {
         plugins: [
            isDevelopment && require.resolve('react-refresh/babel')
         ].filter(Boolean)
      }
   }// é uma dependência que também deve ser instalada
   ...
},
```

## Typescript

### Adicionando o typescript à aplicação

Usaremos o typescript para reconhecer tipos e facilitar o reconhecimento do que cada variável ou função deve ter ou retornar.

para instalar essa dependência, que deve ser usada no react como de desenvolvimento, faça: **yarn add typescript -D**

Depois de instalar essa dependência inicialize o typescript:
```
yarn tsc --init
```

Precisamos fazer com que o babel consiga entender o typescript, adicionando um novo preset: **yarn add @babel/preset-typescript -D**, fornecendo a configuração também no arquivo de configuração do babel:
```
...
entry: path.resolve(__dirname, 'src', 'index.tsx')
...
resolve: {
   extensions: [
      ...,
      '.ts',
      '.tsx',
      ...
   ]
},
...
presets: [
      ...
      '@babel/preset-typescript',
      ...
   ]
...
```

Também devemos adicionar a extensão **".tsx"** aos testes das regras do webpack:
```
...
rules: [
   {
      test: /\.[jt]sx?$/, // testa se um arquivo termina com a expressão regular
      ...
   },
  ...
]
...
```