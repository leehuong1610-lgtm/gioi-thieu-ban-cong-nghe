document.addEventListener("click", function(e){

    for(let i = 0; i < 20; i++){

        const bubble = document.createElement("span");
        bubble.className = "bubble";

        bubble.style.left = e.clientX + "px";
        bubble.style.top = e.clientY + "px";

        const size = Math.random()*12 + 6;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        const x = (Math.random()-0.5)*120;
        const y = Math.random()*120;

        bubble.style.transform = `translate(${x}px,-${y}px)`;

        document.body.appendChild(bubble);

        setTimeout(()=>{
            bubble.remove();
        },1200);
    }

});