export function CursoList({ cursos, loading, onDelete }) {
  const initials = (nombre) =>
    nombre.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  if (loading) return (
    <div className="card">
      <div className="card-title">Lista de Cursos</div>
      <div style={{display:"flex",flexDirection:"column",gap:"0.75rem"}}>
        {[0,1,2].map(i => <div key={i} className="skeleton" style={{animationDelay:`${i*0.15}s`}}/>)}
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="list-header">
        <div className="card-title" style={{marginBottom:0}}>Lista de Cursos</div>
        <span className="badge">{cursos.length}</span>
      </div>
      {cursos.length === 0 ? (
        <div className="state-box">
          <p>No hay cursos todavía.<br/>¡Creá el primero!</p>
        </div>
      ) : (
        <div className="curso-list">
          {cursos.map((c,i) => (
            <div key={c.id} className="curso-item" style={{animationDelay:`${i*0.06}s`}}>
              <div className="curso-icon">{initials(c.nombre)}</div>
              <div className="curso-info">
                <div className="curso-nombre">{c.nombre}</div>
                <div className="curso-profesor">{c.profesor}</div>
              </div>
              <button className="btn-delete" onClick={() => onDelete(c.id)}>
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}