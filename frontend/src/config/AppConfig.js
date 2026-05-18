export class AppConfig {
  static _instance = null;

  constructor() {
    if (AppConfig._instance) return AppConfig._instance;
    this.API_URL  = "http://localhost:3000";
    this.APP_NAME = "Gestor de Cursos Online";
    this.VERSION  = "1.0.0";
    AppConfig._instance = this;
  }

  static getInstance() {
    if (!AppConfig._instance) new AppConfig();
    return AppConfig._instance;
  }
}