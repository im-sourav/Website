const listMovBtn = document.getElementById("li-mov-btn");
const scrollList = document.getElementById("scroll-list");

let forward = true;
const maxScroll = scrollList.scrollWidth - scrollList.clientWidth;
scrollList.addEventListener("scroll", (e) => {
    if (maxScroll <= scrollList.scrollLeft || scrollList.scrollLeft <= 0) {
        listMovBtn.classList.toggle("forward", forward);
        forward = !forward;
    }
});

function smoothScroll(element, side, distence, time) {
    let run = true;
    const fps = 60;
    let f = (time / 1000) * fps;
    let count = f;
    let d = distence / f;
    let stap = element[side];

    function loop() {
        
        if (count <= 0) {
            run = false;
            if (distence < 0) element[side] = 0;
            else element[side] = distence;
        } 
        if (run) {
            count--;
            stap += d;
            element[side] = stap;
            setTimeout(loop, 1000 / fps);
        }
    }
    loop();
}

listMovBtn.addEventListener("click", () => {
    listMovBtn.classList.toggle("forward", forward);
    if (forward) {
        smoothScroll(scrollList, "scrollLeft", maxScroll, 500);
    } else {
        smoothScroll(scrollList, "scrollLeft", -maxScroll, 500);
    }

})