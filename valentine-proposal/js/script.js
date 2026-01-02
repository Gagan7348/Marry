// ===================================
// Configuration and Global Variables
// ===================================
const config = {
    stars: 1200,
    colorRange: [330, 350, 10, 340], // Red, pink, rose hues
    petalsPerSecond: 2.5,
    heartsPerSecond: 1.5,
    sparklesPerSecond: 3,
    shootingStarsInterval: 3000
};

let frameNumber = 0;
let textOpacity = 0;
let secondOpacity = 0;
let thirdOpacity = 0;
let fourthOpacity = 0;
let fifthOpacity = 0;
let sixthOpacity = 0;

// ===================================
// Canvas Setup
// ===================================
const starCanvas = document.getElementById('starfield');
const textCanvas = document.getElementById('textCanvas');
const starCtx = starCanvas.getContext('2d');
const textCtx = textCanvas.getContext('2d');

function resizeCanvas() {
    starCanvas.width = textCanvas.width = window.innerWidth;
    starCanvas.height = textCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ===================================
// Star Field Animation
// ===================================
const starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (let i = 0; i < config.stars; i++) {
    starArray.push({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        radius: Math.random() * 2 + 0.3,
        hue: config.colorRange[getRandom(0, config.colorRange.length - 1)],
        sat: getRandom(70, 100),
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1
    });
}

function drawStars() {
    starArray.forEach(star => {
        starCtx.beginPath();
        starCtx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        starCtx.fillStyle = `hsla(${star.hue}, ${star.sat}%, 92%, ${star.opacity})`;
        starCtx.fill();
        
        // Enhanced glow for larger stars
        if (star.radius > 1.5) {
            starCtx.beginPath();
            starCtx.arc(star.x, star.y, star.radius * 3.5, 0, 2 * Math.PI);
            starCtx.fillStyle = `hsla(${star.hue}, ${star.sat}%, 92%, ${star.opacity * 0.12})`;
            starCtx.fill();
        }
    });
}

function updateStars() {
    starArray.forEach(star => {
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        if (star.opacity >= 1 || star.opacity <= 0.3) {
            star.twinkleDirection *= -1;
        }
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));
    });
}

// ===================================
// Shooting Stars
// ===================================
function createShootingStar() {
    const shootingStars = document.getElementById('shootingStars');
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 50 + '%';
    star.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
    shootingStars.appendChild(star);
    
    setTimeout(() => star.remove(), 3000);
}

setInterval(createShootingStar, config.shootingStarsInterval);

// ===================================
// Rose Petals
// ===================================
function createPetal() {
    const rosePetals = document.getElementById('rosePetals');
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.animationDuration = (Math.random() * 5 + 7) + 's';
    rosePetals.appendChild(petal);
    
    setTimeout(() => petal.remove(), 12000);
}

setInterval(createPetal, 1000 / config.petalsPerSecond);

// ===================================
// Floating Hearts
// ===================================
function createFloatingHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💓', '💞', '💘'];
    heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 5 + 's';
    heart.style.animationDuration = (Math.random() * 4 + 9) + 's';
    heart.style.fontSize = (Math.random() * 15 + 22) + 'px';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 14000);
}

setInterval(createFloatingHeart, 1000 / config.heartsPerSecond);

// ===================================
// Sparkles
// ===================================
function createSparkle() {
    const sparkles = document.getElementById('sparkles');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    sparkles.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

setInterval(createSparkle, 1000 / config.sparklesPerSecond);

// ===================================
// Text Drawing with Line Breaks
// ===================================
function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        const yPos = y + index * (fontSize + lineHeight);
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        textCtx.fillText(line, x, yPos);
    });
    textCtx.shadowColor = 'transparent';
    textCtx.shadowBlur = 0;
}

// ===================================
// Main Text Animation
// ===================================
function drawText() {
    const fontSize = Math.min(40, window.innerWidth / 18);
    const lineHeight = 16;
    const centerX = textCanvas.width / 2;
    const centerY = textCanvas.height / 2;

    textCtx.font = `italic ${fontSize}px Georgia, serif`;
    textCtx.textAlign = "center";

    // Message 1: You are the cutest person
    if (frameNumber < 350) {
        textCtx.fillStyle = `rgba(255, 210, 235, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["From the first moment I saw you,", "time stopped and my heart knew"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("From the first moment I saw you, time stopped and my heart knew", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 350 && frameNumber < 700) {
        textCtx.fillStyle = `rgba(255, 210, 235, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["From the first moment I saw you,", "time stopped and my heart knew"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("From the first moment I saw you, time stopped and my heart knew", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 2: Your beauty is divine
    if (frameNumber === 700) textOpacity = 0;
    if (frameNumber > 700 && frameNumber < 1050) {
        textCtx.fillStyle = `rgba(255, 190, 225, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are the most ethereal soul,", "divine, majestic, and magnificent beyond words"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are the most ethereal soul, divine, majestic, and magnificent beyond words", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 1050 && frameNumber < 1400) {
        textCtx.fillStyle = `rgba(255, 190, 225, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are the most ethereal soul,", "divine, majestic, and magnificent beyond words"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are the most ethereal soul, divine, majestic, and magnificent beyond words", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 3: Your highlights
    if (frameNumber === 1400) textOpacity = 0;
    if (frameNumber > 1400 && frameNumber < 1750) {
        textCtx.fillStyle = `rgba(255, 170, 215, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["Your highlights dance like stardust,", "illuminating the darkness in my soul"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("Your highlights dance like stardust, illuminating the darkness in my soul", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 1750 && frameNumber < 2100) {
        textCtx.fillStyle = `rgba(255, 170, 215, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["Your highlights dance like stardust,", "illuminating the darkness in my soul"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("Your highlights dance like stardust, illuminating the darkness in my soul", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 4: Love more than anyone
    if (frameNumber === 2100) textOpacity = 0;
    if (frameNumber > 2100 && frameNumber < 2450) {
        textCtx.fillStyle = `rgba(255, 150, 205, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["My love for you transcends existence,", "deeper than oceans, higher than galaxies"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("My love for you transcends existence, deeper than oceans, higher than galaxies", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 2450 && frameNumber < 2800) {
        textCtx.fillStyle = `rgba(255, 150, 205, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["My love for you transcends existence,", "deeper than oceans, higher than galaxies"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("My love for you transcends existence, deeper than oceans, higher than galaxies", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 5: Radiant smile
    if (frameNumber === 2800) textOpacity = 0;
    if (frameNumber > 2800 && frameNumber < 3150) {
        textCtx.fillStyle = `rgba(255, 130, 195, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["When you smile, the universe pauses", "to witness something truly divine"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("When you smile, the universe pauses to witness something truly divine", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 3150 && frameNumber < 3500) {
        textCtx.fillStyle = `rgba(255, 130, 195, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["When you smile, the universe pauses", "to witness something truly divine"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("When you smile, the universe pauses to witness something truly divine", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 6: You are breathtaking
    if (frameNumber === 3500) textOpacity = 0;
    if (frameNumber > 3500 && frameNumber < 3850) {
        textCtx.font = `italic bold ${fontSize}px Georgia, serif`;
        textCtx.fillStyle = `rgba(255, 180, 220, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 35;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are breathtakingly beautiful,", "inside and out, in every possible way"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are breathtakingly beautiful, inside and out, in every possible way", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 3850 && frameNumber < 4200) {
        textCtx.font = `italic bold ${fontSize}px Georgia, serif`;
        textCtx.fillStyle = `rgba(255, 180, 220, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 35;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are breathtakingly beautiful,", "inside and out, in every possible way"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are breathtakingly beautiful, inside and out, in every possible way", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 7: I will give you everything
    if (frameNumber === 4200) textOpacity = 0;
    if (frameNumber > 4200 && frameNumber < 4550) {
        textCtx.fillStyle = `rgba(255, 160, 210, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["I promise to give you everything", "your heart desires, everything you need"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("I promise to give you everything your heart desires, everything you need", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 4550 && frameNumber < 4900) {
        textCtx.fillStyle = `rgba(255, 160, 210, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["I promise to give you everything", "your heart desires, everything you need"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("I promise to give you everything your heart desires, everything you need", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 8: My eternal vow
    if (frameNumber === 4900) textOpacity = 0;
    if (frameNumber > 4900 && frameNumber < 5250) {
        textCtx.fillStyle = `rgba(255, 140, 200, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["Every dream you have, every wish you make,", "I will move heaven and earth to make it real"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("Every dream you have, every wish you make, I will move heaven and earth to make it real", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 5250 && frameNumber < 5600) {
        textCtx.fillStyle = `rgba(255, 140, 200, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 30;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["Every dream you have, every wish you make,", "I will move heaven and earth to make it real"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("Every dream you have, every wish you make, I will move heaven and earth to make it real", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Message 9: You are my everything
    if (frameNumber === 5600) textOpacity = 0;
    if (frameNumber > 5600 && frameNumber < 5950) {
        textCtx.font = `italic bold ${fontSize}px Georgia, serif`;
        textCtx.fillStyle = `rgba(255, 170, 215, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 35;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are my reason for breathing,", "my purpose, my home, my everything"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are my reason for breathing, my purpose, my home, my everything", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
    }
    if (frameNumber >= 5950 && frameNumber < 6300) {
        textCtx.font = `italic bold ${fontSize}px Georgia, serif`;
        textCtx.fillStyle = `rgba(255, 170, 215, ${textOpacity})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 35;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(
                ["You are my reason for breathing,", "my purpose, my home, my everything"],
                centerX, centerY - 20, fontSize, lineHeight
            );
        } else {
            textCtx.fillText("You are my reason for breathing, my purpose, my home, my everything", centerX, centerY);
        }
        textCtx.shadowBlur = 0;
        textOpacity = Math.max(textOpacity - 0.006, 0);
    }

    // Final Message: Will You Marry Me?
    if (frameNumber === 6300) textOpacity = 0;
    if (frameNumber > 6300) {
        textCtx.font = `italic bold ${fontSize + 16}px Georgia, serif`;
        textCtx.fillStyle = `rgba(255, 255, 255, ${Math.min(textOpacity, 1)})`;
        textCtx.shadowColor = 'rgba(255, 50, 120, 1)';
        textCtx.shadowBlur = 40;
        textCtx.fillText("Will You Marry Me?", centerX, centerY);
        textCtx.shadowBlur = 0;
        textOpacity = Math.min(textOpacity + 0.006, 1);
        
        if (textOpacity > 0.7) {
            document.getElementById('proposalButton').style.display = 'block';
        }
    }
}

// ===================================
// Proposal Button Event
// ===================================
const button = document.getElementById('proposalButton');
button.addEventListener('click', () => {
    button.textContent = "Forever & Always! ❤️💍✨";
    button.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
    button.style.color = "#d32f2f";
    button.style.borderColor = "#ffd700";
    
    const celebration = document.getElementById('celebration');
    
    // Flying Cupid
    const cupid = document.createElement('div');
    cupid.className = 'cupid';
    cupid.innerHTML = '👼💘';
    celebration.appendChild(cupid);
    setTimeout(() => cupid.remove(), 7000);
    
    // Ring Shimmer
    const ring = document.createElement('div');
    ring.className = 'ring-shimmer';
    ring.innerHTML = '💍';
    celebration.appendChild(ring);
    setTimeout(() => ring.remove(), 4000);
    
    // Heart Explosion (200 hearts)
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const emojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘', '🌹', '💐', '💋', '😍'];
            heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 60 + 40) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            heart.style.filter = 'drop-shadow(0 0 15px rgba(255, 100, 150, 1))';
            celebration.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 200;
            const velocity = 3 + Math.random() * 14;
            let x = 0, y = 0, opacity = 1, rotation = 0;
            
            const animate = () => {
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity - 1.2;
                rotation += 6;
                opacity -= 0.007;
                heart.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
                heart.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            requestAnimationFrame(animate);
        }, i * 6);
    }

    // Confetti Burst (300 pieces)
    for (let i = 0; i < 300; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.width = '12px';
            confetti.style.height = '12px';
            const colors = ['#ff1744', '#f50057', '#ffd700', '#ff4081', '#ff6090', '#ffb6c1', '#ff69b4'];
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            celebration.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            let x = 0, y = 0, opacity = 1;
            
            const animateConfetti = () => {
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity + 2.5;
                opacity -= 0.008;
                confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x * 4}deg)`;
                confetti.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateConfetti);
                } else {
                    confetti.remove();
                }
            };
            requestAnimationFrame(animateConfetti);
        }, i * 4);
    }
});

// ===================================
// Main Animation Loop
// ===================================
function animate() {
    // Clear star canvas with fade effect
    starCtx.fillStyle = 'rgba(10, 3, 15, 0.25)';
    starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);
    
    // Clear text canvas completely
    textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
    
    // Draw and update
    drawStars();
    updateStars();
    drawText();
    
    frameNumber++;
    requestAnimationFrame(animate);
}

// Start the animation
animate();