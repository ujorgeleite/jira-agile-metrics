require('dotenv').config()
const path = require('path');
const srcDir = path.dirname(require.main.filename)+"/"
const hapi = require("hapi");
const FileRoute = require("./Api/Routes/fileRoutes");
const FileExport = require("./FileExport/fileExport")

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}
const fileExport = new FileExport(srcDir)
const api = async () => {
  const server = hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST,
    routes: {
      cors: ['*']
    }
  });

  

  await server.start();
  console.log("Server running on %s", server.info.uri);
  server.route(
    mapRoutes(new FileRoute(path.join(__dirname),fileExport), FileRoute.methods())
  );

  return server;
};

module.exports = api();
