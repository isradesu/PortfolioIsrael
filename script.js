// Navegação suave
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Verifica se é um ID local e se o elemento existe
        if (href.startsWith('#') && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
        // Caso contrário, deixa o link funcionar normalmente (ex: index.html)
    });
});

// Canvas fixo - fundo animado
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

// Inicializar dimensões
let prevWidth = window.innerWidth;
let prevHeight = window.innerHeight;
canvas.width = prevWidth;
canvas.height = prevHeight;

// Criar bolinhas
let dots = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random()
}));

// Redimensionar canvas e ajustar posições das bolinhas proporcionalmente
function resizeCanvas() {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    const scaleX = newWidth / prevWidth;
    const scaleY = newHeight / prevHeight;

    dots.forEach(dot => {
        dot.x *= scaleX;
        dot.y *= scaleY;
    });

    canvas.width = newWidth;
    canvas.height = newHeight;

    prevWidth = newWidth;
    prevHeight = newHeight;
}

window.addEventListener("resize", resizeCanvas);

// Animar bolinhas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x > canvas.width || dot.x < 0) dot.dx *= -1;
        if (dot.y > canvas.height || dot.y < 0) dot.dy *= -1;

        dot.opacity += (Math.random() - 0.5) * 0.03;
        dot.opacity = Math.max(0.1, Math.min(dot.opacity, 1));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127, 152, 86, ${dot.opacity})`;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}

animate();
