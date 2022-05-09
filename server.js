//Bring json-server installed via npm
const jsonServer = require("json-server");

//Create server
const server = jsonServer.create();

//Bring cors installed via npm
const cors = require("cors");

//Define a router variable and specify path for db.json file
const router = jsonServer.router("./db.json");

//Define a middleware variable and specify the build path
const middlewares = jsonServer.defaults({
  static: "./build",
});

//Define a port variable and point it to 5000, as json server is running on port 5000
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);
server.use(cors());
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
