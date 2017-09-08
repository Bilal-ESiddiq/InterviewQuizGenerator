var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser');

const session = require("express-session");
const passport = require("passport");
const WebAppStrategy = require("bluemix-appid").WebAppStrategy;
const userAttributeManager = require("bluemix-appid").UserAttributeManager;
const helmet = require("helmet");
const express_enforces_ssl = require("express-enforces-ssl");

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
  var date=request.body.date;
  
  if(!mydb) {
    console.log("No database.");
    return;
  }
  // insert the Question as a document
  mydb.insert({ "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep,"type":type,"date":date}, function(err, body, header) {
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
	  var date=request.body.date;
	 

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
	 
	
	 
	  mydb.insert({"_id":id,"_rev":rev, "name" : questName,"op1": op1,"op2":op2,"op3":op3,"op4":op4,"modelanswer":modelanswer,"category":category,"subcategory":subcategory,"qlevel":qlevel,"estime":estime,"adderid":adderid,"reviewerid":reviewerid,"status":status,"comment":comment,"rep":rep,"type":type,"date":date} , function(err, body, header)
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
	  
	  console.log("question is"+questName);
	 

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

  mydb.find({selector:{ /*reviewerid:request.query.userEmail ,*/ status:"pending" }},function(err, body) {
	  
	  
    if (err) {
	        return console.log('[mydb.find] ', err.message);
              }
   
   
    if(!err)
    	response.send(body.docs);
   

  });
  
});


app.get("/api/myquestions", function (request, response) {

	  if(!mydb) {
	    
	    return;
	  }

	  mydb.find({selector:{ reviewerid:request.query.userEmail }},function(err, body) {
		  
		  
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


//Go to add question page
/*app.get('/addquestion', function(req,res) {
	data= fs.readFile('/addquestion.html',   function (err, data) {
	res.setHeader('Content-Type', 'text/html');
	res.send(data);
	});
});*/

//Go to Review Question Page
/*app.get('/reviewquestion', function(req,res) {
	data= fs.readFile('/reviewquestion.html',   function (err, data) {
	res.setHeader('Content-Type', 'text/html');
	res.send(data);
	});
});*/


const GUEST_USER_HINT = "A guest user started using the app. App ID created a new anonymous profile, where the user’s selections can be stored.";
const RETURNING_USER_HINT = "An identified user returned to the app with the same identity. The app accesses his identified profile and the previous selections that he made.";
const NEW_USER_HINT = "An identified user logged in for the first time. Now when he logs in with the same credentials from any device or web client, the app will show his same profile and selections.";

const LOGIN_URL = "/ibm/bluemix/appid/login";
const CALLBACK_URL = "/ibm/bluemix/appid/callback";

if (cfenv.getAppEnv().isLocal) {
   console.error('This sample should not work locally, please push the sample to Bluemix.');
   process.exit(1);
}

// Security configuration
app.use(helmet());
app.use(helmet.noCache());
app.enable("trust proxy");
app.use(express_enforces_ssl());

// Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(session({
  secret: "123456",
  resave: true,
  saveUninitialized: true,
	proxy: true,
	cookie: {
		httpOnly: true,
		secure: true
	}
}));

app.set('view engine', 'ejs');

// Use static resources from /samples directory
app.use(express.static("views"));

// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

passport.use(new WebAppStrategy());

// Initialize the user attribute Manager
userAttributeManager.init();



// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false redirect to login widget will not occur of already authenticated users.
app.get(LOGIN_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
  forceLogin: true
}));

// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from AppID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
app.get(CALLBACK_URL, passport.authenticate(WebAppStrategy.STRATEGY_NAME, {allowAnonymousLogin: true}));


// Protected area. If current user is not authenticated - redirect to the login widget will be returned.
// In case user is authenticated - a page with current user information will be returned.
app.get("/home", passport.authenticate(WebAppStrategy.STRATEGY_NAME), function(req, res){
    
	var accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;

    // get the attributes for the current user:
    userAttributeManager.getAllAttributes(accessToken).then(function (attributes) {
        var firstLogin = !attributes.known;
        RenderHomePage(req, res, firstLogin);
	});
});

function RenderHomePage(req, res, firstLogin) {
    //return the protected page with user info
    var email = req.user.email;
    if(req.user.email !== undefined && req.user.email.indexOf('@') != -1)
           email = req.user.email.substr(0,req.user.email.indexOf('@'));
    var renderOptions = {
        name: req.user.name || email
    };

    if (firstLogin) {
        userAttributeManager.setAttribute(req.session[WebAppStrategy.AUTH_CONTEXT].accessToken, "known", "t").then(function (attributes) {
            res.render('home', renderOptions);
         });
    } else {
        res.render('home', renderOptions);
    }
}

app.get("/addquestion", passport.authenticate(WebAppStrategy.STRATEGY_NAME), function(req, res){
    
	var accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;

    // get the attributes for the current user:
    userAttributeManager.getAllAttributes(accessToken).then(function (attributes) {
    	var firstLogin = !attributes.known;
        RenderAddPage(req, res, firstLogin);
	});
});

function RenderAddPage(req, res, firstLogin) {
    var email = req.user.email;
    if(req.user.email !== undefined && req.user.email.indexOf('@') != -1)
           email = req.user.email.substr(0,req.user.email.indexOf('@'));
    var renderOptions = {
        name: req.user.name || email,
        email: req.user.email
    };
    if (firstLogin) {
        userAttributeManager.setAttribute(req.session[WebAppStrategy.AUTH_CONTEXT].accessToken, "known", "t").then(function (attributes) {
            res.render('addquestion', renderOptions);
         });
    } else {
        res.render('addquestion', renderOptions);
    }
}

app.get("/reviewquestion", passport.authenticate(WebAppStrategy.STRATEGY_NAME), function(req, res){
    
	var accessToken = req.session[WebAppStrategy.AUTH_CONTEXT].accessToken;

    // get the attributes for the current user:
    userAttributeManager.getAllAttributes(accessToken).then(function (attributes) {
    	var firstLogin = !attributes.known;
        RenderRevPage(req, res, firstLogin);
	});
});

function RenderRevPage(req, res, firstLogin) {
    var email = req.user.email;
    if(req.user.email !== undefined && req.user.email.indexOf('@') != -1)
           email = req.user.email.substr(0,req.user.email.indexOf('@'));
    var renderOptions = {
        name: req.user.name || email,
        email: req.user.email
    };
    if (firstLogin) {
        userAttributeManager.setAttribute(req.session[WebAppStrategy.AUTH_CONTEXT].accessToken, "known", "t").then(function (attributes) {
            res.render('reviewquestion', renderOptions);
         });
    } else {
        res.render('reviewquestion', renderOptions);
    }
}



// Protected area. If current user is not authenticated - redirect to the login widget will be returned.
// In case user is authenticated - a page with current user information will be returned.
app.get("/", passport.authenticate(WebAppStrategy.STRATEGY_NAME, {successRedirect : '/home', forceLogin: true}));












//Receiving Notifications for email
var nodemailer = require('nodemailer');

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});