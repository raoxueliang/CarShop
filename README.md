[中文用户请点](./README_CN.md)

# Browser
Based on Vue.js+ElementUI 

---
## Preparation
You need install node.js and git in your own computer, The project is based on ES2015+, vue, vuex, vue-router, axios and element-ui.Understanding and learning this knowledge in advance will greatly help the use of this project.

## Project Structure
This project has built the following templates, and have built a scaffold based on Vue, which should help you prototyping production-ready admin interfaces. It covers almost everything you need.
```text
├── build                      // webpack config files
├── config                     // main project config
├── src                        // main source code
│   ├── api                    // api service
│   ├── assets                 // module assets like fonts,images (processed by webpack)
│   ├── components             // global components
│   ├── directive              // global directive
│   ├── filters                // global filter
│   ├── icons                  // svg icons
│   ├── mock                   // mock data
│   ├── router                 // router
│   ├── store                  // store
│   ├── styles                 // global css
│   ├── utils                  // global utils
│   ├── views                  // views
│   ├── App.vue                // main app component
│   ├── main.js                // app entry file
│   └── permission.js          // permission authentication
├── static                     // pure static assets (directly copied)
│   └── Tinymce                // rich text editor
├── .babelrc                   // babel config
├── .eslintrc.js               // eslint config
├── .gitignore                 // sensible defaults for gitignore
├── favicon.ico                // favicon ico
├── index.html                 // index.html template
└── package.json               // package.json
```
## Getting started
```text
# clone the project
git clone -b browser https://github.com/lipese/CarShop.git

# install dependency
npm install

# develop
npm run dev
```
This will automatically open [http://localhost:8080](http://localhost:8080).

## Screenshots

#### Home

![home-1](./screenshots/home-1.png)
![home-2](./screenshots/home-2.png)
![home-3](./screenshots/home-3.png)

#### Search

![search](./screenshots/search.png)

#### Login

![login](./screenshots/login.png)

#### Register

![register](./screenshots/register.png)

#### Online Chat

![chat-1](./screenshots/chat-1.png)
![chat-2](./screenshots/chat-2.png)

#### Shopping Cart

![shopping-cart](./screenshots/shopping-cart.png)

#### My Order

![my-order](./screenshots/my-order.png)

#### My Info.

![my-info](./screenshots/my-info.png)

#### Shop

![shop](./screenshots/shop.png)

#### Car Info.

![car-1](./screenshots/car-1.png)
![car-2](./screenshots/car-2.png)

#### Order Info.

![order](./screenshots/order.png)

## License
[MIT](./LICENSE)  
Copyright (c) 2017-present lipese
