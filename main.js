//#region backgroundCanvas

class Point {
    constructor(size, pos, speed, direction) {
        this.size = size;
        this.pos = pos;
        this.direction = Vector2.multiplyVector(direction, speed);
    }
    draw() {
        let x = this.pos.x;
        let y = this.pos.y;
        let size = this.size;
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(x, y, size, Math.PI / 180 * 0, Math.PI / 180 * 360);
        context.closePath();
        context.fill();
    }
    drawLines(arrayOfPoints) {
        for (let p of arrayOfPoints) {
            let dist = Vector2.distance(this.pos, p.pos);
            if (dist < radius) {
                context.strokeStyle = `hsl(0,0%,100%)`;
                context.lineWidth = 0.3 * (1 - dist / radius);
                context.beginPath();
                context.moveTo(this.pos.x, this.pos.y);
                context.lineTo(p.pos.x, p.pos.y);
                context.closePath();
                context.stroke();
            }
        }
    }
    updatePos() {
        Vector2.addVectors(this.pos, this.direction);
        if (this.pos.x < 0) this.pos.x += width;
        if (this.pos.x > width) this.pos.x -= width;
        if (this.pos.y < 0) this.pos.y += height;
        if (this.pos.y > height) this.pos.y -= height;
    }
}
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static addVectors(v1, v2) {
        v1.x = v1.x + v2.x;
        v1.y = v1.y + v2.y;
    }
    static multiplyVector(v, val) {
        v.x *= val;
        v.y *= val;
        return v;
    }
    static distance(v1, v2) {
        let dx = (v1.x - v2.x);
        let dy = (v1.y - v2.y);
        return Math.sqrt(dx * dx + dy * dy);
    }
}









const canvas = document.getElementById("bgCanvas");
const context = document.getElementById("bgCanvas").getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

const FPS = 60;
const countOfPoints = 100;
const minSize = 0.2;
const maxSize = 2;
const maxSpeed = 2;
const minSpeed = 0.1;
const radius = 200;
let points = [];

const gradient = context.createLinearGradient(0, height / 2, width, height / 2);
gradient.addColorStop(0, '#64b3f4');
gradient.addColorStop(1, '#c2e59c');



main();

function main() {
    setCanvasSize(width, height)
    createPoints(countOfPoints);
    setInterval(render.bind(this, points), 1000 / FPS);
    setInterval(update.bind(this, points), 1000 / FPS);
}

function render(arrayOfPoints) {
    clearScreen();
    for (let p of arrayOfPoints) {
        p.draw();
        p.drawLines(arrayOfPoints);
    }
}

function update(arrayOfPoints) {
    for (let p of arrayOfPoints) {
        p.updatePos();
    }
}

function clearScreen() {
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
}

function createPoints(count) {
    for (let i = 0; i < count; i++) {
        let randSize = Math.random() * (maxSize - minSize) + minSize;
        let rand_x = Math.random() * width;
        let rand_y = Math.random() * height;
        let rand_dx = Math.random() * 2 - 1;
        let rand_dy = Math.random() * 2 - 1;
        let randSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        let randPos = new Vector2(rand_x, rand_y);
        let randDir = new Vector2(rand_dx, rand_dy);
        let newPoint = new Point(randSize, randPos, randSpeed, randDir);
        points.push(newPoint);
    }
}

function setCanvasSize(w, h) {
    canvas.width = w;
    canvas.height = h;
}

//#endregion

//#region headerAwake
const navbar = document.getElementById('navbar');
window.addEventListener("scroll", scrollcheck);
const scrollVal = height - 250;

function scrollcheck(e) {
    if (window.scrollY > scrollVal) {
        navbar.classList.add("awake");
        navbar.parentElement.classList.add("awake");
    }
    if (window.scrollY < scrollVal) {
        navbar.classList.remove("awake");
        navbar.parentElement.classList.remove("awake");
    }
}
//#endregion

//#region move images up, on scroll

const imgGrid = document.querySelector(".imgGrid");
window.addEventListener("scroll", imgGridTranslate);
const defaultStyle = imgGrid.style;

function imgGridTranslate(e) {
    let b = -window.scrollY / 4;
    let c = clamp(-150, 0, b);
    console.log(c);
    let a = `translateY(${c}px)`;
    imgGrid.style.transform = a;
}

//#endregion











function clamp(min, max, val) {
    return Math.min(Math.max(val, min), max);
}