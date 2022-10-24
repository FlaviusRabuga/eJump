const circles = document.querySelectorAll(".circle")
const squares = document.querySelectorAll(".square")

//add dragging property to circles
circles.forEach(circle => {
    circle.addEventListener('dragstart', (event) => {
        console.log("dragstart");
        circle.classList.add("dragging")
    })
    circle.addEventListener('dragend', (event) => {
        console.log("dragend");
        circle.classList.remove("dragging")
    })
})

//add dropping property to squares
squares.forEach(square => {
    square.addEventListener('dragover', (event) => {
        event.preventDefault();
    })
    square.addEventListener('drop', (event) => {
        const dragging = document.querySelector(".dragging")
        if (square.style.backgroundColor == dragging.style.backgroundColor) {
            dragging.draggable = false
            square.appendChild(dragging)
            dragging.classList.remove("dragging")
        }
    })
})