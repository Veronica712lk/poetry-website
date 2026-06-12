// =====================================
// 🌿 STATE
// =====================================

let currentPage = "page2";
let i = 0;
let opened = false;
let leafIntervalStarted = false;

// =====================================
// 🌿 MUSIC + START EXPERIENCE
// =====================================

function startSite() {
  const music = document.getElementById("bgMusic");

  goToPage("page3");

  if (music) {
    music.volume = 0;

    const playPromise = music.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => fadeInAudio(music))
        .catch((err) => console.log("Music blocked:", err));
    }
  }
}

// =====================================
// 🌿 FADE IN AUDIO
// =====================================

function fadeInAudio(audio) {
  let v = 0;
  const target = 0.10;

  const interval = setInterval(() => {
    if (v < target) {
      v += 0.005;
      audio.volume = v;
    } else {
      clearInterval(interval);
    }
  }, 60);
}

// =====================================
// 🌿 PAGE SYSTEM
// =====================================

function goToPage(pageId) {
  const current = document.getElementById(currentPage);
  const next = document.getElementById(pageId);

  if (current) {
    current.style.opacity = 0;

    setTimeout(() => {
      current.style.display = "none";
    }, 250);
  }

  if (next) {
    next.style.display = "flex";

    setTimeout(() => {
      next.style.opacity = 1;
    }, 50);
  }

  currentPage = pageId;
}

// =====================================
// 🌿 INIT
// =====================================

window.onload = () => {
  const pages = document.querySelectorAll(".page");

  pages.forEach((p) => {
    if (p.id !== "page2") {
      p.style.display = "none";
      p.style.opacity = 0;
    }
  });

  const start = document.getElementById("page2");

  if (start) {
    start.style.display = "flex";
    start.style.opacity = 1;
  }
};

// =====================================
// 💌 ENVELOPE OPEN (CINEMATIC BUILDUP)
// =====================================

function openLetter() {
  const envelope = document.getElementById("envelope");

  if (opened) return;
  opened = true;

  // STEP 1: tension shake phase
  envelope.classList.add("pre-open");

  // STEP 2: micro delay (anticipation)
  setTimeout(() => {
    envelope.classList.remove("pre-open");
    envelope.classList.add("mid-open");

    // STEP 3: pressure pulse before opening
    triggerPulseEffect();

    // STEP 4: final open
    setTimeout(() => {
      envelope.classList.remove("mid-open");
      envelope.classList.add("open");

      // STEP 5: delay poem (so opening feels physical)
      setTimeout(() => {
        startPoem();
        startLeafFlow();
      }, 800);

    }, 600);

  }, 450);
}

// =====================================
// ✨ CINEMATIC PULSE EFFECT (NEW)
// =====================================

function triggerPulseEffect() {
  const envelope = document.getElementById("envelope");

  if (!envelope) return;

  // quick “breathing glow” burst
  envelope.classList.add("pulse");

  setTimeout(() => {
    envelope.classList.remove("pulse");
  }, 700);
}

// =====================================
// 🌸 POEM
// =====================================

const poem = `
I remember how you moved through life,
soft as rain that ends a night,
a quiet peace after noise and strain,
like the world felt gentle again.

You were color in empty space,
poetry in an everyday place,
a presence rare in a crowded room,
like spring that arrives too soon.

I still remember the way you’d speak,
turning simple days into something deep,
your thoughts would wander, far and wide,
then come back dancing side by side.

One moment serious, grounded and true,
next moment laughing out of the blue,
and somehow every word you said
felt like it stayed inside my head.

Your drawings spoke without a sound,
like quiet worlds you’d just found,
each line so sure, each shade so true,
like they were made to remember you.

And I admired it all in quiet ways.
I don’t let people in that fast,
I keep my distance, make it last.

And still beneath each mistake I made,
each moment that I wish would fade,
I’m still the one who smiled at you,
who read your words and felt them too.
  
It's still me.
  
I just wrote this to keep my word,
to say what maybe you never heard:
you were amazing through and through,
and I’m still glad I met you.
`;

function startPoem() {
  const target = document.getElementById("poemText");

  if (!target) return;

  target.innerHTML = "";
  i = 0;

  typeWriter();
}

// =====================================
// ✍️ TYPEWRITER (CINEMATIC)
// =====================================

function typeWriter() {
  const target = document.getElementById("poemText");

  if (!target) return;

  if (i < poem.length) {
    const char = poem.charAt(i);

    target.innerHTML += char;

    i++;

    let delay = 45;

    if (char === ",") delay = 140;
    if (char === ".") delay = 220;
    if (char === "\n") delay = 280;
    if (char === " ") delay = 25;

    setTimeout(typeWriter, delay);
  }
}

// =====================================
// 🍃 LEAF SYSTEM
// =====================================

function spawnLeaf() {
  const leafCount = 1;

  for (let i = 0; i < leafCount; i++) {
    const leaf = document.createElement("div");

    leaf.className = "leaf";
    leaf.innerHTML = "🍃";

    leaf.style.left = Math.random() * window.innerWidth + "px";
    leaf.style.animationDuration = 6 + Math.random() * 5 + "s";
    leaf.style.fontSize = 16 + Math.random() * 10 + "px";

    document.body.appendChild(leaf);

    setTimeout(() => leaf.remove(), 18000);
  }
}

function startLeafFlow() {
  if (leafIntervalStarted) return;

  leafIntervalStarted = true;
  setInterval(spawnLeaf, 2000);
}