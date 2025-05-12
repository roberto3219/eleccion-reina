const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const mainRoutes = require("./src/routes/mainRoutes")
const userRoutes = require("./src/routes/userRoutes")

app.use(cookieParser());

app.use(
    session({
      secret: "Shhh, It's a secret",
      resave: false,
      saveUninitialized: false,
    })
    );
    

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3001;

app.listen(port,()=> console.log(`[server]¨Corriendo en el puerto ${port}`))

app.use(methodOverride("_method"))

app.use(express.static("public"))
app.set("views", "./src/views");

app.set("view engine", "ejs");

app.use("/",mainRoutes)
app.use("/users",userRoutes)

app.use(cors())


app.use((req, res, next) => {
    res.status(404).render("error");
});