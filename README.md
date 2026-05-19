# EduFlow 🎓

Plataforma de e-learning con panel para profesores y alumnos.

---

## 📁 Estructura del proyecto

```
eduflow/
├── frontend/          ← rama: frontend (vos)
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── data.js    ← mock data (se reemplaza por API)
│       └── app.js     ← lógica + comentarios TODO: API CALL
│
└── backend/           ← rama: backend (tu compañero)
    └── ...
```

---

## 🌿 Flujo de trabajo con Git (ramas)

### Primera vez — clonar y configurar ramas

```bash
# 1. Crear el repositorio en GitHub (solo una persona)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/usuario/eduflow.git
git push -u origin main

# 2. Crear rama frontend (vos)
git checkout -b frontend
git push -u origin frontend

# 3. Tu compañero crea rama backend
git checkout -b backend
git push -u origin backend
```

### Trabajo diario

```bash
# Siempre trabajar en tu rama
git checkout frontend

# Guardar cambios
git add .
git commit -m "descripcion del cambio"
git push origin frontend

# Cuando quieran unir todo → Pull Request en GitHub
# frontend → main  /  backend → main
```

---

## 🚀 Cómo abrir el frontend

Simplemente abrí `frontend/index.html` en tu navegador.

No necesita servidor. Funciona con datos mock hasta que el backend esté listo.

---

## 🔗 Conexión con el Backend

En `frontend/js/app.js` encontrarás comentarios marcados con:

```js
// TODO: API CALL → POST /api/auth/alumno/login
```

Cuando el backend esté listo, reemplazá esas líneas por llamadas `fetch()`. Ejemplo:

```js
// ANTES (mock):
const al = MOCK_ALUMNOS.find(x => x.email === e && x.pass === p);

// DESPUÉS (con API):
const res = await fetch('/api/auth/alumno/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: e, password: p })
});
const al = await res.json();
```

### Rutas esperadas del backend

| Método | Ruta                          | Descripción                    |
|--------|-------------------------------|--------------------------------|
| POST   | /api/auth/profesor/login      | Login profesor                 |
| POST   | /api/auth/alumno/login        | Login alumno                   |
| POST   | /api/auth/alumno/register     | Registro alumno                |
| GET    | /api/cursos                   | Listar todos los cursos        |
| POST   | /api/cursos                   | Crear curso (profesor)         |
| GET    | /api/cursos/:id               | Ver detalle de un curso        |
| POST   | /api/cursos/:id/like          | Dar/quitar like                |
| POST   | /api/cursos/:id/inscribir     | Inscribirse/desinscribirse     |
| POST   | /api/cursos/:id/comentar      | Agregar comentario             |
| GET    | /api/cursos/estadisticas      | Stats del profesor             |
| GET    | /api/alumno/inscripciones     | Cursos del alumno              |

---

## 🧪 Credenciales de prueba (mock)

**Profesor:**
- Usuario: `prof.juan`
- Contraseña: `1234`

**Alumno:**
- Email: `alumno@demo.com`
- Contraseña: `1234`
