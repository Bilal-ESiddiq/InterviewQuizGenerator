function addButtonTextIN(){
	if(!document.getElementById("addQuest"))
	{
		var p = document.createElement("p");
		var text = document.createTextNode("Add a new Question");
		p.appendChild(text);
		p.id = "addQuest";
		p.style.textAlign = "center";
		p.style.fontFamily = "Courier";
		p.style.fontSize = "24px";
		p.style.color ="rgb(86,86,86)";
		p.classList+=" w3-animate-zoom";
		document.getElementById("addQuestButton").appendChild(p);
	}
}


function addButtonTextOUT(){
document.getElementById("addQuest").parentElement.removeChild(document.getElementById("addQuest"));
}

function revButtonTextIN(){
	if(!document.getElementById("revQuest"))
	{
		var p = document.createElement("p");
		var text = document.createTextNode("Review Questions");
		p.appendChild(text);
		p.id = "revQuest";
		p.style.textAlign = "center";
		p.style.fontFamily = "Courier";
		p.style.fontSize = "24px";
		p.style.color =  "rgb(86,86,86)";
		p.classList+="w3-animate-zoom";
		document.getElementById("revQuestButton").appendChild(p);
	}
}


function revButtonTextOUT(){
document.getElementById("revQuest").parentElement.removeChild(document.getElementById("revQuest"));
}

function genButtonTextIN(){
	if(!document.getElementById("genExam"))
	{
		var p = document.createElement("p");
		var text = document.createTextNode("Generate an Exam");
		p.appendChild(text);
		p.id = "genExam";
		p.style.textAlign = "center";
		p.style.fontFamily = "Courier";
		p.style.fontSize = "24px";
		p.style.color = "rgb(86,86,86)";
		p.classList+="w3-animate-zoom";
		document.getElementById("genExamButton").appendChild(p);
	}
}

function genButtonTextOUT(){
document.getElementById("genExam").parentElement.removeChild(document.getElementById("genExam"));
}


function choiceGenerator(){
	var num = document.getElementById("noChoice").value;
	if(document.getElementById("answerChoices")!==null)
		document.getElementById("answerChoices").parentElement.removeChild(document.getElementById("answerChoices"));
	if(document.getElementById("modelAnswer")!==null)
		document.getElementById("modelAnswer").parentElement.removeChild(document.getElementById("modelAnswer"));	
	
	var choices = document.createElement("div");
	choices.id = "answerChoices";
	document.getElementById("answers").appendChild(choices);
	
	var answers = document.createElement("div");
	answers.id = "modelAnswer";
	document.getElementById("models").appendChild(answers);
	
	for(var i=0; i<num ; i++){
		var temp = document.createElement("input");
		temp.id = "option" + (i+1);
		temp.type = "text";
		temp.classList+=" w3-input w3-border w3-round ";
		temp.placeholder = "Choice " + (i+1);
		temp.value = "";
		choices.appendChild(temp);
		choices.appendChild(document.createElement("br"));
	}
	for(var i=0; i<num ; i++){
		var p = document.createElement("p");
		var inp = document.createElement("input");
		var lbl = document.createElement("label");
		var text = document.createTextNode("Choice "+(i+1));
		lbl.appendChild(text);
		inp.id = "radio"+(i+1);
		inp.type = "radio";
		inp.classList+=" w3-radio ";
		inp.placeholder = "Choice " + (i+1);
		inp.value = "";
		inp.name = "radio";
		inp.onclick=function(){check();};
		p.appendChild(inp);
		p.appendChild(lbl);
		answers.appendChild(p);
	}
}

/*function myQuestions()

{
	var id=$('#id').val();
	var rev=$('#revid').val();
	var name = $('#name').val();
	var adderemail='ranamostafamohsen@gmail.com';
	var revieweremail='emiliabronte40@gmail.com';
	
	 $.ajax({
		  method: "POST",
		  url: "./api/declineQuestion",
		  contentType: "application/json",
		  data: JSON.stringify({"id":id,"rev":rev,"name":name,"adderemail":adderemail,"revieweremail":revieweremail})
       })	 
       .done(function(data)
       {
    	   alert("Question is deleted successfully ");
    	   returnHomepage();
        });
		
}*/

function FilterInput(event) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;

    isNotWanted = (keyCode == 69 || keyCode == 101 || keyCode == 106 || keyCode == 107 || keyCode == 109 || keyCode == 110 || keyCode == 111);
    return !isNotWanted;
};
function handlePaste (e) {
    var clipboardData, pastedData;

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text').toUpperCase();

    if(pastedData.indexOf('E')>-1) {
        //alert('found an E');
        e.stopPropagation();
        e.preventDefault();
    }
};

function goBack() {
    window.history.back();
}

function generate() {
	var doc = new jsPDF();          
	var source = window.document.getElementsByTagName("body")[0];
	doc.fromHTML(
	    source,
	    15,
	    15,
	    {
	      'width': 180
	    });
	doc.output("dataurlnewwindow");
}

function generateRandomNumber(amount,limit) {
	var arr = []
	while(arr.length < amount){
	    var randomnumber = Math.floor(Math.random()*limit)
	    if(arr.indexOf(randomnumber) > -1) continue;
	    arr[arr.length] = randomnumber;
	}
	return arr;
}
