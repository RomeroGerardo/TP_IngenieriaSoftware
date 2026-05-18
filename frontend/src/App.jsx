import { useState, useEffect, useCallback } from "react";
import { CursoController } from "./controllers/CursoController";
import { CursoForm }        from "./components/CursoForm";
import { CursoList }        from "./components/CursoList";
import { AppConfig }        from "./config/AppConfig";
import "./index.css";

const controller = new CursoController();
const config     = AppConfig.getInstance();

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return { toasts, add };
}

function Toasts({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === "success"
            ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
          {t.msg}
        </div>
      ))}
    </div>
  );
}

function useBackendStatus(apiUrl) {
  const [online, setOnline] = useState(null);
  useEffect(() => {
    fetch(`${apiUrl}/cursos`, { signal: AbortSignal.timeout(2500) })
      .then(() => setOnline(true))
      .catch(() => setOnline(false));
  }, [apiUrl]);
  return online;
}

export default function App() {
  const [cursos, setCursos]           = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const { toasts, add: addToast }     = useToasts();
  const backendOnline                 = useBackendStatus(config.API_URL);

  const cargarCursos = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await controller.obtenerCursos();
      setCursos(data);
    } catch {
      addToast("No se pudieron cargar los cursos", "error");
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => { cargarCursos(); }, [cargarCursos]);

  const handleCrear = async (nombre, profesor) => {
    setLoadingForm(true);
    try {
      await controller.crearCurso(nombre, profesor);
      addToast("Curso creado exitosamente");
      await cargarCursos();
    } finally {
      setLoadingForm(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este curso?")) return;
    try {
      await controller.eliminarCurso(id);
      setCursos(c => c.filter(x => x.id !== id));
      addToast("Curso eliminado");
    } catch {
      addToast("No se pudo eliminar el curso", "error");
    }
  };

  return (
    <>
      <Toasts toasts={toasts} />
      <div className="app">
        <header className="header">
          <div className="header-eyebrow">Ingeniería de Software — MVP</div>
          <h1>Gestor de <span>Cursos</span><br />Online</h1>
          <div className="header-meta">
            <span className="status-dot">
              <span className={`dot ${backendOnline === true ? "online" : backendOnline === false ? "offline" : ""}`} />
              {backendOnline === null  ? "Conectando al backend…"
               : backendOnline        ? "Backend conectado"
               : "Backend offline — iniciá el servidor"}
            </span>
          </div>
        </header>
        <div className="grid">
          <CursoForm onSubmit={handleCrear} loading={loadingForm} />
          <CursoList cursos={cursos} loading={loadingList} onDelete={handleEliminar} />
        </div>
        <footer className="footer">
          {config.APP_NAME} · v{config.VERSION} · {new Date().getFullYear()}
        </footer>
      </div>
    </>
  );
}