const canvas = document.getElementById('canvas')
const scoreHtml = document.getElementById('score')
const ctx = canvas.getContext('2d')

let direction;

const canW = 300;
const canH = 300;

const defaultSetting = {
    isPause: false,
    score: 0,
    speed: 1
}

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
    stepX: 0,
    stepY: 0,
    center: function () {
        this.x = canW  / 2 - this.height / 2;
        this.y = canH  / 2 - this.width / 2;
    },
    draw: function () {
        ctx.clearRect(this.x, this.y, this.width, this.height)
        this.x += snake.stepX
        this.y += snake.stepY

        if(this.x > canW) {
            this.x = -this.width
        }
        if(this.x < -this.width) {
            this.x = canW
        }
        if(this.y > canH) {
            this.y = -this.height
        }
        if(this.y < -this.height) {
            this.y = canH
        }

        ctx.clearRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = '#dedede';
        ctx.fillRect(this.x += snake.stepX, this.y += snake.stepY, this.width, this.height)

        const endRectX = this.x + this.width;
        const endEatX = eat.x + eat.width;
        const endRectY = this.y + this.height
        const endEatY = eat.y + eat.height

        if((endEatX >= this.x && endRectX >= eat.x) && (endEatY >= this.y && endRectY >= eat.y)) {
            console.log('Съел')
            defaultSetting.score++
            scoreHtml.innerHTML = defaultSetting.score.toString()
            eat.clear()
            eat.draw()
        }
    }
}

function draw() {
    if(defaultSetting.isPause) return;

    snake.draw()
    window.requestAnimationFrame(draw)
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowRight') {
        if(direction === 'ArrowLeft') return
        snake.stepX = defaultSetting.speed
        snake.stepY = 0
    }
    if(e.key === 'ArrowLeft') {
        if(direction === 'ArrowRight') return
        snake.stepX = -defaultSetting.speed
        snake.stepY = 0
    }
    if(e.key === 'ArrowDown') {
        if(direction === 'ArrowUp') return
        snake.stepY = defaultSetting.speed
        snake.stepX = 0
    }
    if(e.key === 'ArrowUp') {
        if(direction === 'ArrowDown') return
        snake.stepY = -defaultSetting.speed
        snake.stepX = 0
    }
    if(e.key === ' ') {
        defaultSetting.isPause = !defaultSetting.isPause
        draw()
    }
    direction = e.key
})

snake.center()
eat.draw()
window.requestAnimationFrame(draw)