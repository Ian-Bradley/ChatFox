# Chattr

Chattr is a React.js/Node.js & WebSocket based chat application.

### Final Product
<!-- !["Screenshot of Chattr"](https://raw.githubusercontent.com/IA-n7/Chattr/master/build/Chattr.gif) -->

### Major Dependencies

FRONTEND:
React.js
React Router
Redux (@reduxjs/toolkit)
Styled Components
Babel // Dev
ESLint // Dev
WebPack // Dev

BACKEND:
Node.js
Dotenv
Express
PostgreSQL
WebSockets (ws)

### Setup

1. Install all dependencies (using the `npm install` command).
2. Run the development web server using `npm start`
3. Go to <http://localhost:3000/> in your browser.
4. Install server dependencies in the ws folder (using the `npm install` command).
5. Run the Webpack Socket sever in the ws folder using `npm start`

### Linting

React ESLint

```
npm run lint
```

### Credits

Luminosity Calculator for Hex Codes:
https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients

Other possibilities for luminosity:
https://github.com/bgrins/TinyColor || https://bgrins.github.io/TinyColor/