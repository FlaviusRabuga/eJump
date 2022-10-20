
console.log("test")

const circles = document.querySelectorAll(".circle")
const squares = document.querySelectorAll(".square")

circles.forEach(circle => {
    console.log(circle);
    circle.addEventListener('dragstart', (event) => {
        console.log("dragstart");
        circle.classList.add("dragging")
    })
    circle.addEventListener('dragend', (event) => {
        console.log("dragend");
        circle.classList.remove("dragging")
    })
})

squares.forEach(square => {
    square.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    square.addEventListener('drop', (event) => {
        console.log("drop")
        const dragging = document.querySelector(".dragging")
        if(square.style.backgroundColor == dragging.style.backgroundColor)
            square.appendChild(dragging)
    })
})

