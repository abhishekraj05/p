// --- CUSTOMIZATION AREA (Yahan Change Kar) ---

// 1. Tera Letter (Dil ki baat yahan likh, \n ka matlab nayi line)
const loveLetter = "Meri Jaan,\n\nIs saal bohot kuch badla, par mera pyaar tumhare liye aur bhi gehra ho gaya.\nTum meri khushi ho, mera sukoon ho, aur meri sabse achi dost ho.\n\nThank you for bearing with me, for loving me, and for being YOU.\nI promise to make 2026 our best year yet.\n\nHappy New Year Love! ❤️";

// 2. Tera WhatsApp Number (Country code ke sath, bina + ke)
const mobileNumber = "919142123902"; 

// ---------------------------------------------

const overlay = document.getElementById('overlay');
const mainContainer = document.getElementById('mainContainer');
const bgMusic = document.getElementById('bgMusic');
const typewriterElement = document.getElementById('typewriterText');

// 1. Entry Function
function startJourney() {
    overlay.classList.add('fade-out');
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContainer.classList.remove('hidden');
        // Music play koshish
        bgMusic.play().catch(e => console.log("Audio Error (User interaction needed):", e));
    }, 1000);
}

// 2. Scroll Animation Setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Agar Letter section dikha, to typing shuru
            if(entry.target.classList.contains('paper') && typewriterElement.innerHTML === "") {
                typeWriter(loveLetter, 0);
            }
            // Agar Finale dikha, to Confetti shuru
            if(entry.target.classList.contains('finale')) {
                shootConfetti();
            }
        }
    });
}, { threshold: 0.2 });

// Elements ko observe karo
document.querySelectorAll('.fade-in-scroll').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});
document.querySelectorAll('.finale').forEach(el => observer.observe(el));

// 3. Typewriter Logic (New lines support ke sath)
function typeWriter(text, i) {
    if (i < text.length) {
        if (text.charAt(i) === '\n') {
            typewriterElement.innerHTML += '<br>';
        } else {
            typewriterElement.innerHTML += text.charAt(i);
        }
        setTimeout(() => typeWriter(text, i + 1), 40); // Typing speed
    }
}

// 4. Confetti Logic
function shootConfetti() {
    const end = Date.now() + 3000; // 3 seconds tak chalega
    const colors = ['#ff6b6b', '#d4af37', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// 5. WhatsApp Button Logic
function sendWhatsApp() {
    const msg = "I saw the website! It's beautiful, I love you! ❤️";
    window.open(`https://wa.me/${mobileNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}