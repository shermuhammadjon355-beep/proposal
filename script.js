/**
 * 🌹 FOREVER WITH YOU — ROMANTIC PROPOSAL WEB APP
 * Seamless Single-Stage Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preload all cutscene images immediately for zero-delay instant transitions
  const cutsceneAssetSources = [
    'images/girl and boy face to face.png',
    'images/propose.png',
    'images/hug.png',
    'images/couple-happy.png'
  ];
  cutsceneAssetSources.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // ======================================================
  // 1. CUSTOM CURSOR & FLOATING HEARTS
  // ======================================================
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let lastHeartTime = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }
    const now = Date.now();
    if (now - lastHeartTime > 180) {
      spawnCursorHeart(e.clientX, e.clientY);
      lastHeartTime = now;
    }
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;
    if (cursor) {
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const heartChars = ['♥', '💕', '💖', '✨', '🌹', '💗', '💫'];
  function spawnCursorHeart(x, y) {
    const h = document.createElement('div');
    h.className = 'heart-cursor';
    h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    h.style.left = (x + Math.random() * 24 - 12) + 'px';
    h.style.top = (y + Math.random() * 24 - 12) + 'px';
    h.style.fontSize = (Math.random() * 12 + 12) + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1200);
  }

  // ======================================================
  // 2. WEB AUDIO PROCEDURAL ROMANTIC SYNTHESIZER
  // ======================================================
  let audioCtx = null;
  let audioEnabled = false;
  let melodyInterval = null;
  const soundBtn = document.getElementById('soundBtn');
  const soundIcon = document.getElementById('soundIcon');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.6, gainLevel = 0.12, delay = 0) {
    if (!audioEnabled || !audioCtx) return;
    setTimeout(() => {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        console.warn(e);
      }
    }, delay * 1000);
  }

  function playChime() {
    if (!audioEnabled) return;
    playTone(523.25, 'sine', 0.8, 0.15, 0);
    playTone(659.25, 'sine', 0.9, 0.18, 0.12);
    playTone(783.99, 'triangle', 1.1, 0.2, 0.24);
    playTone(1046.50, 'sine', 1.5, 0.22, 0.36);
  }

  function playCelebrationFanfare() {
    if (!audioEnabled) return;
    const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chord.forEach((freq, idx) => {
      playTone(freq, 'triangle', 3.0, 0.25, idx * 0.12);
    });
  }

  const ambientNotes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25];
  function startAmbientChimes() {
    if (melodyInterval) clearInterval(melodyInterval);
    melodyInterval = setInterval(() => {
      if (audioEnabled) {
        const note = ambientNotes[Math.floor(Math.random() * ambientNotes.length)];
        playTone(note, 'sine', 2.0, 0.06, 0);
      }
    }, 2800);
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      soundIcon.textContent = audioEnabled ? '💖' : '🎵';
      soundBtn.classList.toggle('active', audioEnabled);
      if (audioEnabled) {
        playChime();
        startAmbientChimes();
      } else {
        if (melodyInterval) clearInterval(melodyInterval);
      }
    });
  }

  // ======================================================
  // 3. SINGLE-STAGE SEAMLESS VIEW TRANSITIONS
  // ======================================================
  const btnStartProposal = document.getElementById('btnStartProposal');
  const viewIntro = document.getElementById('viewIntro');
  const viewProposal = document.getElementById('viewProposal');

  if (btnStartProposal) {
    btnStartProposal.addEventListener('click', () => {
      initAudio();
      playTone(587.33, 'sine', 0.35, 0.08);

      if (viewIntro && viewProposal) {
        viewIntro.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        viewIntro.style.opacity = '0';
        viewIntro.style.transform = 'scale(0.96)';

        setTimeout(() => {
          viewIntro.style.display = 'none';
          viewProposal.style.display = 'flex';
          viewProposal.style.opacity = '0';
          viewProposal.style.transform = 'scale(0.98)';
          viewProposal.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

          requestAnimationFrame(() => {
            viewProposal.style.opacity = '1';
            viewProposal.style.transform = 'scale(1)';
            startProposalCutscene();
          });
        }, 450);
      }
    });
  }

  // Reveal observer for fade-in elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.01, rootMargin: '100px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }, 250);

  // ======================================================
  // 4. PROGRESSIVE FALLING ROSE PETALS GENERATOR
  // ======================================================
  const petalColors = [
    'radial-gradient(ellipse at 30% 30%, #fecdd9, #f43f6e)',
    'radial-gradient(ellipse at 30% 30%, #ffd6e0, #fb7194)',
    'radial-gradient(ellipse at 30% 30%, #fff1f4, #e11d53)',
    'radial-gradient(ellipse at 30% 30%, #fae2a8, #f0b643)',
  ];
  const petalsContainer = document.getElementById('petalsContainer');

  function spawnPetal(initialDelay = 0) {
    if (!petalsContainer) return;
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = (Math.random() * 96 + 2) + 'vw';
    const duration = (Math.random() * 3 + 4.2);
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = initialDelay + 's';
    p.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    p.style.width = (Math.random() * 12 + 10) + 'px';
    p.style.height = (Math.random() * 14 + 12) + 'px';
    p.style.opacity = Math.random() * 0.35 + 0.55;
    petalsContainer.appendChild(p);

    setTimeout(() => {
      if (p.parentNode) p.remove();
    }, (duration + initialDelay + 0.5) * 1000);
  }

  if (petalsContainer) {
    spawnPetal(0);
    spawnPetal(1.2);
    setInterval(() => {
      const activePetals = petalsContainer.querySelectorAll('.petal').length;
      if (activePetals < 18) {
        spawnPetal(0);
      }
    }, 1100);
  }

  // ======================================================
  // 5. PROPOSAL PARTICLES & DIALOGUE CUTSCENE LOGIC
  // ======================================================
  const proposalParticles = document.getElementById('proposalParticles');
  const propParticleIcons = ['💖', '✨', '🌹', '🌸', '💫', '♥'];
  if (proposalParticles) {
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('span');
      p.className = 'proposal-particle';
      p.textContent = propParticleIcons[Math.floor(Math.random() * propParticleIcons.length)];
      p.style.left = (Math.random() * 94 + 3) + '%';
      p.style.top = (Math.random() * 85 + 8) + '%';
      p.style.fontSize = (Math.random() * 14 + 10) + 'px';
      p.style.animationDuration = (Math.random() * 1.5 + 2.0) + 's';
      p.style.animationDelay = (Math.random() * 2.5) + 's';
      proposalParticles.appendChild(p);
    }
  }

  const proposalStoryImg = document.getElementById('proposalStoryImg');
  const proposalStoryBadge = document.getElementById('proposalStoryBadge');
  const charSpeechBubble = document.getElementById('charSpeechBubble');
  const speakerAvatar = document.getElementById('speakerAvatar');
  const speakerName = document.getElementById('speakerName');
  const dialogueText = document.getElementById('dialogueText');

  const phase1Action = document.getElementById('phase1Action');
  const phase2Action = document.getElementById('phase2Action');
  const phase3Action = document.getElementById('phase3Action');
  const phase4Action = document.getElementById('phase4Action');

  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const btnNextDialogue = document.getElementById('btnNextDialogue');
  const nextDialogueText = document.getElementById('nextDialogueText');
  const girlReplyContainer = document.getElementById('girlReplyContainer');
  const girlReplyInput = document.getElementById('girlReplyInput');
  const btnSendReply = document.getElementById('btnSendReply');
  const replyPills = document.querySelectorAll('.reply-pill');
  const dodgeTooltip = document.getElementById('dodgeTooltip');
  let currentDialogueIdx = 0;

  const conversationDialogue = [
    {
      speaker: 'Yigit',
      avatar: '👦',
      text: '"**... *"Bu his-tuyg‘ularimni uzoq vaqtdan beri yuragimda yashirib kelardim... Bugun shunchaki bularni senga aytishim juda kerak edi 💕"**"',
      badge: '💫 Opening My Heart To You',
      img: 'images/girl and boy face to face.png',
      isLeft: true,
      btnText: 'Yana bor 💕'
    },
    {
      speaker: 'Qiz',
      avatar: '👧',
      text: '"I... I was actually hoping you\'d say something... 😊✨"',
      badge: '🌸 A Shy Blush & Mutual Spark',
      img: 'images/girl and boy face to face.png',
      isLeft: false,
      btnText: 'See What He Says Next 💌'
    },
    {
      speaker: 'Yigit',
      avatar: '👦',
      text: '"Seeing your response gives me all the courage I need. There\'s just one thing I want to ask you... 🌹"',
      badge: '💍 Taking The Golden Step',
      img: 'images/girl and boy face to face.png',
      isLeft: true,
      btnText: 'See His Question 💍'
    }
  ];

  function setCutsceneImage(imgSrc, isProposalPhase = false, callback = null) {
    if (!proposalStoryImg) return;
    proposalStoryImg.classList.remove('img-proposal-enter');
    proposalStoryImg.classList.add('img-switching');

    const heroFrame = document.getElementById('proposalHeroFrame');

    setTimeout(() => {
      proposalStoryImg.src = imgSrc;

      const triggerReveal = () => {
        proposalStoryImg.classList.remove('img-switching');
        if (isProposalPhase) {
          proposalStoryImg.classList.add('img-proposal-enter');
          if (heroFrame) heroFrame.classList.add('proposal-active');
        } else {
          if (heroFrame) heroFrame.classList.remove('proposal-active');
        }
        if (callback) callback();
      };

      if (proposalStoryImg.complete) {
        triggerReveal();
      } else {
        proposalStoryImg.onload = triggerReveal;
      }
    }, 280);
  }

  function triggerDialogueTyping(text, callback) {
    if (!dialogueText) return;
    dialogueText.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
      dialogueText.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(iv);
        if (callback) callback();
      }
    }, 22);
  }

  function submitGirlReply(customText) {
    const textToUse = customText && customText.trim() ? customText.trim() : "I... I was actually hoping you'd say something... 😊✨";
    const formattedText = textToUse.startsWith('"') ? textToUse : `"${textToUse}"`;
    conversationDialogue[1].text = formattedText;

    if (girlReplyContainer) girlReplyContainer.style.display = 'none';
    currentDialogueIdx = 1;
    renderDialogueStep(1);
  }

  function renderDialogueStep(stepIdx) {
    if (stepIdx >= conversationDialogue.length) {
      if (charSpeechBubble) {
        charSpeechBubble.style.opacity = '0';
        charSpeechBubble.style.transform = 'scale(0.9) translateY(-10px)';
        setTimeout(() => {
          charSpeechBubble.style.display = 'none';
          charSpeechBubble.style.pointerEvents = 'none';
        }, 300);
      }

      if (proposalStoryBadge) {
        proposalStoryBadge.textContent = '✨ A Question From My Heart 💖';
        proposalStoryBadge.style.background = 'rgba(255, 250, 252, 0.98)';
        proposalStoryBadge.style.color = '#7a123b';
        proposalStoryBadge.style.borderColor = 'var(--gold-300)';
        proposalStoryBadge.style.boxShadow = '0 4px 18px rgba(225, 29, 83, 0.15), var(--glow-gold-lg)';
      }

      setCutsceneImage('images/propose.png', true, () => {
        playTone(783.99, 'sine', 0.6, 0.12);
        if (phase1Action) phase1Action.style.display = 'none';
        if (phase2Action) {
          phase2Action.style.display = 'flex';
          phase2Action.style.opacity = '0';
          phase2Action.style.transform = 'translateY(16px)';
          phase2Action.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
          requestAnimationFrame(() => {
            phase2Action.style.opacity = '1';
            phase2Action.style.transform = 'translateY(0)';
          });
        }
      });
      return;
    }

    if (btnNextDialogue) {
      btnNextDialogue.style.display = 'inline-flex';
      btnNextDialogue.style.visibility = 'hidden';
      btnNextDialogue.style.opacity = '0';
      btnNextDialogue.style.pointerEvents = 'none';
    }
    if (girlReplyContainer) girlReplyContainer.style.display = 'none';

    const data = conversationDialogue[stepIdx];
    speakerAvatar.textContent = data.avatar;
    speakerName.textContent = data.speaker;
    proposalStoryBadge.textContent = data.badge;

    if (charSpeechBubble) {
      charSpeechBubble.style.display = 'flex';
      charSpeechBubble.style.opacity = '1';
      charSpeechBubble.style.pointerEvents = 'auto';
      if (data.isLeft) {
        charSpeechBubble.classList.remove('bubble-right');
        charSpeechBubble.classList.add('bubble-left');
      } else {
        charSpeechBubble.classList.remove('bubble-left');
        charSpeechBubble.classList.add('bubble-right');
      }
    }

    triggerDialogueTyping(data.text, () => {
      if (btnNextDialogue) {
        if (nextDialogueText) nextDialogueText.textContent = data.btnText;
        btnNextDialogue.style.visibility = 'visible';
        btnNextDialogue.style.opacity = '1';
        btnNextDialogue.style.pointerEvents = 'auto';
      }
    });

    initAudio();
    playTone(data.isLeft ? 523.25 : 659.25, 'sine', 0.3, 0.06);
  }

  function startProposalCutscene() {
    currentDialogueIdx = 0;
    if (phase1Action) phase1Action.style.display = 'flex';
    renderDialogueStep(0);
  }

  if (btnNextDialogue) {
    btnNextDialogue.addEventListener('click', () => {
      initAudio();
      playTone(587.33, 'sine', 0.3, 0.06);

      if (currentDialogueIdx === 0) {
        btnNextDialogue.style.display = 'none';
        if (girlReplyContainer) girlReplyContainer.style.display = 'flex';
        if (girlReplyInput) girlReplyInput.focus();
      } else {
        currentDialogueIdx++;
        renderDialogueStep(currentDialogueIdx);
      }
    });
  }

  if (btnSendReply) {
    btnSendReply.addEventListener('click', () => {
      initAudio();
      playTone(659.25, 'sine', 0.3, 0.08);
      const val = girlReplyInput ? girlReplyInput.value : '';
      submitGirlReply(val);
    });
  }

  if (girlReplyInput) {
    girlReplyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        initAudio();
        playTone(659.25, 'sine', 0.3, 0.08);
        submitGirlReply(girlReplyInput.value);
      }
    });
  }

  replyPills.forEach(pill => {
    pill.addEventListener('click', () => {
      initAudio();
      playTone(659.25, 'sine', 0.3, 0.08);
      const replyVal = pill.getAttribute('data-reply');
      if (girlReplyInput) girlReplyInput.value = replyVal;
      submitGirlReply(replyVal);
    });
  });

  // Witty & sweet dodge messages for the NO button
const dodgePhrases = [
  "Qanday qilib yo‘q deya olasan? 😉💖",
  "Maxsus insonim uchun «Yo‘q» varianti ishlamaydi! ✨",
  "Xatolik 404: «YO‘Q» tugmasi vaqtincha ishlamayapti! 🌹",
  "«Yo‘q» tugmasi yordamida qanday qilib yo‘q deya olasan? 😉",
     "«No» tugmasi yordamida qanday qilib yo‘q deya olasan? 😉"
];
   
  let dodgeIndex = 0;
  let yesScale = 0.75;
  let dodgeTimeout = null;

  const safeDodgePositions = [
    { x: 85, y: -45 },
    { x: 125, y: 30 },
    { x: 75, y: 70 },
    { x: 140, y: -25 },
    { x: -160, y: -65 },
    { x: -170, y: 65 },
    { x: 105, y: -75 },
    { x: 145, y: 55 },
    { x: -155, y: -75 },
    { x: 115, y: 15 }
  ];

  function dodgeNoButton(e) {
    if (e) e.preventDefault();
    initAudio();
    playTone(392.00, 'sine', 0.2, 0.05);

    yesScale = Math.min(1.48, yesScale + 0.07);
    if (btnYes) {
      btnYes.style.setProperty('--yes-scale', yesScale);
    }

    const pos = safeDodgePositions[dodgeIndex % safeDodgePositions.length];
    const randomOffsetX = pos.x + (Math.random() * 16 - 8);
    const randomOffsetY = pos.y + (Math.random() * 14 - 7);

    btnNo.style.transform = `translate(${randomOffsetX}px, ${randomOffsetY}px)`;

    if (dodgeTooltip) {
      dodgeTooltip.classList.remove('visible');
      void dodgeTooltip.offsetWidth;
      dodgeTooltip.textContent = dodgePhrases[dodgeIndex % dodgePhrases.length];
      dodgeTooltip.classList.add('visible');
    }
    dodgeIndex++;

    if (dodgeTimeout) clearTimeout(dodgeTimeout);
    dodgeTimeout = setTimeout(() => {
      if (dodgeTooltip) dodgeTooltip.classList.remove('visible');
    }, 3400);
  }

  if (btnNo) {
    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', dodgeNoButton, { passive: false });
    btnNo.addEventListener('click', dodgeNoButton);
  }

  function triggerGrandCelebration(e) {
    const clickX = e && e.clientX ? e.clientX : window.innerWidth / 2;
    const clickY = e && e.clientY ? e.clientY : window.innerHeight / 2;

    const ring = document.createElement('div');
    ring.className = 'celebration-ring';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 1400);

    const celebrationIcons = ['💖', '💕', '✨', '🌹', '🌸', '💫', '🎆', '💓', '🎉', '🥂', '💝'];
    for (let i = 0; i < 38; i++) {
      const p = document.createElement('div');
      p.className = 'celebration-burst-particle';
      p.textContent = celebrationIcons[Math.floor(Math.random() * celebrationIcons.length)];
      p.style.left = clickX + 'px';
      p.style.top = clickY + 'px';
      p.style.fontSize = (Math.random() * 18 + 18) + 'px';

      const angle = (Math.PI * 2 / 38) * i + (Math.random() * 0.4 - 0.2);
      const distance = Math.random() * 220 + 110;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      p.style.setProperty('--tx', tx + 'px');
      p.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }

    triggerConfetti(document.getElementById('confettiContainer'));
  }

  // YES button click handler — She Said YES!
  if (btnYes) {
    btnYes.addEventListener('click', (e) => {
      initAudio();
      playCelebrationFanfare();
      triggerGrandCelebration(e);

      if (proposalStoryBadge) {
        proposalStoryBadge.textContent = '💖 She Said YES! 💕';
        proposalStoryBadge.style.opacity = '1';
      }

      setCutsceneImage('images/hug.png', true);

      if (phase2Action) {
        phase2Action.style.opacity = '0';
        phase2Action.style.transform = 'scale(0.95)';
        phase2Action.style.transition = 'all 0.35s ease';
        setTimeout(() => {
          phase2Action.style.display = 'none';
          if (phase3Action) {
            phase3Action.style.display = 'flex';
            phase3Action.style.opacity = '0';
            phase3Action.style.transform = 'translateY(12px)';
            phase3Action.style.transition = 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
            requestAnimationFrame(() => {
              phase3Action.style.opacity = '1';
              phase3Action.style.transform = 'translateY(0)';
            });
          }
        }, 350);
      }

      setTimeout(() => {
        if (phase3Action) {
          phase3Action.style.opacity = '0';
          phase3Action.style.transform = 'translateY(-10px)';
          phase3Action.style.transition = 'all 0.35s ease';
        }
        if (proposalStoryBadge) {
          proposalStoryBadge.style.opacity = '0';
          proposalStoryBadge.style.transition = 'opacity 0.35s ease';
        }

        setCutsceneImage('images/couple-happy.png', true, () => {
          if (proposalStoryBadge) {
            proposalStoryBadge.textContent = '✨ A Sweet New Beginning 🌸';
            proposalStoryBadge.style.opacity = '1';
          }
          if (phase3Action) phase3Action.style.display = 'none';

          if (phase4Action) {
            phase4Action.style.display = 'flex';
            phase4Action.style.opacity = '0';
            phase4Action.style.transform = 'translateY(14px)';
            phase4Action.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
            requestAnimationFrame(() => {
              phase4Action.style.opacity = '1';
              phase4Action.style.transform = 'translateY(0)';
            });
          }
        });
      }, 5500);
    });
  }

  const confettiColors = ['#fb7194', '#f43f6e', '#fae2a8', '#f0b643', '#ffffff', '#ffd6e0', '#e11d53'];
  function triggerConfetti(container) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 80; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      c.style.width = (Math.random() * 9 + 6) + 'px';
      c.style.height = (Math.random() * 9 + 6) + 'px';
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      c.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
      c.style.animationDelay = (Math.random() * 2.5) + 's';
      c.style.setProperty('--cx', (Math.random() * 90 - 45) + 'px');
      container.appendChild(c);
    }
  }
  // ======================================================
// LANGUAGE SWITCHER — UZ / EN
// ======================================================


const translations = {
  uz: {
    tagline: "Senga anchadan beri aytmoqchi bo‘lgan gapim bor",
    title: "Men uchun juda<br><span>qadrli inson uchun</span>",
    welcome: "Bir oz vaqt ajrat, yuragingni och va ichimdagi gaplarni senga aytishimga imkon ber...",
    start: "U senga nima demoqchi ekanini bil 💌",
    next: "Unga javob ber 💕",
    replyPlaceholder: "Javobingizni yozing... 😊",
    send: "Yuborish 💌",
    proposalTitle: "Men bilan birga bo‘lasanmi?",
    proposalSub: "Dunyodagi barcha sevgi hikoyalari ichida bizniki doimo men uchun eng qadrli bo‘ladi. 🌹",
    yes: "HA! 💖",
    yesSmall: "Butun qalbim bilan — HA! 🌹",
    no: "YO‘QQQQ",
    noText: "Qanday qilib yo‘q deya olasan? 😉💖",
    hug: "Bag‘ringda men o‘zimning abadiy uyimni topdim... Seni hech qachon qo‘yib yubormayman 💕"
  },

  en: {
    tagline: "There is something I've wanted to tell you for a long time",
    title: "For the person who is<br><span>very precious to me</span>",
    welcome: "Take a moment, open your heart, and let me share what's on my mind...",
    start: "Find out what he wants to tell you 💌",
    next: "Reply to him 💕",
    replyPlaceholder: "Write your reply... 😊",
    send: "Send 💌",
    proposalTitle: "Will you be with me?",
    proposalSub: "Of all the love stories in the world, ours will forever be my favorite. 🌹",
    yes: "YES! 💖",
    yesSmall: "With all my heart — YES! 🌹",
    no: "NOOOO",
    noText: "How can you say no? 😉💖",
    hug: "In your arms, I found my forever home... I'm never letting you go 💕"
  }
};

// ================================
// ROUND UZ / EN LANGUAGE TOGGLE
// ================================

const languageToggle = document.getElementById("languageToggle");
const languageText = document.getElementById("languageText");

let currentLanguage = "uz";

function updateLanguage(lang) {
  currentLanguage = lang;

  if (languageText) {
    languageText.textContent = lang.toUpperCase();
  }

  const t = translations[lang];

  document.querySelector(".tagline-badge span:nth-child(2)").textContent = t.tagline;
  document.querySelector(".opening-title").innerHTML = t.title;
  document.querySelector(".welcome-sub-desc").textContent = t.welcome;
  document.querySelector("#btnStartProposal span").textContent = t.start;

  document.querySelector("#girlReplyInput").placeholder = t.replyPlaceholder;
  document.querySelector("#btnSendReply span").textContent = t.send;

  document.querySelector("#proposalTitle").textContent = t.proposalTitle;
  document.querySelector("#proposalSub").textContent = `"${t.proposalSub}"`;

  document.querySelector("#btnYes span").textContent = t.yes;
  document.querySelector("#btnYes small").textContent = t.yesSmall;
  document.querySelector("#noText").textContent = t.no;

  document.querySelector("#dodgeTooltip").textContent = t.noText;
  document.querySelector(".hug-celebration-text").textContent = `"${t.hug}"`;

  conversationDialogue[0].text = lang === "uz"
    ? '"Bu his-tuyg‘ularimni uzoq vaqtdan beri yuragimda yashirib kelardim... Bugun shunchaki bularni senga aytishim juda kerak edi 💕"'
    : '"I\'ve been hiding these feelings inside my heart for so long... I just really needed to tell you today 💕"';

  conversationDialogue[0].badge = lang === "uz"
    ? "💫 Yuragimni senga ochyapman"
    : "💫 Opening My Heart To You";

  conversationDialogue[2].text = lang === "uz"
    ? '"Javobing menga kerakli barcha jasoratni berdi. Endi sendan so‘ramoqchi bo‘lgan bitta narsam bor... 🌹"'
    : '"Seeing your response gives me all the courage I need. There\'s just one thing I want to ask you... 🌹"';

  conversationDialogue[2].badge = lang === "uz"
    ? "💍 Yuragimdagi eng muhim qadam"
    : "💍 Taking The Golden Step";
}

languageToggle.addEventListener("click", () => {
  updateLanguage(currentLanguage === "uz" ? "en" : "uz");
});

updateLanguage("uz");

// ================================
// ROUND UZ / EN LANGUAGE TOGGLE
// ================================

// ================================
});
