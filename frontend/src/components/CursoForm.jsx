import { useState } from "react";

export function CursoForm({ onSubmit, loading }) {
  const [nombre, setNombre]     = useState("");
  const [profesor, setProfesor] = useState("");
  const [errors, setErrors]     = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await onSubmit(nombre, profesor);
      setNombre(""); setProfesor("");
    } catch (err) {
      const msgs = err.message.split(", ");
      const map  = {};
      msgs.forEach(m => {
        if (m.includes("nombre")) map.nombre = m;
        else if (m.includes("profesor")) map.profesor = m;
        else map.general = m;
      });
      setErrors(map);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        Nuevo Curso
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <div className="field">
            <label>Nombre del curso</label>
            <input type="text" placeholder="ej. Ingeniería de Software"
              value={nombre} onChange={e => setNombre(e.target.value)}
              className={errors.nombre ? "error" : ""} disabled={loading}/>
            {errors.nombre && <span className="field-error">{errors.nombre}</span>}
          </div>
          <div className="field">
            <label>Profesor</label>
            <input type="text" placeholder="ej. Dr. García"
              value={profesor} onChange={e => setProfesor(e.target.value)}
              className={errors.profesor ? "error" : ""} disabled={loading}/>
            {errors.profesor && <span className="field-error">{errors.profesor}</span>}
          </div>
          {errors.general && <span className="field-error">{errors.general}</span>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <><div className="spinner"/>Guardando…</> : <>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
              </svg>
              Guardar Curso</>}
          </button>
        </div>
      </form>
    </div>
  );
}