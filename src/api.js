require('dotenv').config()
const hapi = require("hapi");
const FileRoute = require("./Api/Routes/fileRoutes");
const path = require("path");

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

const api = async () => {
  const server = hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST,
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
  server.route(
    mapRoutes(new FileRoute(path.join(__dirname),'/Files/Output'), FileRoute.methods())
  );

  return server;
};

module.exports = api();
