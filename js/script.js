/*
 * Authors : Birner Scott, Lopes Miguel
 * Description : Bijectives images
 * Date : 31.01.19
 * Version : 1.0.0
 * File : script.js
 */

var img = document.getElementById('my-image');
var canvas = document.getElementById('canvas');
var newCanvas = document.getElementById('image-canvas');

var stepCount = 0;

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
    let width = img.width;
    let height = img.height;

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            var newX = 0;
            var newY = 0;

            var ctx = canvas.getContext('2d');
            var newCtx = newCanvas.getContext('2d');

            var pixelData = ctx.getImageData(x, y, 1, 1);

            if ((y % 2 == 0) && (x < width / 2)) {
                newX = 2 * x;
                newY = y / 2;
            } else if ((y % 2 != 0) && (x < width / 2)) {
                newX = 2 * x + 1;
                newY = (y - 1) / 2;
            } else if ((y % 2 == 0) && (x >= width / 2)) {
                newX = 2 * width - 1 - 2 * x;
                newY = height - 1 - y / 2;
            } else if ((y % 2 != 0) && (x >= width / 2)) {
                newX = 2 * width - 2 - 2 * x;
                newY = height - 1 - (y - 1) / 2;
            }

            newCtx.putImageData(pixelData, newX, newY)
        }
    }
    canvas.getContext('2d').drawImage(newCanvas, 0, 0);
}

function DoubleRotation() {
    let width = img.width;
    let height = img.height;

    for (let y = height; y >= 0; y--) {
        for (let x = width; x >= 0; x--) {

            var ctx = canvas.getContext('2d');
            var newCtx = newCanvas.getContext('2d');
            pixelData = ctx.getImageData(x, y, 1, 1);

            newCtx.putImageData(pixelData, (x + 1) % width, (y + 1) % height);
        }
    }

    canvas.getContext('2d').drawImage(newCanvas, 0, 0);
}

function Svastika() {
    let width = img.width;
    let height = img.height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            var ctx = canvas.getContext('2d');
            var newCtx = newCanvas.getContext('2d');

            var pixelData = ctx.getImageData(x, y, 1, 1);


            let col = x;
            let row = y;
            let l = width / 2;
            let h = height / 2;
            if ((x % 2 == 0) && (y % 2 == 0)) {
                col = x / 2;
                row = y / 2;
            } else if ((x % 2 == 1) && (y % 2 == 0)) {
                col = (x - 1) / 2 + l;
                row = y / 2;

                let milCol = 3 * l / 2;
                let milrow = h / 2;
                let colR = col - milCol;
                let rowR = milrow - row;
                let c = rowR;
                let li = -colR;
                col = milCol + c;
                if (width / 2 % 2 == 0) {
                    col--;
                }
                row = milrow - li;
            } else if ((x % 2 == 0) && (y % 2 == 1)) {
                col = x / 2;
                row = (y - 1) / 2 + h;

                let milCol = l / 2;
                let milrow = 3 * h / 2;
                let colR = col - milCol;
                let rowR = milrow - row;
                let c = -rowR;
                let li = colR;
                col = milCol + c;
                row = milrow - li;
                if (height / 2 % 2 == 0) {
                    row--;
                }
            } else {
                col = (x - 1) / 2 + l;
                row = (y - 1) / 2 + h;

                let middle = 3 * h / 2;
                col += 2 * (middle - col);
                if (width / 2 % 2 == 0) {
                    col--;
                }
                middle = 3 * l / 2;
                row += 2 * (middle - row);
                if (height / 2 % 2 == 0) {
                    row--;
                }
            }
            newCtx.putImageData(pixelData, col, row)
        }
    }

    canvas.getContext('2d').drawImage(newCanvas, 0, 0);

}

function Flower() {
    let width = img.width;
    let height = img.height;
    let l = width / 2;
    let h = height / 2;
    let col;
    let row;

    for (let y = height; y >= 0; y--) {
        for (let x = width; x >= 0; x--) {

            var ctx = canvas.getContext('2d');
            var newCtx = newCanvas.getContext('2d');
            pixelData = ctx.getImageData(x, y, 1, 1);

            col = x;
            row = y;

            if ((x % 2 == 0) && (y % 2 == 0)) {
                col = x / 2;
                row = y / 2;
            } else if ((x % 2 == 1) && (y % 2 == 0)) {
                col = (x - 1) / 2 + l;
                row = y / 2;

                let middle = 3 * l / 2;
                col += 2 * (middle - col);
                if (width / 2 % 2 == 0) {
                    col--;
                }
            } else if ((x % 2 == 0) && (y % 2 == 1)) {
                col = x / 2;
                row = (y - 1) / 2 + h;

                let middle = 3 * h / 2;
                row += 2 * (middle - row);
                if (height / 2 % 2 == 0) {
                    row--;
                }
            } else {
                col = (x - 1) / 2 + l;
                row = (y - 1) / 2 + h;

                let middle = 3 * l / 2;
                col += 2 * (middle - col);
                if (width / 2 % 2 == 0) {
                    col--;
                }
                middle = 3 * h / 2;
                row += 2 * (middle - row);
                if (height / 2 % 2 == 0) {
                    row--;
                }
            }

            newCtx.putImageData(pixelData, col, row);
        }
    }

    canvas.getContext('2d').drawImage(newCanvas, 0, 0);
}

function CapitaineFlower() {
    let width = img.width;
    let height = img.height;

    let nb = 2;
    let nbx = nb;
    let nby = nb;

    width -= width % nbx;
    height -= height % nby;

    for (let px = 0, mx = 0; px < width; px += nbx, mx++) {
        for (let py = 0, my = 0; py < height; py += nby, my++) {
            for (let tx = 0; tx < nbx; tx++) {
                let dx = (width / nbx) * (tx + 1) - mx - 1;

                for (let ty = 0; ty < nby; ty++) {
                    let dy = (height / nby) * (ty + 1) - my - 1;

                    var ctx = canvas.getContext('2d');
                    var newCtx = newCanvas.getContext('2d');

                    var pixelData = ctx.getImageData(dx, dy, 1, 1);


                    newCtx.putImageData(pixelData, px + tx, py + ty)
                }
            }
        }
    }
    canvas.getContext('2d').drawImage(newCanvas, 0, 0);
}

function StepByStep() {
    if (stepCount == 0) {
        canvas.width = img.width;
        canvas.height = img.height;
        newCanvas.width = img.width;
        newCanvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    }

    callImageMethod();
    stepCount++;

    if (getBase64Image(img) == getBase64Image(newCanvas))
        stepCount = 0;

    returnStep();
}

async function StepOver() {
    canvas.width = img.width;
    canvas.height = img.height;
    newCanvas.width = img.width;
    newCanvas.height = img.height;

    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    while (getBase64Image(img) != getBase64Image(newCanvas)) {
        returnStep();
        stepCount++;
        callImageMethod();
        await sleep(10);
        
    }
    stepCount = 0;
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

/*
 * RETURN NUMBER OF STEP
 */
let numberStep = document.getElementById("nbStep");

function returnStep(){
    numberStep.textContent = "Step N° "+stepCount;
}