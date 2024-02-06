require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errorHandler } = require('./middlewares/error-handler');
const { verify } = require("./middlewares/auth");
const userRoutes = require("./routes/user");
const i18n = require("i18n");
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.CORS_ALLOWED,
};
i18n.configure({
  locales: ['en', 'id'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  objectNotation: true 
});

app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(errorHandler);

// ini untuk tes auth, sepertinya untuk lebih gampang dipisahin saja file route yg perlu auth dan tidak, jadi ada folder user->auth dan non-auth
// app.use("/api/users", verify, userRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
