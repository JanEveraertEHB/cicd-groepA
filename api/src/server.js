const http = require('http');
const { createTables } = require("./helpers/dbHelper")
const express = require('express');
const { checkBodyFields } =require("./helpers/bodyHelpers");

const app = express();
http.Server(app); 
app.use(express.json())
const port = 3000;
const pg = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : "localhost",
    port : 5432,
    user : process.env.POSTGRES_USER ? process.env.POSTGRES_USER : "test",
    password : process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : "test",
    database : process.env.POSTGRES_DATABASE ? process.env.POSTGRES_DATABASE : "test"
  }
});


app.get('/', (req, res) => {
  res.send("hello world - v2")
})



app.get('/users', (req, res) => {
  pg.select("*").table("users").then((data) => {
    res.send(data)
  })
})

app.post('/users', (req, res) => {
  if(req.body) {
    if(checkBodyFields(req.body, ["first_name", "last_name", "password"])) {
      console.log("adding")
      pg.insert(req.body).table("users").returning("*").then((data) => {
        res.status(200).send(data)
      })
      .catch((e) => {
        res.status(501).send()
      })
    }
    else {
      res.status(400).send()
    }
  } else {
    res.status(400).send()
  }
})


createTables(pg);


module.exports = app;