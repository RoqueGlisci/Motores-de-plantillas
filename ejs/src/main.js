//  npm init - y
//  npm i express
//  npm install ejs

const express = require("express");

const ProductosApi = require("../api/productos.js");

const productosApi = new ProductosApi();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Set engine

app.set("views", "./views");
app.set("view engine", "ejs");

//--------------------------------------------

app.post("/productos", (req, res) => {
  const form = req.body;
  productosApi.guardar(form);
  const hayProductos = productosApi.listarAll();
  res.render("vista", { hayProductos });
});

app.get("/productos", (req, res) => {
  const hayProductos = productosApi.listarAll();
  res.render("vista", { hayProductos });
});

//--------------------------------------------
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
