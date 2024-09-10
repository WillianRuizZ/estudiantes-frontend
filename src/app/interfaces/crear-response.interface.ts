import { Estudiante } from "./estudiante.interface";

export interface CrearResponse {
  isSuccess: boolean;
  result: Estudiante;
  message?: string;
}
