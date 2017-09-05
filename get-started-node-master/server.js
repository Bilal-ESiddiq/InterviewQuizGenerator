var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;

/* Endpoint to greet and add a new visitor to database.
* Send a POST request to localhost:3000/api/visitors with body
* {
* 	"name": "Bob"
* }
*/
app.post("/api/visitors", function (request, response) {
	  // Changing here
  var questName = request.body.name;
  var op1=request.body.op1;
  var op2=request.body.op2;
  var op3=request.body.op3;
  var op4=request.body.op4;
  var modelanswer=request.body.modelanswer;
  var category=request.body.category;
  var subcategory=request.body.subcategory;
  var qlevel=request.body.qlevel;
  var estime=request.body.estime;
  var adderid=request.body.adderid;
  var reviewerid=request.body.reviewerid;
  var status=request.body.status;
  var comment=request.body.comment;
  var rep=request.body.rep;
  if(!mydb) {
    console.log("No database.");
    return;
  }
  // insert the Question as a document
  mydb.insert({ "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep}, function(err, body, header) {
    if (err) {
      return console.log('[mydb.insert] ', err.message);
    }
   response.send("Successful to make sure we returned back to homepage");
  });
});




app.post("/api/updateQuestion", function (request, response) {
	
	  var id=request.body.id;
	  var rev=request.body.rev;
	  var questName = request.body.name;
	  var op1=request.body.op1;
	  var op2=request.body.op2;
	  var op3=request.body.op3;
	  var op4=request.body.op4;
	  var modelanswer=request.body.modelanswer;
	  var category=request.body.category;
	  var subcategory=request.body.subcategory;
	  var qlevel=request.body.qlevel;
	  var estime=request.body.estime;
	  var adderid=request.body.adderid;
	  var reviewerid=request.body.reviewerid;
	  var status=request.body.status;
	  var comment=request.body.comment;
	  var rep=request.body.rep;
	  
	  
	  //mydb.destroy(id,rev, function(err, body, header)
	 
	  mydb.insert({"_id":id,"_rev":rev, "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep} , function(err, body, header)
	   {
		  
		  if (err) {
		      return console.log('[mydb.update] ', err.message);
		    }
		  
		 response.send("Message to ensure that the code is  transferred successfully" );
	   });
	   
	 
});



app.post("/api/acceptQuestion", function (request, response) {
	
	  var id=request.body.id;
	  var rev=request.body.rev;
	  var questName = request.body.name;
	  var op1=request.body.op1;
	  var op2=request.body.op2;
	  var op3=request.body.op3;
	  var op4=request.body.op4;
	  var modelanswer=request.body.modelanswer;
	  var category=request.body.category;
	  var subcategory=request.body.subcategory;
	  var qlevel=request.body.qlevel;
	  var estime=request.body.estime;
	  var adderid=request.body.adderid;
	  var reviewerid=request.body.reviewerid;
	  var status=request.body.status;
	  var comment=request.body.comment;
	  var rep=request.body.rep;
	  
	  
	  //mydb.destroy(id,rev, function(err, body, header)
	 
	  mydb.insert({ "_id":id,"_rev":rev, "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep} , function(err, body, header)
	   {
		  
		  if (err) {
		      return console.log('[mydb.accept] ', err.message);
		    }
		  
		 response.send("Message to ensure that the code is  transferred successfully" );
	   });
	   
	 
});


app.post("/api/declineQuestion", function (request, response) {
	
	  var id=request.body.id;
	  var rev=request.body.rev;
	  
	  
	  
	  mydb.destroy(id,rev, function(err, body, header)
	 
	   {
		  
		  if (err) {
		      return console.log('[mydb.decline] ', err.message);
		    }
		  
		 response.send("Message to ensure that the code is  transferred successfully" );
	   });
	   
	 
});








app.get("/api/findquestions", function (request, response) {
  var names = "";
  if(!mydb) {
    response.json(names);
    return;
  }

  mydb.find({selector:{ status:"pending" }},function(err, body) {
	  
	  
    if (err) {
	        return console.log('[mydb.find] ', err.message);
              }
   
   
    if(!err)
    	response.send(body.docs);
   

  });
  
});


// load local VCAP configuration  and service credentials
var vcapLocal;
try {
  vcapLocal = require('./vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { }

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

if (appEnv.services['cloudantNoSQLDB']) {
  // Load the Cloudant library.
  var Cloudant = require('cloudant');

  // Initialize database with credentials
  var cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);

  //database name
  var dbName = 'mydb';

  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  mydb = cloudant.db.use(dbName);
}

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));
app.get('/', function(req,res) {
	data= fs.readFile('/index.html',   function (err, data) {
	res.setHeader('Content-Type', 'text/html');
	res.send(data);
	});

});

//Go to add question page
app.get('/addquestion', function(req,res) {
	data= fs.readFile('/addquestion.html',   function (err, data) {
	res.setHeader('Content-Type', 'text/html');
	res.send(data);
	});
});

//Go to Review Question Page
app.get('/reviewquestion', function(req,res) {
	data= fs.readFile('/reviewquestion.html',   function (err, data) {
	res.setHeader('Content-Type', 'text/html');
	res.send(data);
	});
});

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});