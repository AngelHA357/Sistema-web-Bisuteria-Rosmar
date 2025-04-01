
export class ControllerError extends Error {
  mensaje : string;

  constructor( mensaje: string) {
      super(mensaje) ;
      this.name = this.constructor.name;
      this.mensaje = mensaje;
      Error.captureStackTrace(this, this.constructor);
  }
}