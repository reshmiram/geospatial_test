const express = require("express");
const helper = require("./helperDB.ts");
const app = express();
const db = new helper();
var cors = require("cors");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (_req, _res) => {
  db.getData().then((res) => {
    _res.send(JSON.stringify(res));
  });
});

app.post("/add", (req, res) => {
  db.addNewEntry(req.body);
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening...."));
