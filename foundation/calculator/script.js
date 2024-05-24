let currentNo = "";
let firstNo = 0.0;
let operation = "";
let secondNo = 0.0;
let decimalFlag = false;

const screen = document.getElementById("screen");

function updateScreen(){
    screen.textContent = currentNo;
}


function  operate(){
    let result = 0;
    if(operation=="+")result = Math.round((firstNo+secondNo)*10)/10;

    if(operation=="*")result = Math.round((firstNo*secondNo)*10)/10;

    if(operation=="-")result = Math.round((firstNo-secondNo)*10)/10;

    if(operation=="/"){
        if(secondNo==0){
            return "lamao";
        }
        result = Math.round((firstNo/secondNo)*10)/10;;
    }
    return result;
}

const persentage = document.getElementById("per");

persentage.addEventListener('click',()=>{
    secondNo = parseFloat(currentNo);

    if(firstNo>0&&secondNo>0){
        if(secondNo%1==0){
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
});

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




const operator = document.querySelectorAll("#operator");

operator.forEach((opn)=>{
    opn.addEventListener("click",()=>{
        if(operation == ""){
            firstNo = parseFloat(currentNo);
            operation = opn.textContent;
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
            operation = opn.textContent;
            decimalFlag=false;


        }
        
    })
});

const equal = document.getElementById("equal");

equal.addEventListener("click",()=>{
    if(operation != ""){
            secondNo = parseFloat(currentNo);
            currentNo = operate();
            updateScreen();
            firstNo = parseFloat(currentNo);
            operation = "";
    }

    
}
);

const allClear = document.getElementById("AC");

allClear.addEventListener("click",()=>{
    firstNo=0;
    secondNo=0;
    decimalFlag=false;
    operation="";
    currentNo = 0;
    screen.textContent = "";
});
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


