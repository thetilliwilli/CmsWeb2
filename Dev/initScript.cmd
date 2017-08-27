npm init --yes

if( (node -e "console.log(require('webpack/package.json').version||'')" ) -eq "" ){npm i -g webpack webpack-dev-server;echo "[webpack & webpack-dev-server]:(installed):"}
npm link --save-dev webpack 
npm link --save-dev webpack-dev-server

npm i --save express
npm i --save body-parser
npm i --save validator

npm install --save bcryptjs jsonwebtoken mongoose passport passport-local

npm i --save-dev react react-dom babel-loader babel-core babel-preset-react babel-preset-es2015 babel-preset-camo

npm i --save-dev react-router-dom material-ui react-tap-event-plugin
