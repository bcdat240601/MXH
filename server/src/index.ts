export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    console.log("test boostrap");
    const io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],

        // credentials: true,
      },
    });

    io.on("connection", (socket) => {
      socket.join("1");
      socket.on("comment", async (message) => {
        console.log(message);
        const data = await strapi
          .service("api::comment.comment")
          .create(message);

        console.log("Done");

        socket.to("1").emit("get-comments", () => {
          console.log("try to get comments");
        });
      });
      socket.on("disconnect", () => {
        console.log("🔥: A user disconnected");
      });
    });
  },
};
