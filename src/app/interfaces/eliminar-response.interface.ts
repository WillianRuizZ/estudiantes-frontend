import { Estudiante } from "./estudiante.interface";

export interface EliminarResponse {
  isSuccess: boolean;
  result: Estudiante;
  message: string;
}
