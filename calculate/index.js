var resultInput = document.querySelector("#result");

var str = '';
resultInput.value = str;
var result = 0;

function display(value) {
    str += value;
    resultInput.value = str;
}

function calc() {
    result = eval(str);
    resultInput.value = result;
}

function reset() {
    str = '';
    resultInput.value = str;
}

function del() {
    str = str.slice(0, -1);
    resultInput.value = str;
}
