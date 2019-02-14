/*
 * Authors : Birner Scott, Lopes Miguel
 * Description : Bijectives images
 * Date : 31.01.19
 * Version : 1.0.0
 * File : script.js
 */

var img = document.getElementById('my-image');
var canvas = document.createElement('canvas');
var newCanvas = document.getElementById('image-canvas');

/*
 * START MAIN FUNCTIONS
 */

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fileChanged(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = reader.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}


/*
 * START BIJECTIVES IMAGES FUNCTIONS
 */

function Photomaton() {

    let width = img.width;
    let height = img.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            var ctx = canvas.getContext('2d');
            var newCtx = newCanvas.getContext('2d');

            var pixelData = ctx.getImageData(x, y, 1, 1);

            if (x % 2 == 0 && y % 2 == 0)
                newCtx.putImageData(pixelData, x / 2, y / 2)
            else if (x % 2 == 0)
                newCtx.putImageData(pixelData, x / 2, height / 2 + y / 2)
            else if (y % 2 == 0)
                newCtx.putImageData(pixelData, width / 2 + x / 2, y / 2)
            else
                newCtx.putImageData(pixelData, width / 2 + x / 2, height / 2 + y / 2)
        }
    }

    canvas.getContext('2d').drawImage(newCanvas, 0, 0);
}

function Baker() {

}

function DoubleRotation() {

}

function Svastika() {

}

function Flower() {

}

function CapitaineFlower() {

}

function StepByStep() {
    canvas.width = img.width;
    canvas.height = img.height;
    newCanvas.width = img.width;
    newCanvas.height = img.height;

    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    
    callImageMethod();
}

async function StepOver() {

    canvas.width = img.width;
    canvas.height = img.height;
    newCanvas.width = img.width;
    newCanvas.height = img.height;

    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    while (getBase64Image(img) != getBase64Image(newCanvas)) {
        callImageMethod();
        await sleep(100);
    }
}

function callImageMethod() {
    var imageMethod = document.getElementById("image-method").value;

    switch (imageMethod) {
        case "photomaton":
            Photomaton();
            break;
        case "baker":
            Baker();
            break;
        case "double-rotation":
            DoubleRotation();
            break;
        case "svastika":
            Svastika();
            break;
        case "flower":
            Flower();
            break;
        case "capitaine-flower":
            CapitaineFlower();
            break;
        default:
            break;
    }
}