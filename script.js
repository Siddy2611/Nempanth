<<<<<<< HEAD
// ==== ELEMENTS ====
const stackCards = document.querySelectorAll('.stack-card');
const contentSection = document.querySelector('.content');
const downArrow = document.querySelector('.down-arrow');

// hero pieces (keep face behavior)
const logoContainer = document.querySelector('.logo-container');
const faceContainer = document.querySelector('.face-container');
const face = document.querySelector('.face');
const eyes = document.querySelectorAll('.logo-eye');
const mouthPath = document.getElementById('mouth-path');
const browL = document.getElementById('eyebrow-left-path');
const browR = document.getElementById('eyebrow-right-path');
const scrollStrip = document.querySelector('.scroll-strip');

// ==== Camera feature ====
const cameraIcon = document.getElementById('camera-icon');
const cameraSound = document.getElementById('camera-sound');

if (cameraIcon && cameraSound) {
    const originalSrc = 'assets/camera.png';

    cameraIcon.addEventListener('mouseenter', () => {
        if (cameraIcon.classList.contains('busy')) return;

        const gifSrc = 'assets/camera.gif?t=' + Date.now(); // cache-buster
        cameraIcon.classList.add('busy');
        cameraIcon.src = gifSrc;

        // play sound after a short delay
        cameraSound.currentTime = 0;
        cameraSound.play().catch(() => {});
    });

    cameraIcon.addEventListener('mouseleave', () => {
        cameraIcon.src = originalSrc;
        cameraIcon.classList.remove('busy');
    });
}


// ==== Microphone feature ====
const micIcon = document.querySelector('.icon-right');
const micSound = document.getElementById('mic-sound');

if (micIcon && micSound) {
  micIcon.addEventListener('click', () => {
    micSound.play();
  });
}

const bulbIcon = document.getElementById('bulb-icon');

if (bulbIcon) {
  bulbIcon.addEventListener('mouseenter', () => {
    bulbIcon.src = 'assets/bulb_on.png';   // Bulb ON (yellow)
  });

  bulbIcon.addEventListener('mouseleave', () => {
    bulbIcon.src = 'assets/bulb_off.png';  // Bulb OFF
  });
}


// ---- animation settings ----
const perCardScroll = 400; // px per card animation
const cardsScrollRange = stackCards.length * perCardScroll;
const stackGap = 40; // vertical gap between stacked cards

// clamp helper
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateAnimations();
      ticking = false;
    });
    ticking = true;
  }
}

function updateAnimations() {
  const sectionTop = contentSection.offsetTop;
  const scrollPos = window.scrollY - sectionTop;

  // Cards animation (including top card as index 0)
  stackCards.forEach((card, index) => {
    const start = index * perCardScroll;
    const end = start + perCardScroll;
    const progress = clamp((scrollPos - start) / (end - start), 0, 1);
    const moveDistance = window.innerHeight;
    const targetY = index * stackGap;



    // Top card starts already in place
    let initialY = moveDistance;
if (card.classList.contains('top-card')) {
  initialY = window.innerHeight; // start from bottom
}

    const translateY = (1 - progress) * initialY + targetY;
    card.style.transform = `translateY(${translateY}px) rotate(-2deg)`;
    // Odd index (1, 3, 5...) tilt left, Even index (0, 2, 4...) tilt right
// const tilt = index % 2 === 0 ? 3 : -3;
// card.style.transform = `translateY(${translateY}px) rotate(${tilt}deg)`;

    card.style.zIndex = index + 1;
  });
}

// attach listeners
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', () => {
  updateAnimations();
});

// --- HERO FACE BEHAVIOR (kept) ---
const expressions = ['happy','sad','angry','confused','surprised','neutral','mischievous','tired','bored'];
const mouthPaths = {
  happy: 'M10 20 Q50 0 90 20',
  sad: 'M10 10 Q50 30 90 10',
  angry: 'M10 15 L90 15',
  confused: 'M10 15 Q30 5 50 15 Q70 25 90 15',
  surprised: 'M45 15 A5 5 0 1 1 55 15 A5 5 0 1 1 45 15',
  neutral: 'M10 15 L90 15',
  mischievous: 'M10 20 Q50 10 90 20',
  tired: 'M10 15 Q50 25 90 15',
  bored: 'M10 15 L50 15'
};
const eyebrowPaths = {
  happy: { left: 'M0 15 Q50 5 100 15', right: 'M0 15 Q50 5 100 15' },
  sad: { left: 'M0 5 L50 15 L100 5', right: 'M0 5 L50 15 L100 5' },
  angry: { left: 'M0 10 H100', right: 'M0 10 H100' },
  confused: { left: 'M0 15 Q50 5 100 15', right: 'M0 10 H100' },
  surprised: { left: 'M0 15 Q50 0 100 15', right: 'M0 15 Q50 0 100 15' },
  neutral: { left: 'M0 10 H100', right: 'M0 10 H100' },
  mischievous: { left: 'M0 15 Q50 5 100 15', right: 'M0 10 H100' },
  tired: { left: 'M0 5 Q50 15 100 5', right: 'M0 5 Q50 15 100 5' },
  bored: { left: 'M0 10 H100', right: 'M0 10 H100' }
};
let exprIndex = 0;
function applyExpression(name) {
  expressions.forEach(e => face.classList.remove(`expression-${e}`));
  if (face) face.classList.add(`expression-${name}`);
  if (mouthPath) mouthPath.setAttribute('d', mouthPaths[name]);
  if (browL && browR) {
    browL.setAttribute('d', eyebrowPaths[name].left);
    browR.setAttribute('d', eyebrowPaths[name].right);
  }
}
function nextExpression() {
  exprIndex = (exprIndex + 1) % expressions.length;
  applyExpression(expressions[exprIndex]);
}
function blink() {
  eyes.forEach(e => {
    e.classList.add('blinking');
    setTimeout(() => e.classList.remove('blinking'), 500);
  });
  setTimeout(blink, Math.random()*2000 + 4000);
}
function showFace() {
  if (logoContainer) logoContainer.style.display = 'none';
  if (faceContainer) faceContainer.style.display = 'flex';
  setInterval(nextExpression, 1500);
}



function typeWriter(el, text, speed=25){
  let i=0;
  function typing(){
    if(i<text.length){
      el.querySelector("p").innerHTML += text.charAt(i);
      i++;
      setTimeout(typing,speed);
    }
  }
  typing();
}

document.querySelectorAll(".mission-vision-values .card").forEach(card=>{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !entry.target.dataset.done){
        const title=entry.target.dataset.title;
        const text=entry.target.dataset.text;
        entry.target.innerHTML=`<h4>${title}</h4><p></p>`;
        entry.target.style.opacity=1;
        typeWriter(entry.target,text,20);
        entry.target.dataset.done="true";
      }
    });
  },{threshold:0.5});
  observer.observe(card);
});

function checkFadeVisibility() {
    const windowHeight = window.innerHeight;

    // Handle services fade
    const services = document.querySelectorAll('.poster');
    services.forEach(service => {
        const rect = service.getBoundingClientRect();
        if (rect.top < windowHeight - 50 && rect.bottom > 50) {
            service.classList.add('visible');
        } else {
            service.classList.remove('visible');
        }
    });
  }
// Run on scroll and load
window.addEventListener('scroll', checkFadeVisibility);
window.addEventListener('load', checkFadeVisibility);

document.querySelectorAll(".take-what-you-need .tab").forEach(tab => {
  tab.addEventListener("click", function(e) {
    e.preventDefault();
    const link = this.getAttribute("href");
    this.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    this.style.transform = "rotate(180deg) translateY(60px) scale(1.2)";
    this.style.opacity = "0";

    setTimeout(() => {
      window.location.href = link;
    }, 400); // wait for animation before redirect
  });
});



// start
setTimeout(showFace, 1800);
applyExpression(expressions[0]);
blink();
updateAnimations();



