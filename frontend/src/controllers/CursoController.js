import { CursoModel } from "../models/CursoModel.js";

export class CursoController {
  constructor() {
    this.model = new CursoModel();
  }
  async obtenerCursos()            { return await this.model.getAll(); }
  async crearCurso(nombre, profesor) {
    const errores = this._validar(nombre, profesor);
    if (errores.length > 0) throw new Error(errores.join(", "));
    return await this.model.create({ nombre: nombre.trim(), profesor: profesor.trim() });
  }
  async eliminarCurso(id) {
    if (!id) throw new Error("ID inválido");
    return await this.model.delete(id);
  }
  _validar(nombre, profesor) {
    const errores = [];
    if (!nombre || !nombre.trim()) errores.push("El nombre es obligatorio");
    if (!profesor || !profesor.trim()) errores.push("El profesor es obligatorio");
    if (nombre && nombre.trim().length < 3) errores.push("El nombre debe tener al menos 3 caracteres");
    if (profesor && profesor.trim().length < 2) errores.push("El nombre del profesor debe tener al menos 2 caracteres");
    return errores;
  }
}