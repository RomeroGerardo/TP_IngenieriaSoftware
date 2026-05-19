/**
 * app.js — Lógica principal de EduFlow
 * =====================================
 * Estado actual: Frontend con mock data
 * Cuando el backend esté listo, reemplazar las secciones
 * marcadas con "// TODO: API CALL" por fetch() a la API REST.
 *
 * Estructura de rutas esperada del backend:
 *   POST /api/auth/profesor/login   → { token, nombre }
 *   POST /api/auth/alumno/login     → { token, nombre, apellido }
 *   POST /api/auth/alumno/register  → { token, nombre, apellido }
 *   GET  /api/cursos                → [ ...cursos ]
 *   POST /api/cursos                → { id, ...curso }
 *   POST /api/cursos/:id/like       → { likes }
 *   POST /api/cursos/:id/inscribir  → { inscriptos }
 *   POST /api/cursos/:id/comentar   → { comentario }
 */

// ===================== ESTADO GLOBAL =====================
let alumnoActual = null;
let inscriptos    = [1]; // IDs de cursos donde el alumno está inscripto
let misLikes      = []; // IDs de cursos con like del alumno actual

// ===================== HELPERS =====================
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function switchTab(t) {
  document.getElementById('form-login').style.display = t === 'login' ? 'block' : 'none';
  document.getElementById('form-reg').style.display   = t === 'reg'   ? 'block' : 'none';
  document.getElementById('tab-login').classList.toggle('active', t === 'login');
  document.getElementById('tab-reg').classList.toggle('active',   t === 'reg');
}

function logout() {
  alumnoActual = null;
  inscriptos   = [];
  misLikes     = [];
  show('s-home');
}

// ===================== AUTH: PROFESOR =====================
function loginProf() {
  const u = document.getElementById('p-user').value.trim();
  const p = document.getElementById('p-pass').value;

  // TODO: API CALL → POST /api/auth/profesor/login { usuario: u, password: p }
  const prof = MOCK_PROFESORES.find(x => x.user === u && x.pass === p);

  if (!prof) {
    document.getElementById('p-err').textContent = 'Usuario o contraseña incorrectos.';
    return;
  }
  document.getElementById('p-err').textContent = '';
  renderProfDash();
  show('s-prof-dash');
}

// ===================== AUTH: ALUMNO =====================
function loginAlum() {
  const e = document.getElementById('a-email').value.trim();
  const p = document.getElementById('a-pass').value;

  // TODO: API CALL → POST /api/auth/alumno/login { email: e, password: p }
  const al = MOCK_ALUMNOS.find(x => x.email === e && x.pass === p);

  if (!al) {
    document.getElementById('a-err').textContent = 'Correo o contraseña incorrectos.';
    return;
  }
  document.getElementById('a-err').textContent = '';
  alumnoActual = al;
  document.getElementById('alum-avatar').textContent =
    (al.nombre[0] + (al.apellido ? al.apellido[0] : '')).toUpperCase();
  renderAlumDash();
  show('s-alum-dash');
}

function registrar() {
  const n   = document.getElementById('r-nombre').value.trim();
  const ap  = document.getElementById('r-apellido').value.trim();
  const em  = document.getElementById('r-email').value.trim();
  const ed  = document.getElementById('r-edad').value;
  const nv  = document.getElementById('r-nivel').value;
  const ps  = document.getElementById('r-pass').value;

  if (!n || !ap || !em || !ed || !nv || !ps) {
    document.getElementById('r-err').textContent = 'Completá todos los campos.';
    return;
  }
  if (MOCK_ALUMNOS.find(x => x.email === em)) {
    document.getElementById('r-err').textContent = 'El correo ya está registrado.';
    return;
  }
  document.getElementById('r-err').textContent = '';

  // TODO: API CALL → POST /api/auth/alumno/register { nombre, apellido, email, edad, nivel, password }
  const nuevo = { email: em, pass: ps, nombre: n, apellido: ap, nivel: nv, edad: parseInt(ed) };
  MOCK_ALUMNOS.push(nuevo);

  alumnoActual = nuevo;
  document.getElementById('alum-avatar').textContent = (n[0] + ap[0]).toUpperCase();
  renderAlumDash();
  show('s-alum-dash');
}

// ===================== NAVEGACIÓN PROFESOR =====================
function profNav(v) {
  ['mis', 'add', 'stats'].forEach(x => {
    document.getElementById('pv-' + x).style.display = x === v ? 'block' : 'none';
    document.getElementById('nav-' + x).classList.toggle('active', x === v);
  });
  if (v === 'stats') renderStats();
}

// ===================== NAVEGACIÓN ALUMNO =====================
function alumNav(v) {
  document.getElementById('av-cat').style.display = v === 'cat' ? 'block' : 'none';
  document.getElementById('av-mis').style.display = v === 'mis' ? 'block' : 'none';
  document.getElementById('nav-cat').classList.toggle('active',   v === 'cat');
  document.getElementById('nav-mis-c').classList.toggle('active', v === 'mis');
  if (v === 'cat') renderCatalogo();
  if (v === 'mis') renderMisInscriptos();
}

// ===================== DASHBOARD PROFESOR =====================
function renderProfDash() {
  profNav('mis');

  // TODO: API CALL → GET /api/cursos (filtrado por profesor autenticado)
  const cursos = MOCK_CURSOS;

  document.getElementById('prof-cursos-list').innerHTML = cursos.map(c => `
    <div class="card-course">
      <div class="card-course-img" style="background-image:url('${c.img}');">
        <div style="padding:8px;"><span class="tag">${c.vistas} vistas</span></div>
      </div>
      <div class="card-course-body">
        <div class="card-course-title">${c.nombre}</div>
        <div style="color:var(--text2);font-size:13px;margin-bottom:12px;line-height:1.5;">${c.desc.substring(0, 80)}...</div>
        <div class="card-course-meta">
          <span><i class="ti ti-users" aria-hidden="true"></i> ${c.inscriptos} inscriptos</span>
          <span><i class="ti ti-heart" aria-hidden="true"></i> ${c.likes} likes</span>
          <span><i class="ti ti-message" aria-hidden="true"></i> ${c.comentarios.length}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderStats() {
  // TODO: API CALL → GET /api/cursos/estadisticas
  const cursos = MOCK_CURSOS;
  const total_vistas     = cursos.reduce((a, c) => a + c.vistas, 0);
  const total_inscriptos = cursos.reduce((a, c) => a + c.inscriptos, 0);
  const total_likes      = cursos.reduce((a, c) => a + c.likes, 0);

  document.getElementById('stats-grid').innerHTML = [
    { label: 'Total vistas',       val: total_vistas,     icon: 'ti-eye'       },
    { label: 'Inscriptos totales', val: total_inscriptos, icon: 'ti-users'     },
    { label: 'Me gustas',          val: total_likes,      icon: 'ti-heart'     },
  ].map(s => `
    <div class="stat-card">
      <i class="ti ${s.icon}" aria-hidden="true"></i>
      <div class="stat-value">${s.val}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  document.getElementById('stats-detalle').innerHTML =
    `<div style="font-size:16px;font-weight:600;margin-bottom:12px;">Detalle por curso</div>` +
    cursos.map(c => `
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="font-weight:600;">${c.nombre}</div>
          <div style="display:flex;gap:16px;font-size:13px;color:var(--text2);">
            <span><i class="ti ti-eye" aria-hidden="true"></i> ${c.vistas}</span>
            <span><i class="ti ti-users" aria-hidden="true"></i> ${c.inscriptos}</span>
            <span><i class="ti ti-heart" aria-hidden="true"></i> ${c.likes}</span>
          </div>
        </div>
      </div>
    `).join('');
}

function agregarCurso() {
  const nombre = document.getElementById('nc-nombre').value.trim();
  const desc   = document.getElementById('nc-desc').value.trim();
  const video  = document.getElementById('nc-video').value.trim();
  const imgVal = document.getElementById('nc-img').value.trim();
  const archVal = document.getElementById('nc-arch').value.trim();

  if (!nombre || nombre.length < 2) {
    document.getElementById('nc-err').textContent = 'El nombre debe tener al menos 2 caracteres.';
    return;
  }
  if (!desc) {
    document.getElementById('nc-err').textContent = 'Ingresá una descripción.';
    return;
  }
  document.getElementById('nc-err').textContent = '';

  // TODO: API CALL → POST /api/cursos { nombre, desc, img, video, archivos }
  const nuevoCurso = {
    id: nextCursoId++,
    nombre,
    desc,
    img: imgVal || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
    video,
    archivos: archVal ? archVal.split(',').map(x => x.trim()) : [],
    profesor: 'Juan Rosas',
    fecha: new Date().toISOString().split('T')[0],
    vistas: 0,
    likes: 0,
    inscriptos: 0,
    comentarios: []
  };
  MOCK_CURSOS.push(nuevoCurso);

  ['nc-nombre', 'nc-desc', 'nc-img', 'nc-video', 'nc-arch'].forEach(id => {
    document.getElementById(id).value = '';
  });

  profNav('mis');
  renderProfDash();
}

// ===================== DASHBOARD ALUMNO =====================
function renderAlumDash() { alumNav('cat'); }

function renderCatalogo() {
  // TODO: API CALL → GET /api/cursos
  const cursos = MOCK_CURSOS;
  document.getElementById('alum-cursos-grid').innerHTML = cursos.map(c => `
    <div class="card-course" onclick="verCurso(${c.id})">
      <div class="card-course-img" style="background-image:url('${c.img}');"></div>
      <div class="card-course-body">
        <div class="card-course-title">${c.nombre}</div>
        <div class="card-course-prof">${c.profesor}</div>
        <div class="card-course-meta">
          <span><i class="ti ti-eye" aria-hidden="true"></i> ${c.vistas}</span>
          <span><i class="ti ti-heart" aria-hidden="true"></i> ${c.likes}</span>
          ${inscriptos.includes(c.id) ? '<span class="tag">Inscripto</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function renderMisInscriptos() {
  // TODO: API CALL → GET /api/alumno/inscripciones
  const mis = MOCK_CURSOS.filter(c => inscriptos.includes(c.id));
  document.getElementById('mis-inscriptos').innerHTML = mis.length
    ? mis.map(c => `
        <div class="card-course" onclick="verCurso(${c.id})">
          <div class="card-course-img" style="background-image:url('${c.img}');height:120px;"></div>
          <div class="card-course-body">
            <div class="card-course-title">${c.nombre}</div>
            <div class="card-course-prof">${c.profesor}</div>
          </div>
        </div>
      `).join('')
    : '<div style="color:var(--text2);">No estás inscripto en ningún curso todavía.</div>';
}

// ===================== DETALLE CURSO =====================
function verCurso(id) {
  // TODO: API CALL → GET /api/cursos/:id (y registrar vista)
  const c = MOCK_CURSOS.find(x => x.id === id);
  if (!c) return;

  c.vistas++;
  const isInsc  = inscriptos.includes(id);
  const isLiked = misLikes.includes(id);

  document.getElementById('detalle-content').innerHTML = `
    <img class="detalle-img" src="${c.img}" alt="${c.nombre}">

    <div class="detalle-top">
      <div>
        <div class="detalle-nombre">${c.nombre}</div>
        <div class="detalle-meta">Por <strong>${c.profesor}</strong> · ${c.fecha}</div>
      </div>
      <div class="detalle-actions">
        <button class="btn-like" id="btn-like-${id}"
          style="background:${isLiked ? 'rgba(244,114,182,.2)' : 'var(--bg3)'};
                 border:1.5px solid ${isLiked ? 'var(--pink)' : 'var(--border)'};
                 color:${isLiked ? 'var(--pink)' : 'var(--text2)'};"
          onclick="toggleLike(${id})">
          <i class="ti ti-heart" aria-hidden="true"></i> <span id="likes-count-${id}">${c.likes}</span>
        </button>
        <button class="btn-inscribir" id="btn-insc-${id}"
          style="background:${isInsc ? 'rgba(239,68,68,.1)' : 'var(--purple2)'};
                 color:${isInsc ? 'var(--red)' : 'white'};"
          onclick="toggleInscripcion(${id})">
          ${isInsc ? 'Desinscribirse' : 'Inscribirse'}
        </button>
      </div>
    </div>

    <div class="detalle-stats">
      <span><i class="ti ti-eye" aria-hidden="true"></i> ${c.vistas} vistas</span>
      <span><i class="ti ti-users" aria-hidden="true"></i> ${c.inscriptos} inscriptos</span>
    </div>

    <div class="card detalle-section">
      <div class="detalle-section-title">Descripción</div>
      <div style="color:var(--text2);font-size:14px;line-height:1.7;">${c.desc}</div>
    </div>

    ${c.video ? `
    <div class="card detalle-section">
      <div class="detalle-section-title"><i class="ti ti-player-play" style="color:var(--purple)" aria-hidden="true"></i> Video del curso</div>
      <a href="${c.video}" target="_blank" style="color:var(--purple);font-size:14px;text-decoration:none;">${c.video}</a>
    </div>` : ''}

    ${c.archivos.length ? `
    <div class="card detalle-section">
      <div class="detalle-section-title"><i class="ti ti-paperclip" style="color:var(--purple)" aria-hidden="true"></i> Archivos adjuntos</div>
      ${c.archivos.map(a => `
        <div class="archivo-item">
          <i class="ti ti-file" aria-hidden="true"></i> ${a}
        </div>
      `).join('')}
    </div>` : ''}

    <div class="card">
      <div class="detalle-section-title">Comentarios (${c.comentarios.length})</div>
      <div id="comentarios-lista">
        ${c.comentarios.map(cm => `
          <div class="comentario-item">
            <div class="comentario-avatar">${cm.user[0]}</div>
            <div>
              <div class="comentario-user">${cm.user}</div>
              <div class="comentario-texto">${cm.texto}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="comment-form">
        <input class="input-field" id="new-comment" type="text" placeholder="Dejá un comentario...">
        <button class="btn-purple" onclick="comentar(${id})">Enviar</button>
      </div>
    </div>
  `;

  show('s-curso-detalle');
}

function toggleLike(id) {
  const c = MOCK_CURSOS.find(x => x.id === id);
  if (!c) return;

  // TODO: API CALL → POST /api/cursos/:id/like
  if (misLikes.includes(id)) {
    misLikes = misLikes.filter(x => x !== id);
    c.likes--;
  } else {
    misLikes.push(id);
    c.likes++;
  }
  verCurso(id);
}

function toggleInscripcion(id) {
  const c = MOCK_CURSOS.find(x => x.id === id);
  if (!c) return;

  // TODO: API CALL → POST /api/cursos/:id/inscribir
  if (inscriptos.includes(id)) {
    inscriptos = inscriptos.filter(x => x !== id);
    c.inscriptos--;
  } else {
    inscriptos.push(id);
    c.inscriptos++;
  }
  verCurso(id);
}

function comentar(id) {
  const c   = MOCK_CURSOS.find(x => x.id === id);
  const inp = document.getElementById('new-comment');
  const txt = inp.value.trim();
  if (!txt || !c) return;

  // TODO: API CALL → POST /api/cursos/:id/comentar { texto }
  const nombreCompleto = alumnoActual
    ? alumnoActual.nombre + ' ' + alumnoActual.apellido
    : 'Usuario';

  c.comentarios.push({
    user:  nombreCompleto,
    texto: txt,
    fecha: new Date().toISOString().split('T')[0]
  });
  inp.value = '';
  verCurso(id);
}
