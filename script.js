// Combined JavaScript for the Royal Wedding Invitation
// All original modules merged into one file. Load after the page markup.



/* ==================== AUDIO.JS ==================== */
// Web Audio API Sound Synthesizer & Royal Ambient Melody Generator
// Ensures 100% reliable sound effects and background music without broken external links

class RoyalSoundEngine {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.volume = 0.5;
        this.masterGain = null;
        this.melodyTimeout = null;
        this.currentNoteIndex = 0;
        this.userInteracted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        this.userInteracted = true;
    }

    // Play realistic wax seal unboxing / cracking sound
    playWaxSealSound() {
        this.init();
        const now = this.ctx.currentTime;
        
        // 1. Crisp initial snap
        const snapOsc = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(600, now);
        snapOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
        snapGain.gain.setValueAtTime(0.4, now);
        snapGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        snapOsc.connect(snapGain);
        snapGain.connect(this.masterGain);
        snapOsc.start(now);
        snapOsc.stop(now + 0.09);

        // 2. Paper slide / royal whoosh
        const bufferSize = this.ctx.sampleRate * 0.4;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, now + 0.05);
        filter.frequency.linearRampToValueAtTime(400, now + 0.4);
        filter.Q.value = 3;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, now + 0.05);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        whiteNoise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.masterGain);
        whiteNoise.start(now + 0.05);

        // 3. Royal harp chime chord (F# Minor / A Major pentatonic)
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, idx) => {
            const chimeOsc = this.ctx.createOscillator();
            const chimeGain = this.ctx.createGain();
            chimeOsc.type = 'sine';
            chimeOsc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.06);
            
            chimeGain.gain.setValueAtTime(0.001, now + 0.1 + idx * 0.06);
            chimeGain.gain.linearRampToValueAtTime(0.18, now + 0.12 + idx * 0.06);
            chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.06);

            chimeOsc.connect(chimeGain);
            chimeGain.connect(this.masterGain);
            chimeOsc.start(now + 0.1 + idx * 0.06);
            chimeOsc.stop(now + 1.5 + idx * 0.06);
        });
    }

    // Play subtle soft UI button click
    playClickSound() {
        if (!this.userInteracted) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
    }

    // Play subtle error alert sound for incorrect lock PIN
    playErrorSound() {
        if (!this.userInteracted) return;
        this.init();
        const now = this.ctx.currentTime;
        [0, 0.11].forEach(delay => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now + delay);
            osc.frequency.linearRampToValueAtTime(110, now + delay + 0.08);
            gain.gain.setValueAtTime(0.08, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.08);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + delay);
            osc.stop(now + delay + 0.09);
        });
    }

    // Play celebratory bell / chime for RSVP completion
    playCelebrationChime() {
        this.init();
        const now = this.ctx.currentTime;
        const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C Major arpeggio
        chords.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0.001, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.8);
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 2.0);
        });
    }

    // Enchanting Indian classical flute & royal harp ambient melody loop
    startAmbientMelody() {
        this.init();
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.playNextMelodyPhrase();
        this.updateMusicUI(true);
    }

    stopAmbientMelody() {
        this.isPlaying = false;
        if (this.melodyTimeout) {
            clearTimeout(this.melodyTimeout);
            this.melodyTimeout = null;
        }
        this.updateMusicUI(false);
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.stopAmbientMelody();
        } else {
            this.startAmbientMelody();
        }
    }

    playNextMelodyPhrase() {
        if (!this.isPlaying) return;

        // Raag Yaman / Bhupali inspired serene pentatonic melody
        const scale = {
            Sa: 261.63,   // C4
            Re: 293.66,   // D4
            Ga: 329.63,   // E4
            Pa: 392.00,   // G4
            Dha: 440.00,  // A4
            SaHigh: 523.25, // C5
            ReHigh: 587.33, // D5
            GaHigh: 659.25  // E5
        };

        const melodyPhrases = [
            [{ note: scale.Sa, duration: 0.6, type: 'harp' }, { note: scale.Ga, duration: 0.6, type: 'flute' }, { note: scale.Pa, duration: 1.2, type: 'flute' }, { note: scale.Dha, duration: 0.8, type: 'harp' }, { note: scale.SaHigh, duration: 1.4, type: 'flute' }],
            [{ note: scale.SaHigh, duration: 0.7, type: 'flute' }, { note: scale.Dha, duration: 0.5, type: 'harp' }, { note: scale.Pa, duration: 1.0, type: 'flute' }, { note: scale.Ga, duration: 0.7, type: 'flute' }, { note: scale.Re, duration: 0.8, type: 'harp' }, { note: scale.Sa, duration: 1.6, type: 'flute' }],
            [{ note: scale.Ga, duration: 0.6, type: 'harp' }, { note: scale.Pa, duration: 0.6, type: 'flute' }, { note: scale.SaHigh, duration: 0.9, type: 'flute' }, { note: scale.ReHigh, duration: 0.8, type: 'flute' }, { note: scale.GaHigh, duration: 1.8, type: 'flute' }],
            [{ note: scale.GaHigh, duration: 0.8, type: 'flute' }, { note: scale.ReHigh, duration: 0.6, type: 'harp' }, { note: scale.SaHigh, duration: 1.0, type: 'flute' }, { note: scale.Pa, duration: 0.8, type: 'flute' }, { note: scale.Ga, duration: 1.2, type: 'flute' }, { note: scale.Sa, duration: 2.0, type: 'harp' }]
        ];

        const phrase = melodyPhrases[this.currentNoteIndex % melodyPhrases.length];
        this.currentNoteIndex++;

        let phraseTimeOffset = 0;
        const now = this.ctx.currentTime;

        // Subtle background tanpura drone (Root Sa & Pa)
        this.playDroneNote(scale.Sa / 2, 6.0, 0.08);
        this.playDroneNote(scale.Pa / 2, 6.0, 0.05);

        phrase.forEach(item => {
            this.playInstrumentNote(item.note, now + phraseTimeOffset, item.duration, item.type);
            phraseTimeOffset += item.duration * 0.9;
        });

        // Loop next phrase after current finishes
        this.melodyTimeout = setTimeout(() => {
            this.playNextMelodyPhrase();
        }, phraseTimeOffset * 1000 + 400);
    }

    playDroneNote(freq, duration, gainLevel) {
        if (!this.isPlaying) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(gainLevel, now + 1.0);
        gain.gain.linearRampToValueAtTime(gainLevel * 0.8, now + duration - 1.0);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + duration + 0.1);
    }

    playInstrumentNote(freq, startTime, duration, type) {
        if (!this.isPlaying) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        if (type === 'flute') {
            // Bansuri flute / soft reed tone
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            // Subtle expressive pitch vibrato & bend
            osc.frequency.linearRampToValueAtTime(freq * 1.008, startTime + duration * 0.4);
            osc.frequency.linearRampToValueAtTime(freq, startTime + duration * 0.8);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(2500, startTime);

            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.linearRampToValueAtTime(0.16, startTime + 0.12);
            gain.gain.setValueAtTime(0.14, startTime + duration * 0.7);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        } else {
            // Royal harp / sitar pluck
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, startTime);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(3200, startTime);
            filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

            gain.gain.setValueAtTime(0.001, startTime);
            gain.gain.linearRampToValueAtTime(0.2, startTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 1.2);
        }

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration * 1.3);
    }

    updateMusicUI(isPlaying) {
        const btn = document.getElementById('music-toggle-btn');
        const waves = document.querySelectorAll('.sound-bar');
        if (btn) {
            if (isPlaying) {
                btn.classList.add('playing');
                btn.setAttribute('aria-label', 'Pause Royal Music');
                waves.forEach(w => w.classList.remove('paused'));
            } else {
                btn.classList.remove('playing');
                btn.setAttribute('aria-label', 'Play Royal Music');
                waves.forEach(w => w.classList.add('paused'));
            }
        }
    }
}

// Global instance
window.royalSound = new RoyalSoundEngine();


/* ==================== PARTICLES.JS ==================== */
// Interactive Canvas Particle System: Gold Stardust Flakes, Rose Petals, and Bokeh Sparks

class LuxuryParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000, radius: 120 };
        this.mode = 'all'; // 'petals', 'gold', 'all', 'none'
        this.width = 0;
        this.height = 0;
        this.animId = null;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        }, { passive: true });

        this.createParticles();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const count = window.innerWidth < 768 ? 35 : 70;

        for (let i = 0; i < count; i++) {
            const isPetal = Math.random() < 0.35;
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                type: isPetal ? 'petal' : 'gold',
                size: isPetal ? Math.random() * 9 + 6 : Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: Math.random() * 1.2 + (isPetal ? 0.6 : 0.4),
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.03,
                opacity: Math.random() * 0.7 + 0.3,
                sway: Math.random() * 2 + 1,
                swaySpeed: Math.random() * 0.02 + 0.01,
                swayOffset: Math.random() * Math.PI * 2,
                color: isPetal 
                    ? `rgba(${220 + Math.random() * 35}, ${40 + Math.random() * 40}, ${60 + Math.random() * 40}, `
                    : `rgba(${225 + Math.random() * 30}, ${185 + Math.random() * 40}, ${90 + Math.random() * 50}, `
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.mode !== 'none') {
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];

                if (this.mode === 'petals' && p.type !== 'petal') continue;
                if (this.mode === 'gold' && p.type !== 'gold') continue;

                // Move & sway
                p.y += p.speedY;
                p.angle += p.rotationSpeed;
                p.swayOffset += p.swaySpeed;
                p.x += p.speedX + Math.sin(p.swayOffset) * (p.type === 'petal' ? 0.8 : 0.3);

                // Mouse push away
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    if (dist > 0.001) {
                        p.x += (dx / dist) * force * 4;
                        p.y += (dy / dist) * force * 4;
                    }
                }

                // Wrap around edges
                if (p.y > this.height + 20) {
                    p.y = -20;
                    p.x = Math.random() * this.width;
                }
                if (p.x < -20) p.x = this.width + 20;
                if (p.x > this.width + 20) p.x = -20;

                // Draw
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.angle);

                if (p.type === 'petal') {
                    // Draw organic rose petal shape
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -p.size);
                    this.ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.7, p.size * 0.9, p.size * 0.7, 0, p.size);
                    this.ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.7, -p.size * 0.9, -p.size * 0.7, 0, -p.size);
                    this.ctx.fillStyle = p.color + (p.opacity * 0.8) + ')';
                    this.ctx.shadowColor = 'rgba(180, 20, 40, 0.4)';
                    this.ctx.shadowBlur = 4;
                    this.ctx.fill();
                } else {
                    // Draw sparkling golden star / glowing circle
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                    this.ctx.fillStyle = p.color + p.opacity + ')';
                    this.ctx.shadowColor = 'rgba(235, 195, 100, 0.8)';
                    this.ctx.shadowBlur = 8;
                    this.ctx.fill();
                }

                this.ctx.restore();
            }
        }

        this.animId = requestAnimationFrame(() => this.animate());
    }

    setMode(mode) {
        this.mode = mode;
    }
}


/* ==================== COUNTDOWN.JS ==================== */
// Accurate Live Countdown Timer with SVG Circular Progress Rings

class WeddingCountdown {
    constructor() {
        this.targetDate = new Date('2026-12-18T19:30:00+05:30'); // Default Muhurat Date
        this.daysEl = document.getElementById('count-days');
        this.hoursEl = document.getElementById('count-hours');
        this.minsEl = document.getElementById('count-mins');
        this.secsEl = document.getElementById('count-secs');

        this.ringDays = document.getElementById('ring-days');
        this.ringHours = document.getElementById('ring-hours');
        this.ringMins = document.getElementById('ring-mins');
        this.ringSecs = document.getElementById('ring-secs');

        this.totalDistance = this.targetDate.getTime() - new Date('2026-01-01T00:00:00+05:30').getTime();
        this.interval = null;

        this.init();
    }

    init() {
        this.update();
        this.interval = setInterval(() => this.update(), 1000);
    }

    setTargetDate(newDate) {
        this.targetDate = new Date(newDate);
        this.update();
    }

    update() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;

        if (distance < 0) {
            if (this.daysEl) this.daysEl.textContent = '00';
            if (this.hoursEl) this.hoursEl.textContent = '00';
            if (this.minsEl) this.minsEl.textContent = '00';
            if (this.secsEl) this.secsEl.textContent = '00';
            const statusEl = document.getElementById('countdown-status-text');
            if (statusEl) statusEl.textContent = '✨ Celebrating the Auspicious Day Today! ✨';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.daysEl) this.animateNumber(this.daysEl, days);
        if (this.hoursEl) this.animateNumber(this.hoursEl, hours);
        if (this.minsEl) this.animateNumber(this.minsEl, minutes);
        if (this.secsEl) this.animateNumber(this.secsEl, seconds);

        // Update SVG Progress Rings (Circumference = 2 * PI * r = 2 * 3.14159 * 42 = 263.89)
        const circumference = 263.89;
        if (this.ringDays) {
            const dayOffset = circumference - (Math.min(days, 365) / 365) * circumference;
            this.ringDays.style.strokeDashoffset = dayOffset;
        }
        if (this.ringHours) {
            const hrOffset = circumference - (hours / 24) * circumference;
            this.ringHours.style.strokeDashoffset = hrOffset;
        }
        if (this.ringMins) {
            const minOffset = circumference - (minutes / 60) * circumference;
            this.ringMins.style.strokeDashoffset = minOffset;
        }
        if (this.ringSecs) {
            const secOffset = circumference - (seconds / 60) * circumference;
            this.ringSecs.style.strokeDashoffset = secOffset;
        }
    }

    animateNumber(element, value) {
        const strVal = String(value).padStart(2, '0');
        if (element.textContent !== strVal) {
            element.textContent = strVal;
            element.classList.add('pulse-num');
            setTimeout(() => element.classList.remove('pulse-num'), 300);
        }
    }
}


/* ==================== ENVELOPE.JS ==================== */
// Royal 3D Envelope Unboxing & Wax Seal Interaction

class RoyalEnvelopeExperience {
    constructor() {
        this.overlay = document.getElementById('envelope-overlay');
        this.envelope = document.getElementById('royal-envelope');
        this.waxSeal = document.getElementById('wax-seal-btn');
        this.invitationCard = document.getElementById('envelope-inner-card');
        this.unboxed = false;

        this.init();
    }

    init() {
        if (!this.waxSeal || !this.overlay) return;

        // Wax seal click event
        this.waxSeal.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openEnvelope();
        });

        // Tap prompt button
        const tapBtn = document.getElementById('unseal-action-btn');
        if (tapBtn) {
            tapBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openEnvelope();
            });
        }
    }

    openEnvelope() {
        if (this.unboxed) return;
        this.unboxed = true;

        // 1. Play wax crack sound & harp chime
        if (window.royalSound) {
            window.royalSound.playWaxSealSound();
        }

        // 2. Animate wax seal cracking and breaking away
        this.waxSeal.classList.add('cracking');

        // 3. Trigger confetti & golden sparkles at seal position
        this.triggerWaxConfetti();

        // 4. Open envelope flap (3D rotate upwards)
        setTimeout(() => {
            if (this.envelope) {
                this.envelope.classList.add('open');
            }
        }, 300);

        // 5. Slide out the royal gold-bordered card upwards
        setTimeout(() => {
            if (this.invitationCard) {
                this.invitationCard.classList.add('extracted');
            }
        }, 700);

        // 6. Start ambient romantic music smoothly
        setTimeout(() => {
            if (window.royalSound && !window.royalSound.isPlaying) {
                window.royalSound.startAmbientMelody();
            }
        }, 1100);

        // 7. Fade out envelope overlay and reveal full interactive webpage
        setTimeout(() => {
            if (this.overlay) {
                this.overlay.classList.add('fade-out');
                setTimeout(() => {
                    this.overlay.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                    // Trigger entry animations for hero elements
                    document.dispatchEvent(new CustomEvent('envelopeOpened'));
                }, 900);
            }
        }, 2200);
    }

    triggerWaxConfetti() {
        const colors = ['#f3e5ab', '#dfba73', '#d4af37', '#e65c00', '#b31217', '#ffffff'];
        const count = 40;
        const rect = this.waxSeal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const container = document.createElement('div');
        container.className = 'wax-confetti-container';
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            const el = document.createElement('div');
            el.className = 'wax-particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 140 + 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance - 20;

            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.backgroundColor = color;
            el.style.left = `${centerX}px`;
            el.style.top = `${centerY}px`;
            el.style.setProperty('--tx', `${tx}px`);
            el.style.setProperty('--ty', `${ty}px`);
            el.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);

            container.appendChild(el);
        }

        setTimeout(() => {
            container.remove();
        }, 1500);
    }
}


/* ==================== RSVP.JS ==================== */
// Interactive RSVP System, Wishes Guestbook, and Personalized Digital Guest Pass Generator

class RSVPManager {
    constructor() {
        this.form = document.getElementById('wedding-rsvp-form');
        this.wishesWall = document.getElementById('wishes-container');
        this.guestPassModal = document.getElementById('guest-pass-modal');
        this.wishesModal = document.getElementById('post-wish-modal');
        this.wishesForm = document.getElementById('direct-wish-form');
        this.storageKey = 'zareqia_wedding_rsvps';
        this.wishesKey = 'zareqia_wedding_wishes';

        this.init();
    }

    init() {
        this.loadWishes();

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleRSVPSubmit(e));
        }

        if (this.wishesForm) {
            this.wishesForm.addEventListener('submit', (e) => this.handleWishSubmit(e));
        }

        // Attendance toggle handler
        const attendRadios = document.querySelectorAll('input[name="attendance"]');
        attendRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const attendingDetails = document.getElementById('attending-extra-details');
                if (attendingDetails) {
                    if (e.target.value === 'accept') {
                        attendingDetails.style.display = 'block';
                    } else {
                        attendingDetails.style.display = 'none';
                    }
                }
            });
        });
    }

    getRSVPs() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || [];
        } catch (e) {
            return [];
        }
    }

    getWishes() {
        try {
            const saved = localStorage.getItem(this.wishesKey);
            if (saved) return JSON.parse(saved);
        } catch (e) {}

        // Default initial wishes for warm community vibe
        return [
            {
                id: 1,
                name: 'The Kapoor Family',
                relation: "Groom's Extended Family",
                message: 'Wishing you both a lifetime of unyielding love, happiness, laughter and cherished memories! Looking forward to dancing at the Sangeet! ✨🥂',
                date: 'September 5, 2026',
                likes: 18,
                emoji: '💖'
            },
            {
                id: 2,
                name: 'Dr. Ananya & Siddharth Mehta',
                relation: "Bride's Best Friends",
                message: 'To the most radiant couple! May your journey together be as magical as your love story. Can’t wait to celebrate under the palace stars! 💫💍',
                date: 'September 6, 2026',
                likes: 24,
                emoji: '🥂'
            },
            {
                id: 3,
                name: 'Uncle Rajesh & Aunty Meenakshi',
                relation: 'Family Elders',
                message: 'Sada Suhagan Raho! May Lord Ganesha bless Aarav and Roshni with eternal health, boundless prosperity, and joyful companionship. 🙏🪔',
                date: 'September 7, 2026',
                likes: 31,
                emoji: '🪔'
            },
            {
                id: 4,
                name: 'Kabir & The College Squad',
                relation: "Aarav's Friends",
                message: 'Aarav is officially off the market! Roshni, you are getting the best guy. Sangeet dance floor is going to be ON FIRE! 🕺💃🔥',
                date: 'September 8, 2026',
                likes: 42,
                emoji: '🎉'
            }
        ];
        this.memoryWishes = null;
        this.memoryRSVPs = [];
    }

    saveWishes(wishes) {
        this.memoryWishes = wishes;
        try {
            localStorage.setItem(this.wishesKey, JSON.stringify(wishes));
        } catch (e) {}
    }

    loadWishes() {
        if (!this.wishesWall) return;
        const wishes = this.getWishes();
        this.wishesWall.innerHTML = '';

        wishes.forEach(item => {
            const card = document.createElement('div');
            card.className = 'wish-card glassmorphism';
            card.innerHTML = `
                <div class="wish-card-header">
                    <div class="wish-avatar">${item.emoji || '✨'}</div>
                    <div class="wish-meta">
                        <h4 class="wish-author">${this.escapeHTML(item.name)}</h4>
                        <span class="wish-relation">${this.escapeHTML(item.relation || 'Cherished Guest')} • ${item.date}</span>
                    </div>
                </div>
                <p class="wish-text">"${this.escapeHTML(item.message)}"</p>
                <div class="wish-card-footer">
                    <button class="wish-like-btn" onclick="window.rsvpManager.likeWish(${item.id})">
                        <span class="heart-icon">❤️</span> <span class="like-count" id="wish-like-${item.id}">${item.likes || 0}</span>
                    </button>
                    <span class="wish-badge">Auspicious Blessing</span>
                </div>
            `;
            this.wishesWall.appendChild(card);
        });
    }

    likeWish(id) {
        if (window.royalSound) window.royalSound.playClickSound();
        const wishes = this.getWishes();
        const wish = wishes.find(w => w.id === id);
        if (wish) {
            wish.likes = (wish.likes || 0) + 1;
            this.saveWishes(wishes);
            const countEl = document.getElementById(`wish-like-${id}`);
            if (countEl) countEl.textContent = wish.likes;
        }
    }

    handleRSVPSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);

        const name = formData.get('guestName') || 'Honored Guest';
        const email = formData.get('guestEmail') || '';
        const phone = formData.get('guestPhone') || '';
        const attendance = formData.get('attendance') || 'accept';
        const guestCount = formData.get('guestCount') || '1';
        const events = formData.getAll('events');
        const dietary = formData.get('dietary') || 'Standard Gourmet';
        const song = formData.get('songRequest') || '';
        const message = formData.get('blessingMessage') || '';

        const rsvpEntry = {
            id: Date.now(),
            name,
            email,
            phone,
            attendance,
            guestCount,
            events,
            dietary,
            song,
            message,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        // Save RSVP
        const rsvps = this.getRSVPs();
        rsvps.push(rsvpEntry);
        this.memoryRSVPs = rsvps;
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(rsvps));
        } catch (e) {}

        // If guest left a blessing message, add to Wishes Wall
        if (message.trim().length > 3) {
            const wishes = this.getWishes();
            wishes.unshift({
                id: Date.now(),
                name,
                relation: 'Royal Guest',
                message: message.trim(),
                date: 'Just now',
                likes: 1,
                emoji: '💌'
            });
            this.saveWishes(wishes);
            this.loadWishes();
        }

        // Play celebration audio & burst confetti
        if (window.royalSound) window.royalSound.playCelebrationChime();
        this.triggerGrandConfetti();

        // Show confirmation and generate Digital Guest Pass
        this.showDigitalGuestPass(rsvpEntry);
        this.form.reset();
    }

    handleWishSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('wish-name-input').value || 'Well Wisher';
        const relation = document.getElementById('wish-relation-input').value || 'Friend & Family';
        const message = document.getElementById('wish-text-input').value || '';
        const emoji = document.getElementById('wish-emoji-select')?.value || '🌸';

        if (!message.trim()) return;

        const wishes = this.getWishes();
        wishes.unshift({
            id: Date.now(),
            name,
            relation,
            message: message.trim(),
            date: 'Just now',
            likes: 1,
            emoji
        });
        this.saveWishes(wishes);
        this.loadWishes();

        if (window.royalSound) window.royalSound.playCelebrationChime();
        this.triggerGrandConfetti();

        // Close modal
        const modal = document.getElementById('wishes-modal');
        if (modal) modal.classList.remove('active');
        this.wishesForm.reset();
    }

    showDigitalGuestPass(data) {
        if (!this.guestPassModal) return;

        const passCard = document.getElementById('pass-card-content');
        if (passCard) {
            const isAttending = data.attendance === 'accept';
            passCard.innerHTML = `
                <div class="royal-pass-badge">👑 Royal Guest Pass</div>
                <div class="royal-pass-crest">A & R</div>
                <h3 class="pass-guest-name">${this.escapeHTML(data.name)}</h3>
                <p class="pass-status ${isAttending ? 'attending' : 'declined'}">
                    ${isAttending ? '✨ Joyfully Attending ✨' : '💌 Blessings Sent with Regrets'}
                </p>
                <div class="pass-details-grid">
                    <div class="pass-item">
                        <span class="pass-label">Guests Admitted</span>
                        <span class="pass-val">${data.guestCount} Member(s)</span>
                    </div>
                    <div class="pass-item">
                        <span class="pass-label">Table / Access</span>
                        <span class="pass-val">Royal Banquet Section</span>
                    </div>
                    <div class="pass-item">
                        <span class="pass-label">Dietary Preference</span>
                        <span class="pass-val">${this.escapeHTML(data.dietary)}</span>
                    </div>
                    <div class="pass-item">
                        <span class="pass-label">Venue</span>
                        <span class="pass-val">The Taj Mahal Palace, Mumbai</span>
                    </div>
                </div>
                <div class="pass-qr-container">
                    <div class="simulated-qr">
                        <div class="qr-pattern"></div>
                        <span class="qr-code-text">PASS-#${data.id.toString().slice(-6)}</span>
                    </div>
                    <p class="qr-subtext">Present this digital pass at the Welcome Concierge Desk</p>
                </div>
            `;
        }

        this.guestPassModal.classList.add('active');
    }

    triggerGrandConfetti() {
        const count = 70;
        const colors = ['#dfba73', '#d4af37', '#b31217', '#2e7d32', '#f3e5ab', '#ff4081', '#9c27b0'];
        const container = document.createElement('div');
        container.className = 'grand-confetti-container';
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            const c = document.createElement('div');
            c.className = 'grand-confetti-piece';
            c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            c.style.left = `${Math.random() * 100}vw`;
            c.style.top = '-20px';
            c.style.width = `${Math.random() * 10 + 6}px`;
            c.style.height = `${Math.random() * 14 + 8}px`;
            c.style.animationDuration = `${Math.random() * 2.5 + 2}s`;
            c.style.animationDelay = `${Math.random() * 0.5}s`;
            container.appendChild(c);
        }

        setTimeout(() => container.remove(), 5000);
    }

    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}


/* ==================== GALLERY.JS ==================== */
// Interactive Gallery Lightbox & Filter System

class LuxuryGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-card');
        this.filterBtns = document.querySelectorAll('.gallery-filter-btn');
        this.lightbox = document.getElementById('gallery-lightbox');
        this.lightboxImg = document.getElementById('lightbox-image');
        this.lightboxCaption = document.getElementById('lightbox-caption');
        this.lightboxIndex = document.getElementById('lightbox-index-text');
        this.closeBtn = document.getElementById('lightbox-close-btn');
        this.prevBtn = document.getElementById('lightbox-prev-btn');
        this.nextBtn = document.getElementById('lightbox-next-btn');

        this.imagesList = [];
        this.filteredImages = [];
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Collect all images
        this.galleryItems.forEach((card, index) => {
            const img = card.querySelector('img');
            const caption = card.querySelector('.gallery-card-title')?.textContent || 'Pre-Wedding Celebration';
            const category = card.getAttribute('data-category') || 'all';

            if (img) {
                this.imagesList.push({
                    src: img.src,
                    alt: img.alt,
                    caption: caption,
                    category: category,
                    element: card
                });

                card.addEventListener('click', () => {
                    this.openLightbox(index);
                });
            }
        });

        // Filters
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter');
                this.filterGallery(category);
            });
        });

        // Lightbox buttons
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.navigate(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.navigate(1));
        }

        // Close on background click
        if (this.lightbox) {
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });
        }

        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (!this.lightbox || !this.lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigate(-1);
            if (e.key === 'ArrowRight') this.navigate(1);
        });
        this.filteredImages = this.imagesList.slice();
    }

    filterGallery(category) {
        if (window.royalSound) window.royalSound.playClickSound();
        this.galleryItems.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
                card.style.display = 'block';
                card.classList.add('fade-in-item');
            } else {
                card.style.display = 'none';
            }
        });

        this.filteredImages = this.imagesList.filter(item =>
            category === 'all' || item.category === category
        );
    }

    openLightbox(index) {
        if (window.royalSound) window.royalSound.playClickSound();
        const clickedItem = this.imagesList[index];
        if (!clickedItem) return;
        const filteredIndex = this.filteredImages.indexOf(clickedItem);
        this.currentIndex = filteredIndex >= 0 ? filteredIndex : 0;
        this.updateLightboxContent();
        if (this.lightbox) {
            this.lightbox.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    closeLightbox() {
        if (window.royalSound) window.royalSound.playClickSound();
        if (this.lightbox) {
            this.lightbox.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    navigate(direction) {
        if (window.royalSound) window.royalSound.playClickSound();
        const listLength = this.filteredImages.length || this.imagesList.length;
        if (!listLength) return;
        this.currentIndex = (this.currentIndex + direction + listLength) % listLength;
        this.updateLightboxContent();
    }

    updateLightboxContent() {
        const item = this.filteredImages[this.currentIndex] || this.imagesList[this.currentIndex];
        if (!item) return;

        if (this.lightboxImg) {
            this.lightboxImg.src = item.src;
            this.lightboxImg.alt = item.alt;
        }
        if (this.lightboxCaption) {
            this.lightboxCaption.textContent = item.caption;
        }
        if (this.lightboxIndex) {
            this.lightboxIndex.textContent = `${this.currentIndex + 1} / ${this.filteredImages.length || this.imagesList.length}`;
        }
    }
}


/* ==================== APP.JS ==================== */
// Main Application Controller: Personalization, Calendar .ICS, WhatsApp Generator, Customizer & Theme

class WeddingApp {
    constructor() {
        this.guestName = '';
        this.theme = 'ivory'; // 'ivory' | 'midnight'
        this.isCustomizerUnlocked = false;
        this.customizerPasscode = '1314'; // Admin lock passcode
        this.init();
    }

    init() {
        this.detectGuestParam();
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupCalendarDownloads();
        this.setupModals();
        this.setupCustomizerLock();
        this.setupLiveCustomizer();
        this.setupWhatsAppShare();
        this.setupFAQAccordion();
        this.setupScrollAnimations();
    }

    // 1. Personalized Guest Recognition via URL query or hash param (works without server)
    detectGuestParam() {
        let guest = '';
        try {
            const urlParams = new URLSearchParams(window.location.search);
            guest = urlParams.get('guest') || urlParams.get('to');
            
            // Also check hash fragment for file:// protocol support (e.g. index.html#guest=Name)
            if (!guest && window.location.hash) {
                const hash = window.location.hash.substring(1);
                const hashParams = new URLSearchParams(hash);
                guest = hashParams.get('guest') || hashParams.get('to');
            }
        } catch (e) {}

        if (guest) {
            this.guestName = decodeURIComponent(guest).trim();
            this.applyGuestPersonalization(this.guestName);
        }
    }

    applyGuestPersonalization(name) {
        const banner = document.getElementById('personalized-guest-banner');
        const guestNameEls = document.querySelectorAll('.dynamic-guest-name');
        const rsvpNameInput = document.getElementById('guest-name-field');

        if (banner) {
            banner.style.display = 'block';
            banner.classList.add('fade-in-slide');
        }

        guestNameEls.forEach(el => {
            el.textContent = name;
        });

        if (rsvpNameInput && !rsvpNameInput.value) {
            rsvpNameInput.value = name;
        }

        const customWelcome = document.getElementById('custom-guest-welcome-msg');
        if (customWelcome) {
            customWelcome.innerHTML = `Dearest <strong>${this.escapeHTML(name)}</strong>, your presence will grace our celebration with boundless joy and blessings!`;
        }
    }

    // 2. Navigation & Smooth Scrolling
    setupNavigation() {
        const nav = document.getElementById('main-nav');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-nav-menu');

        // Scroll listener for sticky header styling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }
        });

        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    if (window.royalSound) window.royalSound.playClickSound();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (mobileMenu) {
                        mobileMenu.classList.remove('active');
                    }
                }
            });
        });

        // Mobile drawer
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                mobileMenu.classList.toggle('active');
            });
        }
    }

    // 3. Theme Toggle (Royal Ivory & Gold vs Imperial Midnight Navy & Gold)
    setupThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle-btn');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            if (window.royalSound) window.royalSound.playClickSound();
            document.body.classList.toggle('theme-midnight');
            const isMidnight = document.body.classList.contains('theme-midnight');
            toggleBtn.innerHTML = isMidnight ? '☀️ <span>Day Theme</span>' : '🌙 <span>Night Gala</span>';
            localStorage.setItem('zareqia_theme', isMidnight ? 'midnight' : 'ivory');
        });

        if (localStorage.getItem('zareqia_theme') === 'midnight') {
            document.body.classList.add('theme-midnight');
            toggleBtn.innerHTML = '☀️ <span>Day Theme</span>';
        }
    }

    // 4. Add to Google Calendar & Download .ICS Calendar File
    setupCalendarDownloads() {
        const calButtons = document.querySelectorAll('.add-to-calendar-btn');
        calButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.royalSound) window.royalSound.playClickSound();

                const eventTitle = btn.getAttribute('data-event-title') || 'Aarav & Roshni Royal Wedding Celebration';
                const eventDesc = btn.getAttribute('data-event-desc') || 'Join us to celebrate the royal wedding union of Aarav and Roshni at The Taj Mahal Palace, Mumbai.';
                const eventLoc = btn.getAttribute('data-event-location') || 'The Taj Mahal Palace, Mumbai, Maharashtra, India';
                const startDate = btn.getAttribute('data-event-start') || '20261218T193000';
                const endDate = btn.getAttribute('data-event-end') || '20261218T233000';

                // Prompt user for Google Calendar vs iCal (.ics)
                this.showCalendarChooser(eventTitle, eventDesc, eventLoc, startDate, endDate);
            });
        });
    }

    showCalendarChooser(title, desc, loc, start, end) {
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;

        // Trigger .ICS file generation
        const icsData = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Zareqia//Royal Wedding Invitation//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `SUMMARY:${title}`,
            `DESCRIPTION:${desc}`,
            `LOCATION:${loc}`,
            `DTSTART:${start}`,
            `DTEND:${end}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        // Optional alert/toast
        this.showToast('📅 Calendar invite (.ics) downloaded! Opening Google Calendar...');
        setTimeout(() => {
            window.open(googleUrl, '_blank');
        }, 600);
    }

    // 5. Modal Controllers
    setupModals() {
        const modalCloses = document.querySelectorAll('.modal-close-btn, .modal-backdrop');
        modalCloses.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (window.royalSound) window.royalSound.playClickSound();
                const modal = btn.closest('.royal-modal');
                if (modal) modal.classList.remove('active');
            });
        });

        // Shagun Modal
        const shagunBtn = document.getElementById('open-shagun-btn');
        const shagunModal = document.getElementById('shagun-modal');
        if (shagunBtn && shagunModal) {
            shagunBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                shagunModal.classList.add('active');
            });
        }

        // Wishes Post Modal
        const wishOpenBtn = document.getElementById('open-wish-modal-btn');
        const wishModal = document.getElementById('post-wish-modal');
        if (wishOpenBtn && wishModal) {
            wishOpenBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                wishModal.classList.add('active');
            });
        }

        // WhatsApp Share Hub Modal
        const shareBtn = document.getElementById('open-share-hub-btn');
        const shareModal = document.getElementById('share-hub-modal');
        if (shareBtn && shareModal) {
            shareBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                shareModal.classList.add('active');
            });
        }
    }

    // 6. Customizer Lock Controller (Protected: Passcode "1314")
    setupCustomizerLock() {
        const customizerBtn = document.getElementById('open-customizer-btn');
        const customizerModal = document.getElementById('customizer-modal');
        const lockModal = document.getElementById('customizer-lock-modal');
        const lockForm = document.getElementById('customizer-lock-form');
        const pinInput = document.getElementById('customizer-pin-input');
        const pinError = document.getElementById('customizer-pin-error');
        const lockBadge = document.getElementById('lock-badge-icon');
        const pinToggleBtn = document.getElementById('toggle-pin-visibility-btn');
        const lockCancelBtn = document.querySelector('.lock-cancel-btn');
        const relockBtn = document.getElementById('relock-customizer-btn');
        const navLockIcon = document.getElementById('nav-customizer-lock-icon');

        // Function to reset PIN modal state
        const resetLockModal = () => {
            if (pinInput) {
                pinInput.value = '';
                pinInput.type = 'password';
                pinInput.classList.remove('input-error');
            }
            if (pinToggleBtn) pinToggleBtn.textContent = '👁️';
            if (pinError) {
                pinError.style.display = 'none';
                pinError.textContent = '';
            }
            if (lockBadge) {
                lockBadge.textContent = '🔒';
                lockBadge.classList.remove('unlocked');
            }
        };

        // Open Customizer directly if unlocked, otherwise trigger PIN passcode modal
        if (customizerBtn) {
            customizerBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                if (this.isCustomizerUnlocked) {
                    if (customizerModal) customizerModal.classList.add('active');
                } else {
                    resetLockModal();
                    if (lockModal) {
                        lockModal.classList.add('active');
                        setTimeout(() => pinInput?.focus(), 150);
                    }
                }
            });
        }

        // Cancel Lock Modal
        if (lockCancelBtn && lockModal) {
            lockCancelBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                lockModal.classList.remove('active');
            });
        }

        // Toggle PIN visibility (Password/Text)
        if (pinToggleBtn && pinInput) {
            pinToggleBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                if (pinInput.type === 'password') {
                    pinInput.type = 'text';
                    pinToggleBtn.textContent = '🙈';
                } else {
                    pinInput.type = 'password';
                    pinToggleBtn.textContent = '👁️';
                }
            });
        }

        // Passcode Submission & Verification (Matches "1314")
        if (lockForm && pinInput) {
            lockForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const enteredPin = pinInput.value.trim();

                if (enteredPin === this.customizerPasscode) {
                    // Success: Passcode 1314 matched
                    this.isCustomizerUnlocked = true;
                    if (navLockIcon) navLockIcon.textContent = '🔓';
                    if (lockBadge) {
                        lockBadge.textContent = '🔓';
                        lockBadge.classList.add('unlocked');
                    }
                    if (pinError) pinError.style.display = 'none';

                    if (window.royalSound) {
                        if (typeof window.royalSound.playCelebrationChime === 'function') {
                            window.royalSound.playCelebrationChime();
                        } else {
                            window.royalSound.playClickSound();
                        }
                    }

                    this.showToast('✨ Passcode Verified! Customizer Unlocked.');

                    setTimeout(() => {
                        if (lockModal) lockModal.classList.remove('active');
                        if (customizerModal) customizerModal.classList.add('active');
                    }, 400);

                } else {
                    // Failure: Invalid Passcode
                    if (window.royalSound) {
                        if (typeof window.royalSound.playErrorSound === 'function') {
                            window.royalSound.playErrorSound();
                        } else {
                            window.royalSound.playClickSound();
                        }
                    }

                    pinInput.classList.add('input-error');
                    if (pinError) {
                        pinError.style.display = 'flex';
                        pinError.textContent = '❌ Incorrect PIN! Access Denied (Passcode: 1314)';
                    }

                    setTimeout(() => {
                        pinInput.classList.remove('input-error');
                        pinInput.value = '';
                        pinInput.focus();
                    }, 550);
                }
            });
        }

        // Relock Customizer
        if (relockBtn) {
            relockBtn.addEventListener('click', () => {
                if (window.royalSound) window.royalSound.playClickSound();
                this.isCustomizerUnlocked = false;
                if (navLockIcon) navLockIcon.textContent = '🔒';
                if (customizerModal) customizerModal.classList.remove('active');
                this.showToast('🔒 Customizer locked successfully.');
            });
        }
    }

    // 7. Live Customizer (Allows live editing of couple names, wedding date, venue, and colors)
    setupLiveCustomizer() {
        const form = document.getElementById('live-customizer-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const groomName = document.getElementById('edit-groom-name').value || 'Aarav';
            const brideName = document.getElementById('edit-bride-name').value || 'Roshni';
            const weddingDate = document.getElementById('edit-wedding-date').value || '2026-12-18';
            const venueName = document.getElementById('edit-venue-name').value || 'The Taj Mahal Palace, Mumbai';

            // Update Couple Names across webpage
            document.querySelectorAll('.couple-groom-text').forEach(el => el.textContent = groomName);
            document.querySelectorAll('.couple-bride-text').forEach(el => el.textContent = brideName);
            document.querySelectorAll('.couple-monogram-text').forEach(el => el.textContent = `${groomName[0]} & ${brideName[0]}`);
            document.querySelectorAll('.wedding-venue-text').forEach(el => el.textContent = venueName);

            // Update Countdown
            if (window.weddingCountdown && weddingDate) {
                window.weddingCountdown.setTargetDate(weddingDate + 'T19:30:00+05:30');
            }

            // Close modal & toast
            document.getElementById('customizer-modal')?.classList.remove('active');
            this.showToast('✨ Invitation personalized successfully in real time!');
            if (window.royalSound) window.royalSound.playCelebrationChime();
        });
    }

    // 8. WhatsApp Share Link Generator
    setupWhatsAppShare() {
        const genBtn = document.getElementById('gen-whatsapp-link-btn');
        const guestInput = document.getElementById('whatsapp-guest-input');
        const previewEl = document.getElementById('whatsapp-preview-link');
        const copyBtn = document.getElementById('copy-whatsapp-link-btn');
        const openWABtn = document.getElementById('open-whatsapp-direct-btn');

        if (genBtn && guestInput) {
            genBtn.addEventListener('click', () => {
                const name = guestInput.value.trim() || 'Valued Guest';
                let baseUrl = window.location.href.split('?')[0].split('#')[0];
                if (baseUrl.startsWith('file:///')) {
                    // For file sharing preview
                    baseUrl = window.location.href.split('?')[0].split('#')[0];
                }
                const shareUrl = `${baseUrl}?guest=${encodeURIComponent(name)}`;
                const message = `✨ *Wedding Invitation* ✨%0A%0ADear *${encodeURIComponent(name)}*,%0A%0ATogether with our families, we joyfully invite you to celebrate our wedding ceremony and auspicious festivities!%0A%0A💍 *Aarav & Roshni*%0A📅 *December 18, 2026*%0A📍 *The Taj Mahal Palace, Mumbai*%0A%0APlease open your personalized digital invitation card here:%0A🔗 ${encodeURIComponent(shareUrl)}`;

                if (previewEl) previewEl.textContent = shareUrl;
                if (openWABtn) {
                    openWABtn.href = `https://api.whatsapp.com/send?text=${message}`;
                    openWABtn.style.display = 'inline-flex';
                }
                if (copyBtn) {
                    copyBtn.style.display = 'inline-flex';
                    copyBtn.onclick = () => {
                        navigator.clipboard.writeText(shareUrl);
                        this.showToast('📋 Personalized link copied to clipboard!');
                    };
                }
            });
        }
    }

    // 9. FAQ Accordion
    setupFAQAccordion() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const header = item.querySelector('.faq-header');
            if (header) {
                header.addEventListener('click', () => {
                    if (window.royalSound) window.royalSound.playClickSound();
                    const isOpen = item.classList.contains('active');
                    items.forEach(i => i.classList.remove('active'));
                    if (!isOpen) item.classList.add('active');
                });
            }
        });
    }

    // 10. Scroll Reveal Animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }

    showToast(message) {
        let toast = document.getElementById('royal-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'royal-toast';
            toast.className = 'royal-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3500);
    }

    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}


/* ==================== SINGLE INITIALIZER ==================== */
document.addEventListener('DOMContentLoaded', () => {
    // Keep initialization in a predictable order: audio first, then visual/feature modules.
    window.luxuryParticles = new LuxuryParticleSystem('luxury-particles-canvas');
    window.weddingCountdown = new WeddingCountdown();
    window.royalEnvelope = new RoyalEnvelopeExperience();
    window.rsvpManager = new RSVPManager();
    window.luxuryGallery = new LuxuryGallery();
    window.weddingApp = new WeddingApp();
});
