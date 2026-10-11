/* game.js — the game layer.
   XP and levels · achievements · 8 hidden stars · Pixel Hunt mini-game ·
   unlockable accent colours · optional sound.
   Text and numbers live in SITE.game (content.js). Needs play.js loaded first.
   Optional: delete the <script src="js/game.js"> line in index.html to remove it. */
(function () {
  "use strict";

  const PF = window.PF;
  if (!PF) return;

  const S = typeof SITE !== "undefined" ? SITE : {};
  const FX = Object.assign({ game: true, stars: true, hunt: true }, S.effects || {});
  if (!FX.game) return;

  const G = S.game || {};
  const T = S.theme || {};
  const { reduced, esc, burst, rain } = PF;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------------------------------------------------------------
     Config
     --------------------------------------------------------------------- */
  const SECTIONS = ["top", "work", "results", "about", "experience", "contact"];
  const ACH = G.achievements || {};
  const XP = Object.assign({ section: 10, achievement: 25, star: 15, huntPerPoint: 3 }, G.xp || {});
  const HUNT_TARGET = G.huntTarget || 25;
  const HUNT_TIME = 20;
  const LEVELS = Array.isArray(G.levels) && G.levels.length && typeof G.levels[0] === "object" ? G.levels : [
    { name: "Newcomer", xp: 0 }, { name: "Explorer", xp: 40 }, { name: "Insider", xp: 110 },
    { name: "Regular", xp: 200 }, { name: "Collaborator", xp: 320 }, { name: "Legend", xp: 480 }
  ];
  const ORIGINAL = { name: "Original", light: T.accent || "#2f4bff", dark: (T.dark && T.dark.accent) || "#8b9bff", level: 1 };
  const ACCENTS = [ORIGINAL].concat(G.accents || []);

  /* Where the hidden stars live. sel = element to attach to, css = position inside it. */
  const SPOTS = !FX.stars ? [] : [
    { sel: ".brand",               css: "right:-18px;top:-8px",  s: 18 },
    { sel: ".hero-foot",           css: "left:46%;top:-14px",    s: 22 },
    { sel: "#work .sec-head",      css: "left:46%;top:6px",      s: 22 },
    { sel: ".card:nth-of-type(4)", css: "right:18px;top:18px",   s: 24 },
    { sel: "#results .sec-head",   css: "left:58%;top:0",        s: 22 },
    { sel: ".stat:nth-child(4)",   css: "right:6px;top:0",       s: 22 },
    { sel: "#experience .sec-head",css: "right:30%;top:10px",    s: 22 },
    { sel: ".foot .fine",          css: "right:0;top:-34px",     s: 22 }
  ];

  const STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.2 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>';

  /* ---------------------------------------------------------------------
     State (saved in the visitor's browser)
     --------------------------------------------------------------------- */
  const KEY = "pf-progress-v2", OLD = "pf-progress-v1";
  let st = { sections: [], ach: [], stars: [], xp: 0, best: 0, accent: "Original", sound: false, visits: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) st = Object.assign(st, JSON.parse(raw));
    else {
      const old = localStorage.getItem(OLD);               // carry progress over from the first version
      if (old) {
        const j = JSON.parse(old);
        st.sections = j.sections || [];
        st.ach = (j.ach || []).filter(id => ACH[id]);
        st.xp = st.sections.length * XP.section + st.ach.length * XP.achievement;
      }
    }
  } catch (e) {}
  try {
    if (!sessionStorage.getItem("pf-session")) { sessionStorage.setItem("pf-session", "1"); st.visits = (st.visits || 0) + 1; }
  } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };
  save();

  const levelIdx = xp => { let i = 0; LEVELS.forEach((l, n) => { if (xp >= l.xp) i = n; }); return i; };
  const lvl = () => levelIdx(st.xp);

  /* ---------------------------------------------------------------------
     Sound (off by default, visitor can switch it on)
     --------------------------------------------------------------------- */
  let ac = null;
  function ensureAudio() {
    if (!st.sound) return;
    if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = null; } }
    if (ac && ac.state === "suspended") ac.resume();
  }
  document.addEventListener("pointerdown", ensureAudio, { passive: true });
  function tone(f, at, dur, type = "sine", vol = 0.07) {
    const t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  const SFX = {
    collect: () => { tone(660, 0, .12); tone(990, .09, .2); },
    unlock:  () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .08, .22, "triangle")),
    level:   () => [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, i * .1, .3, "triangle", .09)),
    hit:     c => tone(500 + Math.min(c, 12) * 45, 0, .09, "square", .035),
    miss:    () => tone(150, 0, .16, "sawtooth", .04)
  };
  function sfx(name, arg) { if (!st.sound || !ac) return; try { SFX[name](arg); } catch (e) {} }

  /* ---------------------------------------------------------------------
     Accent colours (level rewards)
     --------------------------------------------------------------------- */
  let accentStyle = null;
  function applyAccent() {
    const a = ACCENTS.find(x => x.name === st.accent) || ORIGINAL;
    if (accentStyle) { accentStyle.remove(); accentStyle = null; }
    if (a !== ORIGINAL) {
      accentStyle = document.createElement("style");
      accentStyle.textContent = `:root{--accent:${a.light}}:root[data-theme="dark"]{--accent:${a.dark}}`;
      document.head.appendChild(accentStyle);
    }
  }
  applyAccent();

  /* ---------------------------------------------------------------------
     HUD (ring + panel)
     --------------------------------------------------------------------- */
  const email = (S.person && S.person.email) || "";
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.innerHTML = `
    <button class="hud-btn" type="button" aria-expanded="false" aria-controls="hud-panel">
      <span class="ring-wrap">
        <svg class="ring" viewBox="0 0 34 34" aria-hidden="true"><circle class="bg" cx="17" cy="17" r="15"/><circle class="fg" cx="17" cy="17" r="15"/></svg>
        <b class="lvnum">1</b>
      </span>
      <span class="hud-txt"><b></b><small></small></span>
    </button>
    <div class="hud-panel" id="hud-panel" role="region" aria-label="Your progress">
      <div class="tabs" role="tablist">
        <button type="button" role="tab" aria-selected="true" data-tab="p">Progress</button>
        <button type="button" role="tab" aria-selected="false" data-tab="a">Achievements</button>
      </div>
      <div class="tab" data-pane="p">
        <div class="lvhead"><div><small>Level <span class="n">1</span></small><h3 class="nm"></h3></div><span class="xpnum"></span></div>
        <div class="xpbar" role="progressbar" aria-label="XP to next level" aria-valuemin="0" aria-valuemax="100"><i></i></div>
        <p class="quest"><small>Next quest</small><span></span></p>
        <div class="chips">
          ${SPOTS.length ? '<span>Stars <b class="c-stars"></b></span>' : ""}
          <span>Explored <b class="c-exp"></b></span>
          ${FX.hunt ? '<span>Best <b class="c-best"></b></span>' : ""}
        </div>
        ${ACCENTS.length > 1 ? '<div class="sect"><small>Accent colours</small><div class="sw"></div></div>' : ""}
        <div class="acts">
          ${FX.hunt ? '<button type="button" class="pbtn primary" data-act="hunt">Play Pixel Hunt</button>' : ""}
          <button type="button" class="pbtn" data-act="sound" aria-pressed="false"></button>
        </div>
        <div class="hud-done" hidden></div>
      </div>
      <div class="tab" data-pane="a" hidden><ul class="ach"></ul></div>
      <button class="hud-reset" type="button">Reset progress</button>
    </div>`;
  document.body.appendChild(hud);

  const toasts = document.createElement("div");
  toasts.id = "toasts"; toasts.setAttribute("role", "status"); toasts.setAttribute("aria-live", "polite");
  document.body.appendChild(toasts);

  const banner = document.createElement("div");
  banner.className = "levelup"; banner.setAttribute("role", "status"); banner.setAttribute("aria-live", "polite");
  document.body.appendChild(banner);

  const btn = $(".hud-btn", hud);
  const hudPos = () => { const r = $(".ring-wrap", hud).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top }; };

  function nextQuest() {
    for (const [id, a] of Object.entries(ACH)) {
      if (!a.secret && !st.ach.includes(id)) return a.quest || a.desc;
    }
    return "All open quests done. Two secret ones are still out there.";
  }

  function render() {
    const i = lvl(), L = LEVELS[i], nx = LEVELS[i + 1];
    const prog = nx ? (st.xp - L.xp) / (nx.xp - L.xp) : 1;
    const xpText = nx ? `${st.xp} / ${nx.xp} XP` : `${st.xp} XP · max level`;

    $(".ring", hud).style.setProperty("--p", prog.toFixed(3));
    $(".lvnum", hud).textContent = i + 1;
    $(".hud-txt b", hud).textContent = L.name;
    $(".hud-txt small", hud).textContent = xpText;
    btn.setAttribute("aria-label", `Level ${i + 1}, ${L.name}, ${xpText}. Open progress`);

    $(".n", hud).textContent = i + 1;
    $(".nm", hud).textContent = L.name;
    $(".xpnum", hud).textContent = xpText;
    const bar = $(".xpbar", hud);
    bar.style.setProperty("--w", Math.round(prog * 100) + "%");
    bar.setAttribute("aria-valuenow", Math.round(prog * 100));
    $(".quest span", hud).textContent = nextQuest();
    if (SPOTS.length) $(".c-stars", hud).textContent = `${st.stars.length}/${SPOTS.length}`;
    $(".c-exp", hud).textContent = `${st.sections.length}/${SECTIONS.length}`;
    if (FX.hunt) $(".c-best", hud).textContent = st.best;

    const sw = $(".sw", hud);
    if (sw) sw.innerHTML = ACCENTS.map(a => {
      const locked = i + 1 < a.level, on = a.name === st.accent;
      const label = `${a.name} accent${locked ? `, unlocks at level ${a.level}` : ""}`;
      return `<button type="button" class="swatch${on ? " on" : ""}${locked ? " locked" : ""}" data-accent="${esc(a.name)}" style="--c:${esc(a.light)};--cd:${esc(a.dark)}"
        aria-label="${esc(label)}" aria-pressed="${on}" title="${esc(label)}">${locked ? a.level : ""}</button>`;
    }).join("");

    const sound = $('[data-act="sound"]', hud);
    sound.textContent = st.sound ? "Sound on" : "Sound off";
    sound.setAttribute("aria-pressed", String(st.sound));

    $(".ach", hud).innerHTML = Object.entries(ACH).map(([id, a]) => {
      const ok = st.ach.includes(id), hide = a.secret && !ok;
      return `<li class="${ok ? "ok" : ""}"><span class="chk" aria-hidden="true"></span><span><b>${esc(hide ? "???" : a.title)}</b><small>${esc(hide ? "Hidden achievement" : (ok ? a.desc : (a.quest || a.desc)))}</small></span></li>`;
    }).join("");

    const done = $(".hud-done", hud);
    if (st.sections.length >= SECTIONS.length) {
      done.hidden = false;
      done.innerHTML = `<p>${esc(G.completeMessage || "You've seen it all.")}</p>` +
        (email ? `<a class="btn btn-sm" href="mailto:${esc(email)}">Email me</a>` : "");
    } else done.hidden = true;
  }

  const setOpen = open => { hud.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", () => setOpen(!hud.classList.contains("open")));
  // composedPath is captured when the click happens, so it still works after render()
  // has replaced the element that was clicked (swatches, for example).
  document.addEventListener("click", e => { if (!e.composedPath().includes(hud)) setOpen(false); });

  hud.addEventListener("click", e => {
    const t = e.target;
    const tab = t.closest("[data-tab]");
    if (tab) {
      $$("[data-tab]", hud).forEach(b => b.setAttribute("aria-selected", String(b === tab)));
      $$("[data-pane]", hud).forEach(p => { p.hidden = p.dataset.pane !== tab.dataset.tab; });
      return;
    }
    const sw = t.closest("[data-accent]");
    if (sw) {
      const a = ACCENTS.find(x => x.name === sw.dataset.accent);
      if (!a) return;
      if (lvl() + 1 < a.level) {
        sw.classList.remove("shake"); void sw.offsetWidth; sw.classList.add("shake");
        sfx("miss");
        return;
      }
      st.accent = a.name; save(); applyAccent(); render();
      if (a !== ORIGINAL) unlock("painter");
      return;
    }
    const act = t.closest("[data-act]");
    if (act && act.dataset.act === "hunt") { setOpen(false); openHunt(); return; }
    if (act && act.dataset.act === "sound") {
      st.sound = !st.sound; save(); ensureAudio(); render();
      if (st.sound) sfx("collect");
      return;
    }
    if (t.closest(".hud-reset")) {
      try { localStorage.removeItem(KEY); localStorage.removeItem(OLD); } catch (e) {}
      location.reload();
    }
  });

  /* ---------------------------------------------------------------------
     Feedback: XP pop-ups, toasts, level-up banner
     --------------------------------------------------------------------- */
  function popXP(text, x, y) {
    if (reduced) return;
    const el = document.createElement("span");
    el.className = "xp-pop"; el.textContent = text;
    el.style.left = x + "px"; el.style.top = y + "px";
    document.body.appendChild(el);
    el.animate([
      { transform: "translate(-50%,0)", opacity: 0 },
      { transform: "translate(-50%,-14px)", opacity: 1, offset: .2 },
      { transform: "translate(-50%,-54px)", opacity: 0 }
    ], { duration: 1300, easing: "ease-out" }).onfinish = () => el.remove();
  }

  function levelUp(i) {
    const L = LEVELS[i];
    const rewards = ACCENTS.filter(a => a !== ORIGINAL && a.level === i + 1).map(a => a.name + " accent");
    banner.innerHTML = `<small>Level up</small><b>Level ${i + 1}</b><span>${esc(L.name)}</span>` +
      (rewards.length ? `<em>Unlocked: ${esc(rewards.join(", "))}</em>` : "");
    banner.classList.add("in");
    burst(innerWidth / 2, innerHeight * 0.38, 46);
    sfx("level");
    clearTimeout(banner._t);
    banner._t = setTimeout(() => banner.classList.remove("in"), 3000);
  }

  function award(n, x, y) {
    if (!n) return;
    const p = hudPos(), before = lvl();
    st.xp += n; save();
    popXP("+" + n + " XP", x == null ? p.x : x, y == null ? p.y : y);
    render();
    if (lvl() > before) levelUp(lvl());
  }

  const queue = []; let showing = false;
  function nextToast() {
    const id = queue.shift();
    if (!id) { showing = false; return; }
    showing = true;
    const a = ACH[id] || { title: id, desc: "" };
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-ico">${STAR_SVG.replace("<svg", '<svg fill="currentColor" width="18" height="18"')}</span><span><small>Achievement unlocked · +${XP.achievement} XP</small><b>${esc(a.title)}</b><span class="d">${esc(a.desc)}</span></span>`;
    toasts.appendChild(el);
    requestAnimationFrame(() => el.classList.add("in"));
    const r = el.getBoundingClientRect();
    burst(r.left + 30, r.top + 30, 26);
    setTimeout(() => { el.classList.remove("in"); setTimeout(() => { el.remove(); nextToast(); }, 450); }, 3600);
  }

  function unlock(id) {
    if (!ACH[id] || st.ach.includes(id)) return;
    st.ach.push(id); save();
    sfx("unlock");
    award(XP.achievement);
    queue.push(id); if (!showing) nextToast();
  }
  PF.unlock = unlock;

  function markSection(id) {
    if (!SECTIONS.includes(id) || st.sections.includes(id)) return;
    st.sections.push(id); save();
    award(XP.section);
    if (id === "work") unlock("work");
    if (st.sections.length >= SECTIONS.length) unlock("all");
  }

  /* ---------------------------------------------------------------------
     Hidden stars
     --------------------------------------------------------------------- */
  function flyToHud(x, y) {
    if (reduced) return;
    const t = hudPos();
    const el = document.createElement("span");
    el.className = "star-fly"; el.innerHTML = STAR_SVG;
    el.style.left = x + "px"; el.style.top = y + "px";
    document.body.appendChild(el);
    el.animate([
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${t.x - x}px), calc(-50% + ${t.y - y + 16}px)) scale(.4)`, opacity: .9 }
    ], { duration: 750, easing: "cubic-bezier(.5,0,.2,1)" }).onfinish = () => el.remove();
  }

  SPOTS.forEach((spot, n) => {
    if (st.stars.includes(n)) return;
    const host = $(spot.sel);
    if (!host) return;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    const el = document.createElement("button");
    el.type = "button"; el.className = "star"; el.tabIndex = -1; el.setAttribute("aria-hidden", "true");
    el.style.cssText = `${spot.css};--s:${spot.s}px;--d:${(-n * 0.7).toFixed(1)}s`;
    el.innerHTML = STAR_SVG;
    el.addEventListener("click", e => {
      e.preventDefault(); e.stopPropagation();
      if (st.stars.includes(n)) return;
      st.stars.push(n); save();
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      burst(x, y, 16); sfx("collect"); flyToHud(x, y);
      el.remove();
      award(XP.star, x, y);
      if (st.stars.length >= SPOTS.length) unlock("stars");
    });
    host.appendChild(el);
  });

  /* ---------------------------------------------------------------------
     Pixel Hunt mini-game
     --------------------------------------------------------------------- */
  let modal = null, run = null, lastFocus = null;

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-label", "Pixel Hunt");
    modal.innerHTML = `
      <div class="modal-card">
        <div class="mhead"><h3>Pixel Hunt</h3><button class="mclose" type="button" aria-label="Close game">×</button></div>
        <div class="mstats">
          <span>Score <b class="m-score">0</b></span>
          <span>Combo <b class="m-combo">x1</b></span>
          <span>Time <b class="m-time">${HUNT_TIME}</b>s</span>
          <span>Best <b class="m-best">0</b></span>
        </div>
        <div class="arena"></div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", e => { if (e.target === modal || e.target.closest(".mclose")) closeHunt(); });
    modal.addEventListener("click", e => { if (e.target.closest("[data-start]")) startHunt(); });
    $(".arena", modal).addEventListener("pointerdown", e => {
      if (run && e.target.classList.contains("arena")) { run.combo = 0; showStats(); sfx("miss"); }
    });
  }

  function overlay(html) {
    const arena = $(".arena", modal);
    arena.innerHTML = `<div class="overlay">${html}</div>`;
    const b = $("[data-start]", arena); if (b) b.focus({ preventScroll: true });
  }

  function showStats() {
    $(".m-score", modal).textContent = run ? run.score : 0;
    $(".m-combo", modal).textContent = "x" + (run ? 1 + Math.floor(run.combo / 4) : 1);
    $(".m-time", modal).textContent = run ? Math.max(0, Math.ceil(run.t)) : HUNT_TIME;
    $(".m-best", modal).textContent = st.best;
  }

  function openHunt() {
    if (!modal) buildModal();
    lastFocus = document.activeElement;
    modal.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    run = null; showStats();
    overlay(`<p>Click the shapes before they shrink away. Chain hits for a combo bonus. You have ${HUNT_TIME} seconds.</p><button class="btn" type="button" data-start>Start</button>`);
  }

  function stopTimers() { if (run) { clearInterval(run.timer); clearTimeout(run.sp); } }

  function closeHunt() {
    if (!modal) return;
    stopTimers(); run = null;
    modal.classList.remove("open");
    document.documentElement.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function startHunt() {
    const arena = $(".arena", modal);
    arena.innerHTML = "";
    stopTimers();
    run = { score: 0, combo: 0, t: HUNT_TIME, timer: 0, sp: 0 };
    showStats();
    ensureAudio();

    const spawn = () => {
      if (!run) return;
      const elapsed = HUNT_TIME - run.t;
      const size = 40 + Math.random() * 28;
      const life = Math.max(850, 1500 - elapsed * 25);
      const w = arena.clientWidth, h = arena.clientHeight;
      const el = document.createElement("button");
      el.type = "button";
      el.className = "tgt " + ["c", "q", "d"][Math.floor(Math.random() * 3)];
      el.setAttribute("aria-label", "Target");
      el.style.cssText = `--s:${size}px;--h:${Math.floor(Math.random() * 360)};--life:${life}ms;left:${Math.random() * (w - size)}px;top:${Math.random() * (h - size)}px`;
      el.addEventListener("pointerdown", ev => {
        ev.stopPropagation();
        if (!run || !el.isConnected) return;
        run.score += 1 + Math.floor(run.combo / 4);
        run.combo++;
        const r = el.getBoundingClientRect();
        burst(r.left + r.width / 2, r.top + r.height / 2, 8);
        sfx("hit", run.combo);
        el.remove(); showStats();
      });
      arena.appendChild(el);
      setTimeout(() => { if (el.isConnected) { el.remove(); if (run) { run.combo = 0; showStats(); } } }, life);
      run.sp = setTimeout(spawn, Math.max(340, 700 - elapsed * 18));
    };
    spawn();

    run.timer = setInterval(() => {
      if (!run) return;
      run.t -= 0.1; showStats();
      if (run.t <= 0) endHunt();
    }, 100);
  }

  function endHunt() {
    stopTimers();
    const score = run.score, prev = st.best;
    run = null;
    let gain = 0, note = `Best: ${st.best}`;
    if (score > prev) { gain = (score - prev) * XP.huntPerPoint; st.best = score; note = prev ? "New best!" : "First score on the board!"; }
    save(); showStats();
    overlay(`<b class="big">${score}</b><p>${note}${gain ? ` +${gain} XP` : ""}</p><button class="btn" type="button" data-start>Play again</button>`);
    const r = $(".arena", modal).getBoundingClientRect();
    if (gain) award(gain, r.left + r.width / 2, r.top + r.height / 2);
    if (score >= HUNT_TARGET) unlock("hunt");
  }

  /* ---------------------------------------------------------------------
     Triggers
     --------------------------------------------------------------------- */
  addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (modal && modal.classList.contains("open")) closeHunt(); else setOpen(false);
  });

  render();
  markSection("top");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) markSection(e.target.id); }),
      { rootMargin: "-45% 0px -45% 0px" });
    SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  }
  addEventListener("scroll", () => {
    if (scrollY > innerHeight * 0.5) unlock("start");
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) markSection("contact");
  }, { passive: true });

  let opened = 0;
  document.addEventListener("click", e => {
    const t = e.target;
    if (t.closest(".gal button")) unlock("gallery");
    const sum = t.closest("summary");
    if (sum && sum.parentElement && !sum.parentElement.open && ++opened >= 2) unlock("fine");
    if (t.closest('a[href^="mailto:"], .foot-links a')) unlock("hello");
  });

  if (window.PFTheme) PFTheme.onChange((mode, byUser) => { if (byUser && mode === "dark") unlock("night"); });
  if ((st.visits || 0) >= 2) setTimeout(() => unlock("return"), 2500);

  const seq = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
  let pos = 0;
  addEventListener("keydown", e => {
    const k = (e.key || "").toLowerCase();
    pos = k === seq[pos] ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; rain(); unlock("konami"); }
  });
})();
