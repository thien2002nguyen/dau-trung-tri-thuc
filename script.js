const $ = (id) => document.getElementById(id),
  menu = $("menu"),
  play = $("play"),
  finish = $("finish"),
  audio = $("bgm"),
  tickSound = $("tickSound"),
  applause = $("applauseSound");
let opened = new Set(),
  current = -1,
  currentBox = -1,
  phase = 0,
  remaining = 15,
  tick = null,
  soundOn = true;
let pool = [];
function shufflePool() {
  pool = questions.map((_, i) => i);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
}
shufflePool();
function tone(freq = 700, duration = 0.12) {
  if (!soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)(),
      o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.28, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    o.start();
    o.stop(ctx.currentTime + duration);
    setTimeout(() => ctx.close(), 400);
  } catch (e) {}
}
function stop() {
  clearInterval(tick);
  tick = null;
  tickSound.pause();
  tickSound.currentTime = 0;
}
function startTickSound() {
  if (!soundOn) return;
  tickSound.pause();
  tickSound.currentTime = 0;
  tickSound.volume = 0.85;
  tickSound.play().catch(() => {});
}
function stopApplause() {
  applause.pause();
  applause.currentTime = 0;
}
function playApplause() {
  if (!soundOn) return;
  stopApplause();
  applause.volume = 1;
  applause.play().catch(() => {});
}
function startBackground() {
  if (!soundOn) return;
  audio.volume = 0.65;
  audio.play().catch(() => {});
}
function screens(which) {
  [menu, play, finish].forEach((el) => el.classList.add("hidden"));
  which.classList.remove("hidden");
  $("app").classList.toggle("is-playing", which === play);
}
function gifts() {
  const holder = $("gifts");
  holder.innerHTML = "";
  questions.forEach((q, i) => {
    const b = document.createElement("button");
    b.className = "gift" + (opened.has(i) ? " opened" : "");
    b.innerHTML = `<span class="emoji">${opened.has(i) ? "✓" : "🎁"}</span><strong>HỘP ${String(i + 1).padStart(2, "0")}</strong>`;
    b.disabled = opened.has(i);
    b.onclick = () => load(i);
    holder.append(b);
  });
  $("progress").textContent = `${opened.size}/${questions.length}`;
  $("completed").textContent = `Đã mở ${opened.size}/${questions.length} hộp`;
}
function home() {
  stop();
  stopApplause();
  if (currentBox >= 0 && phase === 2) opened.add(currentBox);
  current = -1;
  currentBox = -1;
  gifts();
  screens(menu);
}
function load(i) {
  if (opened.has(i)) return;
  stop();
  stopApplause();
  startBackground();
  currentBox = i;
  current = i;
  phase = 0;
  remaining = 15;
  gifts();
  screens(play);
  const q = questions[current];
  $("number").textContent = `HỘP ${String(i + 1).padStart(2, "0")}`;
  $("category").textContent = {
    abcd: "TRẮC NGHIỆM ABCD",
    image: "ĐUỔI HÌNH BẮT CHỮ",
    truefalse: "ĐÚNG HAY SAI",
  }[q.type];
  $("question").textContent = q.question || "Quan sát hình ảnh và đoán từ khóa";
  $("timer").textContent = 15;
  updateClock(15);
  $("timer").classList.remove("danger");
  $("status").textContent = "Nhấn BẮT ĐẦU để chạy đồng hồ";
  $("action").textContent = "▶ BẮT ĐẦU 15 GIÂY";
  render(false);
  tone(550);
}
function render(reveal) {
  const q = questions[current],
    c = $("content");
  c.innerHTML = "";
  if (q.type === "abcd" || q.type === "truefalse") {
    const opts = q.type === "abcd" ? q.options : ["ĐÚNG", "SAI"],
      correct = q.type === "abcd" ? q.correct : q.correct ? 0 : 1;
    const wrap = document.createElement("div");
    wrap.className = "options" + (q.type === "truefalse" ? " tf" : "");
    opts.forEach((v, i) => {
      const item = document.createElement("div");
      item.className =
        "option" + (reveal ? (i === correct ? " correct" : " wrong") : "");
      const label =
        q.type === "abcd" ? `<span class="letter">${"ABCD"[i]}</span>` : "";
      item.innerHTML = label + "<span></span>";
      item.lastElementChild.textContent = v;
      wrap.append(item);
    });
    c.append(wrap);
  } else if (q.type === "image") {
    const wrap = document.createElement("div");
    wrap.className = "picture";
    const img = document.createElement("img");
    img.src = "assets/img/" + q.image;
    img.alt = "Hình ảnh câu đố";
    wrap.append(img);
    const letters = document.createElement("div");
    letters.className = "letters";
    // Each word is an indivisible unit: never split a word across rows.
    const words = q.answer.trim().split(/\s+/);
    const maxWord = Math.max(...words.map(w => [...w].length));
    const totalChars = words.reduce((n, w) => n + [...w].length, 0);
    letters.style.setProperty("--tile-count", String(totalChars));
    letters.style.setProperty("--max-word", String(maxWord));
    words.forEach((word) => {
      const wordBox = document.createElement("span");
      wordBox.className = "answer-word";
      [...word].forEach((ch) => {
        const t = document.createElement("span");
        t.className = "tile";
        t.textContent = reveal ? ch : "";
        wordBox.append(t);
      });
      letters.append(wordBox);
    });
    wrap.append(letters);
    c.append(wrap);
  }
}
function advance() {
  if (current < 0) return;
  if (phase === 0) {
    phase = 1;
    $("action").textContent = "✓ HIỆN ĐÁP ÁN";
    $("status").textContent = "Đồng hồ đang đếm ngược";
    tone(850);
    startTickSound();
    tick = setInterval(() => {
      remaining--;
      $("timer").textContent = remaining;
      updateClock(remaining);
      if (remaining <= 5) $("timer").classList.add("danger");
      if (remaining <= 0) {
        stop();
        $("status").textContent = "Hết giờ! Nhấn HIỆN ĐÁP ÁN";
        tone(300, 0.4);
      }
    }, 1000);
  } else if (phase === 1) {
    stop();
    phase = 2;
    render(true);
    $("status").textContent = "Đáp án đã được công bố";
    $("action").textContent = "↩ VỀ CHỌN HỘP QUÀ";
    tone(950, 0.2);
    playApplause();
  } else next();
}
function next() {
  if (phase !== 2) {
    $("status").textContent = "Hãy công bố đáp án trước khi quay lại chọn hộp";
    return;
  }
  home();
  if (opened.size === questions.length) screens(finish);
}
$("action").onclick = advance;
$("next").onclick = next;
$("back").onclick = home;
$("home").onclick = home;
$("again").onclick = () => {
  opened.clear();
  shufflePool();
  home();
};
$("reset").onclick = () => {
  opened.clear();
  shufflePool();
  home();
};
$("music").onclick = () => {
  soundOn = !soundOn;
  if (soundOn) {
    startBackground();
    if (phase === 1 && tick !== null) startTickSound();
  } else {
    audio.pause();
    tickSound.pause();
    tickSound.currentTime = 0;
    stopApplause();
  }
  $("music").textContent = soundOn ? "♫" : "♪";
  $("music").title = soundOn ? "Tắt toàn bộ âm thanh" : "Bật toàn bộ âm thanh";
  $("music").setAttribute("aria-label", $("music").title);
};
$("music").textContent = "♫";
$("music").title = "Tắt toàn bộ âm thanh";
$("music").setAttribute("aria-label", $("music").title);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.repeat) {
    e.preventDefault();
    if (!play.classList.contains("hidden")) advance();
    else if (!finish.classList.contains("hidden")) {
      $("again").click();
    }
  }
  if (e.code === "Escape") home();
  if (e.code === "ArrowRight" && !play.classList.contains("hidden")) next();
});
gifts();
screens(menu);

function updateClock(seconds) {
  const ring = document.getElementById("clockProgress");
  const face = document.getElementById("clockFace");
  if (!ring || !face) return;
  const fraction = Math.max(0, Math.min(1, seconds / 15));
  ring.style.strokeDashoffset = String(326.726 * (1 - fraction));
  face.classList.toggle("warning", seconds <= 5);
}
