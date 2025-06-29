import 'dotenv/config'
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextID = 1;

// creating tea
app.post("/teas", (req, res) => {
  const { name, price, quantity } = req.body;
  const newTea = { id: nextID++, name, quantity, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// routing
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// finding
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("No such tea exists in the list");
  }
  res.status(200).send(tea);
});

// updating
app.post("/teas/:id", (req, res) => {
  const newTea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!newTea) {
    return res.status(404).send("No such tea exists in the list");
  }
  const { name, quantity, price } = req.body;
  newTea.name = name;
  newTea.quantity = quantity;
  newTea.price = price;
  res.status(200).send(newTea);
});

// deleting
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not fund");
  }
  teaData.splice(index, 1);
  res.status(404).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
