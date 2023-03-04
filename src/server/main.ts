import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (_: any, res: { send: (arg0: string) => void }) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
