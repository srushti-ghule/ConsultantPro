/* ═══════════════════════════════════════════
   CONSULTPRO — ULTRA LUXURY JS ENGINE
═══════════════════════════════════════════ */

// ── DATA ──────────────────────────────────
const EXPERTS = [
  { id:1,name:"Dr. Sarah Chen",cat:"health",title:"Cardiologist & Health Consultant",bio:"15+ years in cardiac care. Specializes in preventive medicine and chronic disease management.",rate:"₹800/hr",rating:4.9,reviews:248,img:"https://i.pravatar.cc/150?img=47",avail:true,exp:"15 yrs" },
  { id:2,name:"James Miller",cat:"finance",title:"CFP & Investment Advisor",bio:"Harvard MBA. Helped 200+ clients grow their portfolios with strategic financial planning.",rate:"₹1,200/hr",rating:4.8,reviews:185,img:"https://i.pravatar.cc/150?img=33",avail:true,exp:"12 yrs" },
  { id:3,name:"Adv. Priya Sharma",cat:"legal",title:"Corporate Lawyer & IP Specialist",bio:"Top-tier legal counsel for startups, IP law, contracts, and complex dispute resolution.",rate:"₹1,500/hr",rating:4.9,reviews:312,img:"https://i.pravatar.cc/150?img=20",avail:false,exp:"18 yrs" },
  { id:4,name:"Rahul Verma",cat:"tech",title:"CTO & Technology Strategist",bio:"Ex-Google engineer. Expert in cloud architecture, AI integration, and enterprise scaling.",rate:"₹900/hr",rating:4.7,reviews:167,img:"https://i.pravatar.cc/150?img=11",avail:true,exp:"10 yrs" },
  { id:5,name:"Emily Watson",cat:"business",title:"Business Growth Consultant",bio:"McKinsey alum. Specializes in startup scaling, go-to-market strategy, and fundraising.",rate:"₹1,100/hr",rating:4.8,reviews:203,img:"https://i.pravatar.cc/150?img=32",avail:true,exp:"14 yrs" },
  { id:6,name:"Dr. Arjun Nair",cat:"health",title:"Mental Health & Wellness Expert",bio:"Licensed psychologist. Specializes in anxiety, depression, and corporate wellness programs.",rate:"₹700/hr",rating:4.9,reviews:421,img:"https://i.pravatar.cc/150?img=60",avail:true,exp:"9 yrs" },
  { id:7,name:"Lisa Chen",cat:"finance",title:"Tax Consultant & CPA",bio:"Big 4 accounting background. Expert in tax optimization, compliance, and wealth management.",rate:"₹950/hr",rating:4.6,reviews:134,img:"https://i.pravatar.cc/150?img=29",avail:false,exp:"11 yrs" },
  { id:8,name:"Mark Thompson",cat:"tech",title:"Cybersecurity & IT Consultant",bio:"CISSP certified. Protects businesses from cyber threats with comprehensive security audits.",rate:"₹1,000/hr",rating:4.8,reviews:98,img:"https://i.pravatar.cc/150?img=15",avail:true,exp:"13 yrs" },
];
const TESTIMONIALS = [
  { name:"Ananya Krishnan",role:"Startup Founder",text:"ConsultPro transformed my business. Got connected with a top financial advisor who helped me secure Series A funding. The quality of experts is genuinely world-class.",stars:5,img:"https://i.pravatar.cc/60?img=44" },
  { name:"Rohit Mehta",role:"Software Engineer",text:"I needed urgent legal advice. Found an expert within minutes and received a comprehensive consultation that saved me thousands in potential legal costs. Absolutely worth it.",stars:5,img:"https://i.pravatar.cc/60?img=57" },
  { name:"Sneha Patel",role:"Marketing Manager",text:"The health consultation was incredible. Dr. Chen provided deeply personalized advice with a level of care I've never experienced before. I feel genuinely looked after.",stars:5,img:"https://i.pravatar.cc/60?img=41" },
];
const BOOKINGS = [
  { expert:"Dr. Sarah Chen",topic:"Cardiac health comprehensive review",date:"Today · 3:00 PM",status:"upcoming",img:"https://i.pravatar.cc/48?img=47" },
  { expert:"James Miller",topic:"Investment portfolio deep-dive",date:"Yesterday · 11:00 AM",status:"done",img:"https://i.pravatar.cc/48?img=33" },
  { expert:"Adv. Priya Sharma",topic:"Startup contract review & IP advice",date:"Dec 10 · 2:00 PM",status:"done",img:"https://i.pravatar.cc/48?img=20" },
  { expert:"Rahul Verma",topic:"Cloud architecture consultation",date:"Dec 15 · 4:00 PM",status:"upcoming",img:"https://i.pravatar.cc/48?img=11" },
];

// ── STATE ──────────────────────────────────
let currentUser = null;
try { currentUser = JSON.parse(localStorage.getItem('cpUser')); } catch(e){}
let selectedRole = 'user';
let authModal = null;
let mousePosX = 0, mousePosY = 0;
let cursorX = 0, cursorY = 0;

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  authModal = new bootstrap.Modal(document.getElementById('authModal'));
  initCursor();
  initParticles();
  initScrollReveal();
  initNavScroll();
  renderExperts('all');
  renderTestimonials();
  if (currentUser) showDashboard();
});

// ═══════════════════════════════════════════
// CUSTOM CURSOR
// ═══════════════════════════════════════════
function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mousePosX = e.clientX; mousePosY = e.clientY;
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });

  // Smooth ring follow
  (function animateRing() {
    tx += (mousePosX - tx) * 0.14;
    ty += (mousePosY - ty) * 0.14;
    ring.style.left = tx + 'px';
    ring.style.top  = ty + 'px';
    requestAnimationFrame(animateRing);
  })();

  // Hover effect on interactive elements
  const hoverEls = 'button, a, .expert-card, .step-card, .price-card, .testi-card, .filter-pill, .float-card, .s-link, .role-opt, .a-tab';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) document.body.classList.add('c-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) document.body.classList.remove('c-hover');
  });
  document.addEventListener('mousedown', () => document.body.classList.add('c-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('c-click'));
}

// ═══════════════════════════════════════════
// GOLD PARTICLES
// ═══════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx    = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 1.6 + 0.3,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -(Math.random() * 0.4 + 0.1),
    alpha: Math.random() * 0.6 + 0.1,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x  += p.vx;
      p.y  += p.vy;
      p.alpha += p.alphaDir * 0.003;
      if (p.alpha >= 0.7 || p.alpha <= 0.05) p.alphaDir *= -1;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      if (p.x < -10 || p.x > W + 10) { p.x = Math.random() * W; }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
}

// ═══════════════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════════════
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// ═══════════════════════════════════════════
// NAVBAR SCROLL
// ═══════════════════════════════════════════
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ═══════════════════════════════════════════
// 3D TILT ON EXPERT CARDS
// ═══════════════════════════════════════════
function initTilt() {
  document.querySelectorAll('.expert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -8;
      const ry = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      card.style.setProperty('--mx', (x / rect.width  * 100) + '%');
      card.style.setProperty('--my', (y / rect.height * 100) + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ═══════════════════════════════════════════
// RENDER EXPERTS
// ═══════════════════════════════════════════
function renderExperts(filter) {
  const grid = document.getElementById('expertsGrid');
  if (!grid) return;
  const data = filter === 'all' ? EXPERTS : EXPERTS.filter(e => e.cat === filter);

  // Shimmer loading effect
  grid.innerHTML = data.map(() => `<div class="col-lg-3 col-md-6"><div style="height:360px;border-radius:24px;overflow:hidden" class="shimmer"></div></div>`).join('');
  grid.style.filter = 'blur(2px)'; grid.style.transition = 'filter .4s';

  setTimeout(() => {
    grid.style.filter = '';
    grid.innerHTML = data.map((e,i) => `
      <div class="col-lg-3 col-md-6 reveal reveal-d${(i%4)+1}">
        <div class="expert-card">
          <div class="expert-img-wrap">
            <img src="${e.img}" alt="${e.name}" loading="lazy"/>
            <div class="expert-vbadge"><i class="bi bi-patch-check-fill"></i></div>
          </div>
          <div class="expert-name">${e.name}</div>
          <div class="expert-tag">${e.cat}</div>
          <p class="expert-bio">${e.bio}</p>
          <div class="expert-meta">
            <span class="expert-stars">${'★'.repeat(Math.floor(e.rating))}</span>
            <span>${e.rating} <span style="color:var(--ink3)">(${e.reviews} reviews)</span></span>
          </div>
          <div class="expert-footer">
            <div>
              <div class="expert-rate">${e.rate}</div>
              <div class="expert-avail ${e.avail?'':'off'}">${e.avail?'● Available Now':'○ Next: Tomorrow'}</div>
            </div>
            <button class="btn-book" onclick="bookExpert('${e.name}')"><span class="lbl">Book Now</span></button>
          </div>
        </div>
      </div>
    `).join('');
    // Re-observe new reveals and init tilt
    document.querySelectorAll('#expertsGrid .reveal').forEach(el => {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      io.observe(el);
    });
    initTilt();
  }, 400);
}

function filterExp(cat, btn) {
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExperts(cat);
}

function bookExpert(name) {
  if (!currentUser) {
    toast(`Login to book a session with ${name}`, 'e');
    showAuth('login'); return;
  }
  toast(`✓ Booking session with ${name}`, 's');
  setTimeout(() => dashSection('bookings', document.getElementById('sl-bookings')), 1600);
}

// ═══════════════════════════════════════════
// RENDER TESTIMONIALS
// ═══════════════════════════════════════════
function renderTestimonials() {
  const grid = document.getElementById('testiGrid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t,i) => `
    <div class="col-md-4 reveal reveal-d${i+1}">
      <div class="testi-card">
        <div class="testi-stars">${'★'.repeat(t.stars)}</div>
        <p class="testi-text">"${t.text}"</p>
        <div class="testi-author">
          <img src="${t.img}" alt="${t.name}"/>
          <div><strong>${t.name}</strong><span>${t.role}</span></div>
        </div>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════
function showAuth(tab) { authModal.show(); switchTab(tab); }

function switchTab(tab) {
  document.getElementById('loginForm').style.display    = tab==='login'    ? 'block':'none';
  document.getElementById('registerForm').style.display = tab==='register' ? 'block':'none';
  document.getElementById('loginTab').classList.toggle('active', tab==='login');
  document.getElementById('registerTab').classList.toggle('active', tab==='register');
}

function selRole(r) {
  selectedRole = r;
  document.getElementById('roUser').classList.toggle('sel', r==='user');
  document.getElementById('roExp').classList.toggle('sel',  r==='expert');
}

function togglePwd(id, btn) {
  const el = document.getElementById(id);
  const show = el.type === 'password';
  el.type = show ? 'text' : 'password';
  btn.querySelector('i').className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
}

function checkStr() {
  const pwd = document.getElementById('rPwd').value;
  const fill = document.getElementById('strFill');
  const txt  = document.getElementById('strTxt');
  let s = 0;
  if (pwd.length >= 8)        s++;
  if (/[A-Z]/.test(pwd))     s++;
  if (/[0-9]/.test(pwd))     s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  const levels = [
    {l:'',   c:'',         w:'0%'},
    {l:'Weak',c:'#ef4444', w:'25%'},
    {l:'Fair',c:'#f97316', w:'50%'},
    {l:'Good',c:'#eab308', w:'75%'},
    {l:'Strong',c:'#22c55e',w:'100%'},
  ];
  fill.style.width  = levels[s].w;
  fill.style.background = levels[s].c;
  txt.textContent  = levels[s].l;
  txt.style.color  = levels[s].c;
}

function handleLogin() {
  const email = document.getElementById('lEmail').value.trim();
  const pwd   = document.getElementById('lPwd').value;
  const err   = document.getElementById('lErr');
  if (!email||!pwd) { showErr(err,'Please fill in all fields.'); return; }
  if (!email.includes('@')) { showErr(err,'Enter a valid email address.'); return; }
  const users = JSON.parse(localStorage.getItem('cpUsers')||'[]');
  const user = users.find(u => u.email===email && u.password===pwd);
  if (!user && !(email==='demo@consultpro.com' && pwd==='demo123')) {
    showErr(err,'Invalid credentials. Try demo@consultpro.com / demo123'); return;
  }
  currentUser = user || {firstName:'Demo',lastName:'User',email,role:'user'};
  localStorage.setItem('cpUser', JSON.stringify(currentUser));
  authModal.hide();
  toast(`Welcome back, ${currentUser.firstName}! ✦`, 's');
  setTimeout(showDashboard, 700);
}

function handleRegister() {
  const first = document.getElementById('rFirst').value.trim();
  const last  = document.getElementById('rLast').value.trim();
  const email = document.getElementById('rEmail').value.trim();
  const pwd   = document.getElementById('rPwd').value;
  const agree = document.getElementById('agr').checked;
  const err   = document.getElementById('rErr');
  if (!first||!last||!email||!pwd) { showErr(err,'Please fill in all fields.'); return; }
  if (!email.includes('@')) { showErr(err,'Enter a valid email address.'); return; }
  if (pwd.length < 8)       { showErr(err,'Password must be at least 8 characters.'); return; }
  if (!agree)               { showErr(err,'Please agree to the Terms & Privacy Policy.'); return; }
  const users = JSON.parse(localStorage.getItem('cpUsers')||'[]');
  if (users.find(u=>u.email===email)) { showErr(err,'An account with this email already exists.'); return; }
  const newUser = {firstName:first,lastName:last,email,password:pwd,role:selectedRole};
  users.push(newUser);
  localStorage.setItem('cpUsers', JSON.stringify(users));
  currentUser = newUser;
  localStorage.setItem('cpUser', JSON.stringify(currentUser));
  authModal.hide();
  toast(`Account created! Welcome, ${first}! ✦`, 's');
  setTimeout(showDashboard, 700);
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('cpUser');
  document.getElementById('dashboardPage').style.display = 'none';
  document.getElementById('mainNav').style.display = '';
  document.getElementById('mainFooter').style.display = '';
  document.querySelectorAll('section').forEach(s => s.style.display = '');
  document.querySelector('.marquee-strip').style.display = '';
  toast('Signed out successfully.', 's');
  window.scrollTo({top:0,behavior:'smooth'});
  // Re-init particles & observers for landing page
  setTimeout(() => { initScrollReveal(); }, 100);
}

function showErr(el, msg) {
  el.textContent = msg; el.classList.remove('d-none');
  setTimeout(() => el.classList.add('d-none'), 4000);
}

// ═══════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════
function showDashboard() {
  document.getElementById('mainNav').style.display = 'none';
  document.getElementById('mainFooter').style.display = 'none';
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  const ms = document.querySelector('.marquee-strip');
  if (ms) ms.style.display = 'none';
  const d = document.getElementById('dashboardPage');
  d.style.display = 'block';
  const initials = (currentUser.firstName[0]+currentUser.lastName[0]).toUpperCase();
  document.getElementById('navAv').textContent = initials;
  dashSection('overview', document.getElementById('sl-overview'));
}

function dashSection(sec, el) {
  document.querySelectorAll('.s-link').forEach(l => l.classList.remove('active'));
  if (el) el.classList.add('active');
  const m = document.getElementById('dashMain');
  const renders = { overview:renderOverview, experts:renderDashExperts, bookings:renderBookings, messages:renderMessages, profile:renderProfile };
  m.innerHTML = '';
  m.style.opacity = '0';
  setTimeout(() => {
    m.innerHTML = renders[sec]();
    m.style.transition = 'opacity .4s';
    m.style.opacity = '1';
    if (sec === 'experts') initTiltDash();
  }, 80);
}

function renderOverview() {
  return `
    <div style="margin-bottom:32px">
      <h3 style="font-size:2rem;font-weight:700;margin-bottom:4px">Good day, ${currentUser.firstName} ✦</h3>
      <p style="color:var(--ink3)">Your consultation dashboard overview</p>
    </div>
    <div class="row g-3 mb-4">
      ${[
        {icon:'bi-calendar-check',v:'4',l:'Total Sessions',t:'↑ 2 this month'},
        {icon:'bi-clock-history',v:'8.5h',l:'Hours Consulted',t:'↑ 1.5h from last month'},
        {icon:'bi-people',v:'3',l:'Experts Worked With',t:'Across 3 categories'},
        {icon:'bi-star-fill',v:'4.9',l:'Avg. Rating Given',t:'Top reviewer'},
      ].map((k,i) => `
        <div class="col-6 col-lg-3">
          <div class="kpi-card" style="animation:revealUp .6s ${i*.08}s both">
            <div class="kpi-icon"><i class="bi ${k.icon}"></i></div>
            <div><div class="kpi-v">${k.v}</div><div class="kpi-l">${k.l}</div><div class="kpi-t">${k.t}</div></div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card">
          <div class="gc-title"><i class="bi bi-calendar-event"></i> Upcoming Sessions</div>
          ${BOOKINGS.filter(b=>b.status==='upcoming').map(b=>`
            <div class="bk-row">
              <img src="${b.img}" alt="${b.expert}"/>
              <div class="bk-info"><strong>${b.expert}</strong><small>${b.topic}</small></div>
              <div style="text-align:right">
                <span class="sp sp-up">Upcoming</span><br>
                <small style="font-size:.72rem;color:var(--ink3)">${b.date}</small>
              </div>
              <button class="btn btn-gold btn-sm ms-2" style="font-size:.75rem;padding:6px 14px" onclick="toast('Joining session...','s')">
                <i class="bi bi-camera-video me-1"></i>Join
              </button>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card">
          <div class="gc-title"><i class="bi bi-lightning-charge"></i> Quick Book</div>
          ${EXPERTS.filter(e=>e.avail).slice(0,3).map(e=>`
            <div class="bk-row">
              <img src="${e.img}" alt="${e.name}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1.5px solid var(--gold)"/>
              <div class="bk-info"><strong>${e.name}</strong><small>${e.title}</small></div>
              <button class="btn-book btn-sm" onclick="toast('Booking ${e.name}...','s')"><span class="lbl">Book</span></button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderDashExperts() {
  return `
    <div style="margin-bottom:28px">
      <h3 style="font-size:2rem;font-weight:700;margin-bottom:4px">Find Experts</h3>
      <p style="color:var(--ink3)">Browse and connect with verified professionals</p>
    </div>
    <div class="d-flex gap-3 mb-4 flex-wrap align-items-center">
      <input class="dash-search" type="text" placeholder="🔍  Search experts…" oninput="searchDashExp(this.value)" style="max-width:300px"/>
      <div class="d-flex gap-2 flex-wrap" id="dFilters">
        ${['all','health','finance','legal','tech','business'].map(c=>`
          <button class="filter-pill ${c==='all'?'active':''}" onclick="filterDashExp('${c}',this)">${c==='all'?'All':c.charAt(0).toUpperCase()+c.slice(1)}</button>
        `).join('')}
      </div>
    </div>
    <div class="row g-4" id="dExGrid">
      ${EXPERTS.map(e=>`
        <div class="col-lg-4 col-md-6" data-cat="${e.cat}">
          <div class="expert-card">
            <div class="expert-img-wrap">
              <img src="${e.img}" alt="${e.name}"/>
              <div class="expert-vbadge"><i class="bi bi-patch-check-fill"></i></div>
            </div>
            <div class="expert-name">${e.name}</div>
            <div class="expert-tag">${e.cat}</div>
            <p class="expert-bio">${e.bio}</p>
            <div class="expert-meta">
              <span class="expert-stars">${'★'.repeat(Math.floor(e.rating))}</span>
              <span>${e.rating} <span style="color:var(--ink3)">(${e.reviews})</span></span>
            </div>
            <div class="expert-footer">
              <div>
                <div class="expert-rate">${e.rate}</div>
                <div class="expert-avail ${e.avail?'':'off'}">${e.avail?'● Available':'○ Busy'}</div>
              </div>
              <button class="btn-book" onclick="toast('Booking ${e.name}...','s')"><span class="lbl">Book Now</span></button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function initTiltDash() {
  document.querySelectorAll('#dExGrid .expert-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height/2) / (r.height/2)) * -7;
      const ry = ((e.clientX - r.left - r.width/2) / (r.width/2)) * 7;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

function filterDashExp(cat, btn) {
  document.querySelectorAll('#dFilters .filter-pill').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#dExGrid > div').forEach(item => {
    item.style.display = (cat==='all' || item.dataset.cat===cat) ? '' : 'none';
  });
}
function searchDashExp(q) {
  document.querySelectorAll('#dExGrid > div').forEach(item => {
    const n = item.querySelector('.expert-name').textContent.toLowerCase();
    const c = item.querySelector('.expert-tag').textContent.toLowerCase();
    item.style.display = (n.includes(q)||c.includes(q)||!q) ? '' : 'none';
  });
}

function renderBookings() {
  return `
    <div style="margin-bottom:28px">
      <h3 style="font-size:2rem;font-weight:700;margin-bottom:4px">My Bookings</h3>
      <p style="color:var(--ink3)">Track all your consultation sessions</p>
    </div>
    <div class="glass-card">
      <div class="gc-title"><i class="bi bi-journal-check"></i> All Sessions</div>
      ${BOOKINGS.map(b=>`
        <div class="bk-row">
          <img src="${b.img}" alt="${b.expert}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid var(--gold)"/>
          <div class="bk-info" style="flex:1">
            <strong>${b.expert}</strong>
            <small>${b.topic}</small>
            <div style="font-size:.72rem;color:var(--ink3);margin-top:2px"><i class="bi bi-clock me-1"></i>${b.date}</div>
          </div>
          <div class="d-flex flex-column align-items-end gap-2">
            <span class="sp ${b.status==='upcoming'?'sp-up':'sp-done'}">${b.status==='upcoming'?'Upcoming':'Completed'}</span>
            ${b.status==='upcoming'
              ? `<button class="btn btn-gold btn-sm" style="font-size:.72rem;padding:5px 12px" onclick="toast('Joining secure session...','s')"><i class="bi bi-camera-video me-1"></i>Join</button>`
              : `<button class="btn" style="font-size:.72rem;color:var(--ink3);border:1px solid var(--rim);border-radius:8px;padding:5px 12px" onclick="toast('Rescheduling...','s')"><i class="bi bi-arrow-repeat me-1"></i>Rebook</button>`
            }
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

const MSG_CONTACTS = [
  {name:"Dr. Sarah Chen",last:"Your next session is confirmed for tomorrow at 3 PM.",time:"2h ago",img:"https://i.pravatar.cc/48?img=47",unread:2},
  {name:"James Miller",last:"I've reviewed your portfolio thoroughly. Let's discuss.",time:"Yesterday",img:"https://i.pravatar.cc/48?img=33",unread:0},
  {name:"Rahul Verma",last:"Here are the tech recommendations we discussed in detail.",time:"Dec 10",img:"https://i.pravatar.cc/48?img=11",unread:1},
];

function renderMessages() {
  return `
    <div style="margin-bottom:28px">
      <h3 style="font-size:2rem;font-weight:700;margin-bottom:4px">Messages</h3>
      <p style="color:var(--ink3)">Your conversations with experts</p>
    </div>
    <div class="glass-card">
      ${MSG_CONTACTS.map(c=>`
        <div class="bk-row" style="cursor:pointer" onclick="openChat('${c.name}','${c.img}')">
          <div style="position:relative;flex-shrink:0">
            <img src="${c.img}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid var(--gold)"/>
            ${c.unread?`<span style="position:absolute;top:-4px;right:-4px;background:var(--gold);color:#0A0A0A;border-radius:50%;width:18px;height:18px;font-size:.65rem;display:flex;align-items:center;justify-content:center;font-weight:800">${c.unread}</span>`:''}
          </div>
          <div class="bk-info"><strong>${c.name}</strong><small>${c.last}</small></div>
          <small style="color:var(--ink3);white-space:nowrap">${c.time}</small>
        </div>
      `).join('')}
    </div>
  `;
}

function openChat(name, img) {
  const m = document.getElementById('dashMain');
  m.innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:24px">
      <button class="btn" style="background:var(--surface);border:1px solid var(--rim);color:var(--ink2);border-radius:10px;padding:8px 14px;font-size:.82rem;cursor:none" onclick="dashSection('messages',document.getElementById('sl-messages'))"><i class="bi bi-arrow-left me-1"></i>Back</button>
      <img src="${img}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid var(--gold)"/>
      <div><strong>${name}</strong><div style="font-size:.72rem;color:#22c55e">● Online now</div></div>
    </div>
    <div class="glass-card" id="chatBox" style="height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;padding-bottom:8px">
      <div style="text-align:center;color:var(--ink3);font-size:.75rem;letter-spacing:1px;text-transform:uppercase">Today</div>
      <div style="display:flex;gap:10px;align-items:flex-end">
        <img src="${img}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0"/>
        <div style="background:var(--surface2);border:1px solid var(--rim);border-radius:16px 16px 16px 4px;padding:12px 16px;max-width:72%;font-size:.875rem;color:var(--ink2)">Hello! How can I assist you today?</div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;align-items:flex-end">
        <div style="background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.25);border-radius:16px 16px 4px 16px;padding:12px 16px;max-width:72%;font-size:.875rem;color:var(--ink)">Hi! I wanted to discuss my upcoming session agenda.</div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-end">
        <img src="${img}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0"/>
        <div style="background:var(--surface2);border:1px solid var(--rim);border-radius:16px 16px 16px 4px;padding:12px 16px;max-width:72%;font-size:.875rem;color:var(--ink2)">Your session is confirmed for tomorrow at 3 PM. I'll have your report ready beforehand.</div>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:16px">
      <input class="dash-search" id="chatIn" placeholder="Type a message…" style="flex:1" onkeydown="if(event.key==='Enter')sendMsg('${name}','${img}')"/>
      <button class="btn btn-gold" onclick="sendMsg('${name}','${img}')"><i class="bi bi-send-fill"></i></button>
    </div>
  `;
}

function sendMsg(name, img) {
  const input = document.getElementById('chatIn');
  const msg   = input.value.trim();
  if (!msg) return;
  const box = document.getElementById('chatBox');
  box.innerHTML += `<div style="display:flex;gap:10px;justify-content:flex-end;align-items:flex-end"><div style="background:rgba(201,168,76,.12);border:1px solid rgba(201,168,76,.25);border-radius:16px 16px 4px 16px;padding:12px 16px;max-width:72%;font-size:.875rem;color:var(--ink)">${msg}</div></div>`;
  input.value = '';
  box.scrollTop = box.scrollHeight;
  setTimeout(() => {
    box.innerHTML += `<div style="display:flex;gap:10px;align-items:flex-end"><img src="${img}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0"/><div style="background:var(--surface2);border:1px solid var(--rim);border-radius:16px 16px 16px 4px;padding:12px 16px;max-width:72%;font-size:.875rem;color:var(--ink2)">Thank you for sharing that. I'll incorporate it into our session plan.</div></div>`;
    box.scrollTop = box.scrollHeight;
  }, 1000);
}

function renderProfile() {
  const initials = (currentUser.firstName[0]+currentUser.lastName[0]).toUpperCase();
  return `
    <div style="margin-bottom:28px">
      <h3 style="font-size:2rem;font-weight:700;margin-bottom:4px">My Profile</h3>
      <p style="color:var(--ink3)">Manage your account and preferences</p>
    </div>
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="glass-card text-center">
          <div style="width:88px;height:88px;background:linear-gradient(135deg,var(--gold-lt),var(--gold));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:800;color:#0A0A0A;margin:0 auto 16px;box-shadow:0 0 40px rgba(201,168,76,.3)">${initials}</div>
          <h5 style="font-size:1.3rem;margin-bottom:4px">${currentUser.firstName} ${currentUser.lastName}</h5>
          <p style="color:var(--ink3);font-size:.875rem">${currentUser.email}</p>
          <span style="background:rgba(201,168,76,.1);color:var(--gold);border:1px solid rgba(201,168,76,.25);padding:4px 16px;border-radius:50px;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px">${currentUser.role}</span>
          <hr style="border-color:var(--rim);margin:20px 0"/>
          ${[['Member since','December 2024'],['Sessions completed','4'],['Current plan','Professional ✦'],['Profile views','128']].map(([l,v])=>`
            <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.03);font-size:.875rem">
              <span style="color:var(--ink3)">${l}</span>
              <span style="${l.includes('plan')?'color:var(--gold)':''}">${v}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="col-lg-8">
        <div class="glass-card">
          <div class="gc-title"><i class="bi bi-pencil-square"></i> Edit Profile</div>
          <div class="row g-3">
            <div class="col-6"><label class="cp-label">First Name</label><input class="cp-field" value="${currentUser.firstName}"/></div>
            <div class="col-6"><label class="cp-label">Last Name</label><input class="cp-field" value="${currentUser.lastName}"/></div>
            <div class="col-12"><label class="cp-label">Email Address</label><input class="cp-field" value="${currentUser.email}"/></div>
            <div class="col-12"><label class="cp-label">Phone Number</label><input class="cp-field" placeholder="+91 98765 43210"/></div>
            <div class="col-12"><label class="cp-label">Bio</label><textarea class="cp-field" rows="3" placeholder="Tell experts about yourself…"></textarea></div>
            <div class="col-12 pt-2"><button class="btn btn-gold" onclick="toast('Profile saved successfully','s')">Save Changes</button></div>
          </div>
        </div>
        <div class="glass-card">
          <div class="gc-title"><i class="bi bi-shield-lock"></i> Security Settings</div>
          <div class="row g-3">
            <div class="col-12"><label class="cp-label">Current Password</label><input type="password" class="cp-field" placeholder="••••••••"/></div>
            <div class="col-6"><label class="cp-label">New Password</label><input type="password" class="cp-field" placeholder="••••••••"/></div>
            <div class="col-6"><label class="cp-label">Confirm Password</label><input type="password" class="cp-field" placeholder="••••••••"/></div>
            <div class="col-12 pt-2"><button class="btn btn-outline-gold" onclick="toast('Password updated successfully','s')">Update Password</button></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════
// TOAST NOTIFICATION
// ═══════════════════════════════════════════
function toast(msg, type = 's') {
  const el = document.createElement('div');
  el.className = `lux-toast ${type}`;
  const icons = {s:'bi-check-circle-fill', e:'bi-exclamation-circle-fill'};
  el.innerHTML = `<i class="bi ${icons[type]} ti"></i><span class="tt">${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .4s, transform .4s';
    el.style.opacity = '0';
    el.style.transform = 'translateX(60px)';
    setTimeout(() => el.remove(), 400);
  }, 3200);
}
