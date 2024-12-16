const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to fill the entire screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Animation variables
const particles = [];
const maxParticles = 100;

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = 'rgba(255, 255, 255, 0.6)';
}

Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
}

Particle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
}

function createParticles(e) {
    const xPos = e.x;
    const yPos = e.y;
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(xPos, yPos));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

canvas.addEventListener('mousemove', createParticles);
animateParticles();