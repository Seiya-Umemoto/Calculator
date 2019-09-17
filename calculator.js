total = 0; //연산의 총합
input = ""; // 비연산자
calc = "+"; //연산자
flag = 1; //누른 값이 숫자면 0, 연산자면 1
sign = ""; //값이 '-'이면 숫자를 음수로 만듬
count = 0; //처음에 '-'를 눌렀을 때 calc가 바뀌지 않도록

function numberBtnHandler(number)
{	
	if (flag == 1) { //직전에 연산자를 눌러서 
		setText("") // 연산자 누른 다음에 숫자 누르면 화면 리셋
	}
	if (sign == '-') { //숫자를 음수로 바꾸기
		number = eval("-" + number);
		sign = "";
	}
	flag = 0; //입력한 값은 숫자
	input += number; //처음에 누른 값을 input에 저장
	count += 1;
	setText(getText() + number);
	if (calc == '/') {
		if (number == 0) { // 0으로 나눴을 때
			setText("");
			alert("Numbers can't be devided by 0!");
		}
	}
} //getText()로 가져온 값을 입력한 값과 합쳐서 표시

function decimal(dec)
{
	if (getText().slice(0,2) == "0.") {
		input += "0" + dec;
		input = input.slice(0,-1);
		setText(input);
		flag = 0;
	}
	if (getText().indexOf(dec) != -1) { //".." 두 번 연속으로 입력하면 에러 표시
		input = getText().slice(0,-1);
		setText(input);
		alert("Error: You can't push more than 1 decimal points.");
	}
	if (getText() == "") { //창구에 아무것도 없는 상태에서 "."를 누르면 "0.이 되도록"
		input += "0" + dec;
		setText("0" + dec);
		flag = 0;
	}
	else if (getText().indexOf(dec) == -1) { //만약에 소수점이 없으면
		input += dec; //소수점을 추가한다
		setText(getText() + dec);
	}
	else if (getText() != "" && (calc == "+" || calc == "-" || calc == "=" || calc == "/")) {
		input = input.slice(1);
		input += "0" + dec;
		input = input.slice(1);
		setText("0" + dec)
		flag = 0;
	}
}

function setText(text) //창구에 표시하는 값
{
	document.getElementById("textBox").value = text;
} //창구의 값을 text로 갱신

function getText()
{
	return document.getElementById("textBox").value;
} //창구에 있는 값을 String 타입으로 가져오기

function reset()
{
	setText(""); //모든 글로번 변수를 초기화
	total = 0;
	input = "";
	calc = "+";
	flag = 1;
	count = 0;

}

function calculator(operator)
{
	if (flag == 1) {
		if (getText() == "") {
			if (operator == "+" || operator == "*" || operator == "=" || operator == "/") {
				alert("You have to push a number first except for '-' or '.'")
			}
		}
		if (getText() != "") {
		 	if ((!((calc == "-") && (operator == "-"))) &&
				(operator == "+" || operator == "-" || operator == "*" || operator == "=" || operator == "/")) {
				alert("You can't push two operators countinusously")
			}
		}
	}
	if ((getText() == "") && (operator == '-') ||
			(getText() != "") && (calc == '-') && (operator == '-')) {
		sign = '-'
	}
	if (flag == 0) { //직전에 입력한 값이 숫자라면
		flag = 1; //입력한 값은 연산자
		if ((calc == "-") && (Number(input) < 0)) {//연산자가 '-'이며 누른 숫자가 음수이면
			calc = "+";
			input = -input; //더하기가 실행되도록
			work = total + calc + input;
		}
		else {
			work = total + calc + input;
		} //처음은 0 + input
		total = eval(work);
		input = ""; //입력한 값 리셋
		setText(total);
	}
	if (operator == "=") { //'='을 눌렀을 때 총합이 표시되도록
		setText(total)
	} else if (count >= 1) { //처음에 '-'를 눌렀을 때 calc가 바뀌지 않도록
		calc = operator; //누른 연산자를 유지
	}
	count += 1;
}