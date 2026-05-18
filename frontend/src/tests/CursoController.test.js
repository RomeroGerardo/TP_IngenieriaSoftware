import { describe, it, expect, vi, beforeEach } from "vitest";
import { CursoController } from "../controllers/CursoController";
import { CursoModel, BackendAdapter } from "../models/CursoModel";
import { AppConfig } from "../config/AppConfig";

describe("CursoController", () => {
  let controller, mockAdapter;

  beforeEach(() => {
    mockAdapter = { fetchCursos: vi.fn(), postCurso: vi.fn(), deleteCurso: vi.fn() };
    controller = new CursoController();
    controller.model = new CursoModel(mockAdapter);
  });

  it("debe lanzar error si nombre y profesor están vacíos", async () => {
    await expect(controller.crearCurso("", "")).rejects.toThrow("El nombre es obligatorio");
  });
  it("debe lanzar error si el nombre tiene menos de 3 caracteres", async () => {
    await expect(controller.crearCurso("AB", "García")).rejects.toThrow("al menos 3 caracteres");
  });
  it("debe crear curso con datos válidos", async () => {
    mockAdapter.postCurso.mockResolvedValue({ id: 1, nombre: "Ingeniería", profesor: "García" });
    const r = await controller.crearCurso("Ingeniería", "García");
    expect(mockAdapter.postCurso).toHaveBeenCalledWith({ nombre: "Ingeniería", profesor: "García" });
    expect(r.id).toBe(1);
  });
  it("debe recortar espacios en blanco", async () => {
    mockAdapter.postCurso.mockResolvedValue({ id: 2 });
    await controller.crearCurso("  Matemáticas  ", "  López  ");
    expect(mockAdapter.postCurso).toHaveBeenCalledWith({ nombre: "Matemáticas", profesor: "López" });
  });
  it("debe lanzar error al eliminar con ID undefined", async () => {
    await expect(controller.eliminarCurso(undefined)).rejects.toThrow("ID inválido");
  });
  it("debe retornar lista de cursos", async () => {
    mockAdapter.fetchCursos.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const r = await controller.obtenerCursos();
    expect(r).toHaveLength(2);
  });
});

describe("AppConfig Singleton", () => {
  it("debe retornar siempre la misma instancia", () => {
    expect(AppConfig.getInstance()).toBe(AppConfig.getInstance());
  });
  it("debe tener los valores de configuración esperados", () => {
    const c = AppConfig.getInstance();
    expect(c.APP_NAME).toBe("Gestor de Cursos Online");
  });
});