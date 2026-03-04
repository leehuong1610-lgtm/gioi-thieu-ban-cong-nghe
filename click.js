document.addEventListener("click", function(e){

    const bubbleCount = 3;

    for(let i = 0; i < bubbleCount; i++){

        const bubble = document.createElement("span");
        bubble.classList.add("bubble");

        // vị trí random quanh điểm click
        const offsetX = (Math.random() - 0.5) * 160;
        const offsetY = (Math.random() - 0.5) * 160;

        bubble.style.left = (e.clientX + offsetX) + "px";
        bubble.style.top = (e.clientY + offsetY) + "px";

        // size random
        const size = Math.random() * 30 + 30;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        document.body.appendChild(bubble);

        setTimeout(()=>{
            bubble.remove();
        },1200);

    }

});