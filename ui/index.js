const listenPort = 8080;
let express = require("express");
let path = require('path');
const { resourceLimits } = require("worker_threads");
let app = express();
app.set("view engine","ejs");
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

// knex string to MySQL
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'professor-db.cluster-cbdo9oytyewz.us-east-2.rds.amazonaws.com',
      port : 3306,
      user : 'admin',
      password : 'admin123',
      database : 'IS'
    }
  });
var mysql = require('mysql');



app.listen(listenPort, function() {console.log("Listener active on port " +
listenPort); });

app.get("/", async function (req, res) {
    // const cInfo = [];
    const pInfo = await knex('Professor').orderBy('professorID');
    // for(i = 0; i < pInfo.length; i ++){
    //   let temp = await knex('Classes').where('professorID', pInfo[i].professorID).orderBy('professorID');
    //   cInfo.push(temp);
    // } 
    res.render("index", {pData: pInfo});
    // res.render("index");
});

app.get("/health", async function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain','Content-Length':3495});
});
