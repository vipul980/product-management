const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const productsRoutes = require("./routes/products");
const manageRoutes = require("./routes/manage");
const cookieParser = require("cookie-parser");


const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname+"/views/layouts/",
    extname: "hbs",
    defaultLayout: "login",
    helpers: require("./helpers/handlebar_helper"),
    partialsDir: __dirname+"/views/partials/",

}));

app.use(express.static('public'));

//Routes
app.use("/", loginRoutes);
app.use("/register", registerRoutes);
app.use("/products", productsRoutes);
app.use("/manage", manageRoutes);

module.exports = app;