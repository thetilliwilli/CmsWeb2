npm init --yes

if( (node -e "console.log(require('webpack/package.json').version||'')" ) -eq "" ){npm i -g webpack webpack-dev-server;echo "[webpack & webpack-dev-server]:(installed):"}
npm link --save-dev webpack 
npm link --save-dev webpack-dev-server

npm i --save express
npm i --save body-parser
npm i --save validator
npm i --save morgan
npm i --save cookie

npm install --save bcryptjs jsonwebtoken mongoose passport passport-local
npm i --save cookie-parser
npm i --save express-session
npm i --save react-router-dom react-tap-event-plugin
npm i --save material-ui
npm i --save history

npm i --save redux
npm i --save react-redux
npm i --save uuid

npm i --save-dev react react-dom babel-loader babel-core babel-preset-react babel-preset-es2015 babel-preset-camo
npm i --save-dev babel-plugin-transform-object-rest-spread