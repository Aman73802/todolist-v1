const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
const app = express();


  


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"});

  const item2 = new Item({
    name: "Hit the + button to add a new item."});

    const item3 = new Item({
      name: "<-- Hit this to delete an item."});

      const defaultItems = [item1, item2, item3];

      Item.insertMany(defaultItems)
       .then(() => console.log("Default items inserted."));
     

       app.get("/", (req, res) => {
        Item.find({})
          .then(foundItems => {
            res.render("list", {
              listTitle: "Today",
              newListItems: foundItems,
            });
          })
          .catch(err => {
            console.error("Error fetching items:", err);
            res.status(500).send("Internal Server Error");
          });
      });
   /*  let day = date.getDate();  */



app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.listen(3005, () => console.log("Example app is listening on port 3005."));
