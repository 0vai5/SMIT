var imgSrc = ""

function ImageHandler (elem) {
    imgSrc = elem.src
    elem.src = "./images/car1.png"
}

function ImageHandler2 (elem) {
    elem.src = imgSrc
}