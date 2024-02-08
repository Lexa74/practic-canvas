const canvas = document.getElementById('canvas')
const scoreHtml = document.getElementById('score')
const ctx = canvas.getContext('2d')

let isPause = false
let direction;

const canW = 300;
const canH = 300;


let stepX = 0;
let stepY = 0;

const speed = 3.6;


let score = 0;


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

const eat = {
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    draw: function () {
        this.x = getRandomNumber(0, canW - this.width)
        this.y = getRandomNumber(0, canH - this.height)

        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    },
    clear: function () {
        ctx.clearRect(this.x, this.y, this.width, this.height)
    }
}

const snake = {
    width: 10,
    height: 10,
    x: 0,
    y: 0,
    center: function () {
        this.x = canW  / 2 - this.height / 2;
        this.y = canH  / 2 - this.width / 2;
    },
    draw: function () {
        ctx.clearRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = '#dedede';
        ctx.fillRect(this.x += stepX, this.y += stepY, this.width, this.height)

        if(this.x > canW) {
            ctx.clearRect(this.x, this.y, this.width, this.height)
            this.x = -this.width
        }
        if(this.x < -this.width) {
            ctx.clearRect(this.x, this.y, this.width, this.height)
            this.x = canW
        }
        if(this.y > canH) {
            ctx.clearRect(this.x,this.y, this.width, this.height)
            this.y = -this.height
        }
        if(this.y < -this.height) {
            ctx.clearRect(this.x,this.y, this.width, this.height)
            this.y = canH
        }

        const endRectX = this.x + this.width;
        const endEatX = eat.x + eat.width;
        const endRectY = this.y + this.height
        const endEatY = eat.y + eat.height

        if((endEatX >= this.x && endRectX >= eat.x) && (endEatY >= this.y && endRectY >= eat.y)) {
            console.log('Съел')
            score++
            scoreHtml.innerHTML = score.toString()
            eat.clear()
            eat.draw()
        }
    }
}

function draw() {
    if(isPause) return;

    snake.draw()
    window.requestAnimationFrame(draw)
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') {
        if(direction === 'ArrowLeft') return
        stepX = 0.4 + speed
        stepY = 0
    }
    if(e.key === 'ArrowLeft') {
        if(direction === 'ArrowRight') return
        stepX = -speed - 0.4
        stepY = 0
    }
    if(e.key === 'ArrowDown') {
        if(direction === 'ArrowUp') return
        stepY = 0.4 + speed
        stepX = 0
    }
    if(e.key === 'ArrowUp') {
        if(direction === 'ArrowDown') return
        stepY = -speed - 0.4
        stepX = 0
    }
    if(e.key === ' ') {
        isPause = !isPause
        draw()
    }
    direction = e.key
})
snake.center()
eat.draw()
window.requestAnimationFrame(draw)