var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var mydb;


app.post("/api/addCategory", function (request, response) {

	var name = request.body.name;
	var type=request.body.type;
	
	//Add Category
	  if(!mydb) {
		    console.log("No database.");
		    return;
		  }
		  
		  mydb.insert({"name":name,"type":type}, function(err, body, header) {
		    if (err) {
		      return console.log('[mydb.addcategory] ', err.message);
		    }
		   response.send("Add Category was successful");
		  });
	
	
});



app.post("/api/addsubCategory", function (request, response) {

	var name = request.body.name;
	var type=request.body.type;
	var categoryname=request.body.categoryname;
	
	//Add Category
	  if(!mydb) {
		    console.log("No database.");
		    return;
		  }
		  
		  mydb.insert({"name":name,"type":type,"categoryname":categoryname}, function(err, body, header) {
		    if (err) {
		      return console.log('[mydb.addsubcategory] ', err.message);
		    }
		   response.send("Add subCategory was successful");
		  });
	
	
});


app.get("/api/findcategory", function (request, response) {

	  if(!mydb) {
	    
	    return;
	  }

	  mydb.find({selector:{ type:"category" }},function(err, body) {
		  
		  
	    if (err) {
		        return console.log('[mydb.find] ', err.message);
	              }
	   
	   
	    if(!err)
	    	response.send(body.docs);
	   
	  });
	  
	});



app.get("/api/findsubcategory", function (request, response) {
	
	var categoryname=request.query.categoryname;
	console.log("my category name"+ categoryname);

	  if(!mydb) {
	    
	    return;
	  }

	  mydb.find({selector:{ type:"subcategory", categoryname:categoryname }},function(err, body) {
		  
		  
	    if (err) {
		        return console.log('[mydb.find] ', err.message);
	              }
	   
	   
	    if(!err)
	    	response.send(body.docs);
	   
	  });
	  
	});


app.post("/api/insertQuestion", function (request, response) {
	 
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
  var type=request.body.type;
  
  
  if(!mydb) {
    console.log("No database.");
    return;
  }
  // insert the Question as a document
  mydb.insert({ "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep,"type":type}, function(err, body, header) {
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
	  var type=request.body.type;
	  var adderemail=request.body.adderemail;
	  var revieweremail=request.body.revieweremail;
	  
	 
	  var transporter = nodemailer.createTransport({
		  
		   service:'Gmail',
		   auth: {
		     user: 'interviewquestiongeneratorapp@gmail.com',
		     pass: 'interviewquestiongenerator'
		   }
		 }); 


		
		 var mailOptions = {
		   from: 'interviewquestiongeneratorapp@gmail.com' ,
		   to: adderemail,
		   subject: 'IQG Question Status',
		   text: 'Hello there, your question with detailed description : '+questName+' has been updated by reviewer... Thank you'
		 };




		 transporter.sendMail(mailOptions, function(error, info){
		   if (error) {
		     console.log(error);
		   } else {
		     console.log('Email sent: ' + info.response);
		   }
		   
		 }); 
	 
	
	 
	  mydb.insert({"_id":id,"_rev":rev, "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep,"type":type} , function(err, body, header)
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
	  var adderemail=request.body.adderemail;
	  var revieweremail=request.body.revieweremail;
	  
	 
	  var transporter = nodemailer.createTransport({
		  
		   service:'Gmail',
		   auth: {
		     user: 'interviewquestiongeneratorapp@gmail.com',
		     pass: 'interviewquestiongenerator'
		   }
		 }); 


		
		 var mailOptions = {
		   from: 'interviewquestiongeneratorapp@gmail.com' ,
		   to: adderemail,
		   subject: 'IQG Question Status',
		   text: 'Hello there, your question with detailed description : '+questName+' has been accepted by reviewer... Thank you'
		 };




		 transporter.sendMail(mailOptions, function(error, info){
		   if (error) {
		     console.log(error);
		   } else {
		     console.log('Email sent: ' + info.response);
		   }
		   
		 }); 

	  
	  
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
	  var questName = request.body.name;
	  var adderemail=request.body.adderemail;
	  var revieweremail=request.body.revieweremail;
	  
	 
	  var transporter = nodemailer.createTransport({
		  
		   service:'Gmail',
		   auth: {
		     user: 'interviewquestiongeneratorapp@gmail.com',
		     pass: 'interviewquestiongenerator'
		   }
		 }); 


		 var mailOptions = {
		   from: 'interviewquestiongeneratorapp@gmail.com' ,
		   to: adderemail,
		   subject: 'IQG Question Status',
		   text: 'Hello there, your question with detailed description : '+questName+' has been deleted by reviewer... Thank you'
		 };




		 transporter.sendMail(mailOptions, function(error, info){
		   if (error) {
		     console.log(error);
		   } else {
		     console.log('Email sent: ' + info.response);
		   }
		   
		 }); 
	  
	  
	  mydb.destroy(id,rev, function(err, body, header)
	 
	   {
		  
		  if (err) {
		      return console.log('[mydb.decline] ', err.message);
		    }
		  
		 response.send("Message to ensure that the code is  transferred successfully" );
	   });
	   
	 
});








app.get("/api/findquestions", function (request, response) {

  if(!mydb) {
    
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




app.get('/', function(req,res) 
{
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


//Receiving Notifications for email
var nodemailer = require('nodemailer');
/*
var transporter = nodemailer.createTransport({
 
  host: 'smtp.gmail.com',
  port: '587',
  service:'	Gmail',
  auth: {
    user: 'emiliabronte40@gmail.com',
    pass: 'emilybronte'
  }/*,
secureConnection: 'false',
tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false
}
}); 


var mailOptions = {
  from: 'emiliabronte40@gmail.com' ,
  to: 'bilalemadeldin@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Hello there'
};




transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  
}); 

*/

/*
let transporter = nodemailer.createTransport(
	    {
	        service: 'Gmail',
	        auth: {
	            type: 'OAuth2',
	            user: 'mail',
	            clientId: 'clientid',
	            clientSecret: 'clientsecret',
	            refreshToken: 'refreshtoken',
	            accessToken: 'accesstoken',
	            expires: 12345
	        }
	    },
	    {
	        
	        from: 'Bilal <bilalemadeldin@gmail.com>',
	        headers: {
	            'X-Laziness-level': 1000 // just an example header, no need to use this
	        }
	    }
	);

	console.log('SMTP Configured');

	// Message object
	let message = {
	    // Comma separated list of recipients
	    to: 'Rana Mostafa <ranamostafamohsen@gmail.com>',

	    // Subject of the message
	    subject: 'Nodemailer is unicode friendly ✔ #', //

	    // plaintext body
	    text: 'Hello to myself!',

	    // HTML body
	    html:
	        '<p><b>Hello</b> to myself </p>' 
	        
	  

	   
	};

	console.log('Sending Mail');
	transporter.sendMail(message, (error, info) => {
	    if (error) {
	        console.log('Error occurred');
	        console.log(error.message);
	        return;
	    }
	    console.log('Message sent successfully!');
	    console.log('Server responded with "%s"', info.response);
	    transporter.close();
	});

*/
var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});