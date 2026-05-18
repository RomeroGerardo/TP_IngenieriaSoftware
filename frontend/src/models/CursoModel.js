export class BackendAdapter {
  constructor(baseURL = "http://localhost:3000") {
    this.baseURL = baseURL;
  }
  async fetchCursos() {
    const res = await fetch(`${this.baseURL}/cursos`);
    if (!res.ok) throw new Error(`Error al obtener cursos: ${res.status}`);
    return res.json();
  }
  async postCurso(data) {
    const res = await fetch(`${this.baseURL}/cursos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Error al crear curso: ${res.status}`);
    return res.json();
  }
  async deleteCurso(id) {
    const res = await fetch(`${this.baseURL}/cursos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error al eliminar curso: ${res.status}`);
    return true;
  }
}

export class CursoModel {
  constructor(adapter = new BackendAdapter()) {
    this.adapter = adapter;
  }
  async getAll()          { return await this.adapter.fetchCursos(); }
  async create(data)      { return await this.adapter.postCurso(data); }
  async delete(id)        { return await this.adapter.deleteCurso(id); }
}