const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const chatBox = document.getElementById('chat-box');
const chatHeader = document.getElementById('chat-header');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const voiceBtn = document.getElementById('voice-btn');
const toggleChat = document.querySelector('.toggle-chat');

chatHeader.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    toggleChat.textContent = chatBox.classList.contains('active') ? '▼' : '▲';
});

const botResponses = [
    "Welcome to Learn Verse! How can I help with your learning journey today?",
    "Thanks for your question. Is there anything specific about our courses you'd like to know?",
    "That's a great question about our platform. Let me help you with that!",
    "I'm here to make your learning experience better. What course are you interested in?",
    "Need help choosing the right course? I can recommend options based on your interests!",
    "I see you're interested in our web development track. Would you like more details?",
    "Don't forget that our courses come with lifetime access and a certificate!",
    "Having trouble with enrollment? I can guide you through the process step by step.",
    "Our instructors are industry experts with years of experience. Would you like to know more?",
    "Did you know we offer a 7-day money-back guarantee on all our courses?"
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    
    if (!isUser) {
        let i = 0;
        const text = message;
        messageDiv.textContent = '';
        chatBody.appendChild(messageDiv);
        
        const typing = setInterval(() => {
            if (i < text.length) {
                messageDiv.textContent += text.charAt(i);
                i++;
                chatBody.scrollTop = chatBody.scrollHeight;
            } else {
                clearInterval(typing);
            }
        }, 30);
    } else {
        messageDiv.textContent = message;
        chatBody.appendChild(messageDiv);
    }
    
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply() {
    setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomResponse);
    }, 1000);
}

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        botReply();
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript;
    };

    voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.textContent = '🔴';
        
        setTimeout(() => {
            recognition.stop();
            voiceBtn.textContent = '🎤';
        }, 5000);
    });

    recognition.onend = function() {
        voiceBtn.textContent = '🎤';
    };
} else {
    voiceBtn.style.display = 'none';
}

const modelContainer = document.getElementById('model-container');
let scene, camera, renderer, cube;

function init3DModel() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    modelContainer.appendChild(renderer.domElement);
    
    const geometry = new THREE.IcosahedronGeometry(2, 1);
    const material = new THREE.MeshNormalMaterial({
        wireframe: true,
    });
    
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    
    const pointLight = new THREE.PointLight(0xff00ff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    window.addEventListener('resize', () => {
        camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    });
    
    let isDragging = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };
    
    document.addEventListener('mousedown', (e) => {
        if (e.target === renderer.domElement) {
            isDragging = true;
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y
            };
            
            cube.rotation.y += deltaMove.x * 0.01;
            cube.rotation.x += deltaMove.y * 0.01;
        }
        
        previousMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    modelContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        camera.position.z += e.deltaY * 0.01;
        camera.position.z = Math.max(3, Math.min(camera.position.z, 10));
    });
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.002;
    cube.rotation.y += 0.003;
    renderer.render(scene, camera);
}

function createCursorEffects() {
    const cursorParticles = [];
    const maxParticles = 15;
    const colors = [
        '#ff00ff', '#00ffff', '#ffff00', '#ff00cc', '#00ccff'
    ];
    
    document.addEventListener('mousemove', (e) => {
        if (cursorParticles.length < maxParticles) {
            const particle = document.createElement('div');
            particle.classList.add('cursor-particle');
            
            const size = Math.random() * 20 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${e.clientX}px`;
            particle.style.top = `${e.clientY}px`;
            
            document.body.appendChild(particle);
            cursorParticles.push({
                element: particle,
                x: e.clientX,
                y: e.clientY,
                size: size,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3,
                growth: -0.2
            });
        }
    });
    
    function animateParticles() {
        for (let i = 0; i < cursorParticles.length; i++) {
            const particle = cursorParticles[i];
            
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.size += particle.growth;
            
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            
            if (particle.size <= 0) {
                particle.element.remove();
                cursorParticles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

function createConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiCount = 200;
    const confettiColors = [
        '#ff00ff', '#00ffff', '#ffff00', '#ff00cc', '#00ccff', '#ffffff'
    ];
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: -10,
            size: Math.random() * 10 + 5,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 6.28,
            spin: Math.random() * 0.2 - 0.1
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let stillFalling = false;
        
        for (const piece of confetti) {
            if (piece.y < canvas.height) {
                stillFalling = true;
                
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.angle);
                
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                
                ctx.restore();
                
                piece.y += piece.speed;
                piece.angle += piece.spin;
            }
        }
        
        if (stillFalling) {
            requestAnimationFrame(drawConfetti);
        } else {
            canvas.style.display = 'none';
        }
    }
    
    drawConfetti();
}

window.addEventListener('load', () => {
    init3DModel();
    createCursorEffects();
    createConfetti();
    
    setTimeout(() => {
        chatBox.classList.add('active');
        toggleChat.textContent = '▼';
    }, 3000);
});

window.addEventListener('resize', () => {
    if (renderer) {
        camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    }
    
    const confettiCanvas = document.getElementById('confetti-canvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});