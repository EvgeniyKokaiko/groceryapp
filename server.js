const jsonServer = require("json-server")
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults({
    static: "./build"
});
const PORT = process.env.PORT || 8888;
server.use(middlewares);
server.use(jsonServer.rewriter({
    "/comments\\?productId=:id": "/store/:id"
}))
server.use(router);
server.list(PORT, () => {
    console.log("Server is running");
});
