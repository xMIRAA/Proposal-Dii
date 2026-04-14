const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const memeOverlay = document.getElementById('meme-overlay');
const successScreen = document.getElementById('success-screen');
const backBtn = document.getElementById('back-btn');
const particlesContainer = document.getElementById('particles-container');
const originalParent = noBtn.parentElement;

let noCount = 0;
const MAX_NO = 5;
let memeTimer;

// Start auto-meme timer (15 seconds)
function startMemeTimer() {
    clearTimeout(memeTimer);
    memeTimer = setTimeout(showMeme, 15000); // 15 seconds
}

startMemeTimer();

// Dodge Logic
noBtn.addEventListener('mouseenter', () => {
    noCount++;
    
    if (noCount >= MAX_NO) {
        showMeme();
        return;
    }

    if (noBtn.parentElement !== document.body) {
        document.body.appendChild(noBtn);
    }

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.margin = '0'; // Ensure no layout shifts
});

// Yes Logic
yesBtn.addEventListener('click', () => {
    successScreen.classList.remove('hidden');
    noBtn.classList.add('hidden'); // Hide No button on success
    clearTimeout(memeTimer); // Clear timer if they say yes!
    
    // Trigger Confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

// Meme Overlay
function showMeme() {
    memeOverlay.classList.remove('hidden');
    noBtn.classList.add('hidden'); // Hide No button when meme appears
    clearTimeout(memeTimer);
}

backBtn.addEventListener('click', () => {
    memeOverlay.classList.add('hidden');
    noBtn.classList.remove('hidden'); // Show No button back
    noCount = 0; // Reset counter
    
    // Move button back to original parent to restore layout
    originalParent.appendChild(noBtn);
    
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    startMemeTimer(); // Restart timer
});

// Floating Hearts Background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('particle');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 20 + 'px';
    
    particlesContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 500);

// Add keyframes for hearts dynamically
const style = document.createElement('style');
style.innerHTML = `
    .particle {
        position: absolute;
        top: -10vh;
        animation: fall linear forwards;
    }
    @keyframes fall {
        to {
            transform: translateY(110vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
