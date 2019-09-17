total = 0; //연산의 총합
input = ""; // 피연산자
calc = "+"; //연산자
flag = 1; //누른 값이 숫자면 0, 연산자면 1
sign = 0; //값이 1이면 음수로 만듦
count = 0; //처음에 '-'를 눌렀을 때 calc가 바뀌지 않도록
equal = 0; //직전에 "=" 연산자를 눌렀는가? "=" 눌렀으면 1, 아니면 0
next_count = 0; //연속으로 계산한 것인지 판단하기 위해
zero = ""; //-0을 만들기 위해

function numberBtnHandler(number)
{	
	equal = 0;
	if (flag == 1) { //직전에 연산자를 눌러서 
		setText(""); // 연산자 누른 다음에 숫자 누르면 화면 리셋
	}
	if (sign == 1) { //숫자를 음수로 바꾸기
		if (input == "0.") { //나중에 -0로 바꿀 수 있도록, 0도 -0도 2진수로 변환하면 똑같이 0이 되버리기 때문에
			zero = "0."
			sign = 2;
		} //"0.-숫자"가 되지 않도록
		else{
			number = -number;
			sign = 0;
		}
	}
	flag = 0; //입력한 값은 숫자
	if ((sign == 2) && (zero = "0.")) { // -0.숫자를 만들기
		input = Number("-" + zero + String(number));
		sign = 3;
	}
	else {
		input += number;
	} //처음에 누른 값을 input에 저장
	count += 1;
	if (sign == 3) { // -0.숫자를 화면에 표시
		setText(input);
		sign = 0;
	}
	else {
		setText(getText() + number);
	}
} //getText()로 가져온 값을 입력한 값과 합쳐서 표시

function decimal(dec)
{
	if (input.indexOf(dec) != -1) { //"." 두 번 입력하면 에러 표시
		setText(input);
		alert("Error: You can't push more than 1 decimal points.");
	}
	if (input == "") { //창구에 아무것도 없는 상태에서 "."를 누르면 "0.이 되도록"
		input += "0" + dec; //input이 "0."이 된다.
		setText(input);
		flag = 0; //숫자를 입력한 것으로 간주
	}
	if (getText().indexOf(dec) == -1) { //만약에 소수점이 없으면
		input += dec; //소수점을 추가한다
		if (input == dec) { // 처음에 '.'을 입력했을 때
			input = "0." //'0.'으로 바꾸기
			setText(input)
			flag = 0;
		}
		else {
			setText(input);
		}
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
	sign = 0;
	count = 0;
	equal = 0;
	next_count = 0;
	zero = "";
}

function calculator(operator)
{
	if (flag == 1) {
		if (equal == 1) { //직전에 "=" 눌렀으면 다음에 연산사 누르는 것을 허용
			if (operator == "=") { //두번 연속으로 "=" 누르면
				alert("You can't push two operators continuously") 
			}
		}
		else if (getText() == "") { //처음에 연산자 누르는 것을 방지
			if (operator == "+" || operator == "*" || operator == "=" || operator == "/") {
				alert("You have to push a number first except for '-' or '.'")
			}
		}
		else if ((getText() != "")) { //두변 연속으로 연산자 누르는 것을 방지
			if ((operator == "+" || operator == "-" || operator == "*" || operator == "=" || operator == "/")) {
				if ((calc == "-") && (operator == "-")) {}
				else {
					alert("You can't push two operators countinuously")
				}
			}			
		}
	}
	if (count == next_count) { //연산자가 연속으로 입력되었을 때
		if ((getText() == "") && (operator == '-') ||
				(getText() != "") && (calc == '-') && (operator == '-')) { //마이너스 마이너스 연산을 위해
			sign = 1;
		}
	}
	next_count = count + 1;
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
		if (total == "Infinity") { //0으로 나눴을 때
			setText("Error");
			alert("Error: Numbers can't be devided by 0!");
		}
		else {
			setText(total);
		}
	}
	if (operator == "=") { //'='을 눌렀을 때 총합이 표시되도록
		equal = 1; //"=" 연산자가 입력되었다.
	} else if (count >= 1) { //처음에 '-'를 눌렀을 때 calc가 바뀌지 않도록
		calc = operator; //누른 연산자를 유지
	}
	count += 1;
}