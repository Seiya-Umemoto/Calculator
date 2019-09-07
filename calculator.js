function numberBtnHandler(number)
{
	setText(getText() + number);
}

function setText(text)
{
	document.getElementById("textBox").value = text;	
}

function getText()
{
	return document.getElementById("textBox").value;
}

function reset()
{
	setText("");
}