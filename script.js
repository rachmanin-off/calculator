let running = 0;
let buffer = "0";
let prevOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)&&value!='.'){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            running = 0;
            break;
        case '=':
            if (prevOperator === null){
                return
            }
            flushOperation(parseFloat(buffer));
            prevOperator = null;
            buffer = running;
            running = 0;
            break;
        case '←':
            if (buffer.length===1){
                buffer = '0';
            }
            else{
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if (buffer==='0'){
        return;
    }
    const floatBuffer = parseFloat(buffer);
    if (running===0){
        running=floatBuffer;
    }
    else{
        flushOperation(floatBuffer)
    }
    prevOperator=symbol;
    buffer='0';
}

function flushOperation(intBuffer){
    if (prevOperator==='+'){
        running+=intBuffer;
    }else if(prevOperator==='-'){
        running-=intBuffer;
    }else if(prevOperator==='×'){
        running*=intBuffer;
    }else if(prevOperator==='÷'){
        running /= intBuffer;
    }
    running=parseFloat(running.toPrecision(12));
    // my solution for floating point number error
    // cut off with toPrecision and then convert into float again
}

function handleNumber(numberString){
    if(buffer==='0'){
        if(numberString==="."){
            buffer+=numberString;
        }
        else{
            buffer=numberString;
        }
       
    }else{
        buffer+=numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();