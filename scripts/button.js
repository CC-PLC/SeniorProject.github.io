/****************************************
 * Declaration
****************************************/
function init()
{
	setYourName(getYourName(false));
}

function getYourName(reset)
{
	let storedName = localStorage.getItem("name");
	// if `reset` is true or there's no storedName
	if(reset || !storedName || storedName === "null")
	{
		let inputName = prompt("Please enter your name.", storedName);
		// store `inputName` in `name` in localStorage
		// localStorage would be at: [..]\AppData\Local\Google\Chrome\User Data\Default\Local Storage
		localStorage.setItem("name", inputName);
	}
	return localStorage.getItem("name");
}

function setYourName(name)
{
	let span_yourName = document.querySelector("#yourName");
	if(name && name !== "null")
		span_yourName.textContent = name;
	else
		span_yourName.textContent = "Unknown";
}

function createParagraph(count) 
{
	let para = document.createElement("p");
	para.textContent = count;
	document.body.appendChild(para);
}


/****************************************
 * Run
****************************************/
init();

let span_yourName = document.querySelectorAll("#yourName");
span_yourName[0].onclick = function()
	{
		setYourName(getYourName(true));
	};

let count = 0;
let bt_addNum = document.querySelectorAll("#addNum");
for(let i = 0; i < bt_addNum.length ; i++) 
{
	bt_addNum[i].addEventListener
	(
		"click",
		function()
		{
			count += i + 1;
			createParagraph(count);
		}
	);
}