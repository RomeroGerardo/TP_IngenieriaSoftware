/**
 * data.js — Datos simulados (mock)
 * ================================
 * NOTA PARA EL BACKEND:
 * Cuando el backend esté listo, estos datos se reemplazarán
 * por llamadas a la API REST. Ver comentarios en app.js
 * donde dice "// TODO: API CALL"
 */

const MOCK_PROFESORES = [
  { user: 'prof.juan', pass: '1234', nombre: 'Juan Rosas' },
  { user: 'prof.maria', pass: '1234', nombre: 'María González' },
];

let MOCK_ALUMNOS = [
  {
    email: 'alumno@demo.com',
    pass: '1234',
    nombre: 'Carlos',
    apellido: 'López',
    nivel: 'Universitario',
    edad: 22
  }
];

let MOCK_CURSOS = [
  {
    id: 1,
    nombre: 'Ingeniería de Software',
    desc: 'Principios, patrones y prácticas del desarrollo de software profesional. Desde requerimientos hasta despliegue.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    video: 'https://www.youtube.com/watch?v=example1',
    archivos: ['guia-intro.pdf', 'ejercicios.zip'],
    profesor: 'Juan Rosas',
    fecha: '2024-03-10',
    vistas: 128,
    likes: 34,
    inscriptos: 47,
    comentarios: [
      { user: 'Ana García', texto: '¡Excelente curso, muy completo!', fecha: '2024-03-15' },
      { user: 'Luis Méndez', texto: 'Los ejercicios prácticos son muy útiles.', fecha: '2024-03-18' }
    ]
  },
  {
    id: 2,
    nombre: 'Diseño UX/UI',
    desc: 'Aprendé a crear interfaces intuitivas y experiencias de usuario memorables con Figma y principios de diseño.',
    img: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=600&q=80',
    video: 'https://www.youtube.com/watch?v=example2',
    archivos: [],
    profesor: 'Juan Rosas',
    fecha: '2024-04-02',
    vistas: 89,
    likes: 21,
    inscriptos: 30,
    comentarios: []
  },
  {
    id: 3,
    nombre: 'Python para principiantes',
    desc: 'Comenzá desde cero con Python. Variables, funciones, estructuras de datos y tu primer proyecto real.',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    video: 'https://www.youtube.com/watch?v=example3',
    archivos: ['ejercicios-python.pdf'],
    profesor: 'María González',
    fecha: '2024-05-01',
    vistas: 203,
    likes: 58,
    inscriptos: 72,
    comentarios: [
      { user: 'Pedro Ruiz', texto: 'Perfecto para empezar, muy claro.', fecha: '2024-05-10' }
    ]
  }
];

let nextCursoId = 4;
