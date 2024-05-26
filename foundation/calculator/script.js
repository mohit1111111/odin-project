let currentNo = "";
let firstNo = 0.0;
let operation = "";
let secondNo = 0.0;
let decimalFlag = false;


const screen = document.getElementById("screen");

function updateScreen(){
    screen.textContent = currentNo;
}

//perform operations and add and remove it

function addOperation(op){
    if(operation == ""){
        firstNo = parseFloat(currentNo);
        operation = op;
        currentNo = 0; 
        screen.textContent = "";
        decimalFlag=false;
    }
    else {
        secondNo = parseFloat(currentNo);
        currentNo = operate();
        updateScreen();
        
        firstNo = parseFloat(currentNo);
        currentNo = 0;
        operation = "";
        operation = op;
        decimalFlag=false;


    }
}


function  operate(){
    let result = 0;
    if(operation=="+")result = Math.round((firstNo+secondNo)*100)/100;

    if(operation=="*")result = Math.round((firstNo*secondNo)*100)/100;

    if(operation=="-")result = Math.round((firstNo-secondNo)*100)/100;

    if(operation=="/"){
        if(secondNo==0){
            return "lamao";
        }
        result = Math.round((firstNo/secondNo)*100)/100;;
    }
    return result;
}

function performPersentage(){
    secondNo = parseFloat(currentNo);

    if(firstNo>0&&secondNo>0){
        if(secondNo%1==0 && secondNo<10){
            secondNo = firstNo*parseFloat("0.0"+(secondNo));
        }
        else if(secondNo%1==0){
            secondNo = firstNo*parseFloat("0."+(secondNo/10));
        }
        else{
            secondNo = firstNo*(secondNo/10);
        }
        currentNo = operate();
        updateScreen();        
        firstNo = parseFloat(currentNo);
        currentNo = 0;
        operation = "";
    }
}



//take input related to operation


const persentage = document.getElementById("per");

persentage.addEventListener('click',()=>{
    performPersentage();


    
});



const operator = document.querySelectorAll("#operator");

operator.forEach((opn)=>{
    opn.addEventListener("click",()=>{
        addOperation(opn.textContent)}
)
});

function eqOperation(){
    if(operation != ""){
        secondNo = parseFloat(currentNo);
        currentNo = operate();
        updateScreen();
        firstNo = parseFloat(currentNo);
        operation = "";
    }
}



const equal = document.getElementById("equal");

equal.addEventListener("click",()=>{
    eqOperation();
    
}
);


//all clear operation

const allClear = document.getElementById("AC");

allClear.addEventListener("click",()=>{
    firstNo=0;
    secondNo=0;
    decimalFlag=false;
    operation="";
    currentNo = 0;
    screen.textContent = "";
});

//add no and dots



const numbtn = document.querySelectorAll("#number");


numbtn.forEach((btn)=>
    btn.addEventListener("click",()=>{
        if(currentNo=="lamao"){
            currentNo = "";
            updateScreen();
        }
        currentNo = currentNo + btn.textContent;
        updateScreen();
    }
));



const dot = document.getElementById("dot");

dot.addEventListener("click",()=>{
    if(decimalFlag==false){
        currentNo += ".";   
        screen.textContent = currentNo ;
        decimalFlag = true;
    }
});



const sign = document.getElementById("sign");

sign.addEventListener('click',()=>{
    if(currentNo.at(0)=="-"){
        currentNo = currentNo.substring(1);
    }
    else{
        currentNo = "-"+currentNo;
    }
    updateScreen();
})

//take keyboard input

document.addEventListener("keydown",function(e){
    if(e.key>=0 && e.key <=9){
        currentNo=currentNo+e.key;
        updateScreen();
    }
    else if(e.key=="+")addOperation(e.key);
    else if(e.key=="-")addOperation(e.key);
    else if(e.key=="*")addOperation(e.key);
    else if(e.key=="/")addOperation(e.key);
    else if(e.key=="%")performPersentage();
    else if(e.key=="Enter"||e.key=="=")eqOperation();
    else if(e.key=="Backspace"){
        firstNo=0;
        secondNo=0;
        decimalFlag=false;
        operation="";
        currentNo = 0;
        screen.textContent = "";
    }
});

