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