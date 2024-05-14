const gbox = document.getElementById("gridbox");

const btn = document.querySelector("button");
const input = document.querySelector("input");

function randomColor(){
    let h = Math.random()*100;
    let s = Math.random()*100;
    let l = Math.random()*90;

    return "hsl("+h+","+80+"%,"+l+"%)"
}

function createGrid(num){
    for(let i = 0;i<num;i++){
        const gridrow = document.createElement("div");
        gridrow.setAttribute("class","gridrow");
        for(let j = 0;j<num;j++){
            const box = document.createElement("div");
            box.addEventListener("mouseenter",()=>{
                box.style.backgroundColor = randomColor();
            })
            gridrow.appendChild(box);
        }
        gbox.appendChild(gridrow);

    }

}


btn.addEventListener("click",()=>{

    gbox.replaceChildren();
    let value = parseInt(input.value);
    input.value = "";
    if(value > 100)value = 100;
    createGrid(value);

})

createGrid(16);
