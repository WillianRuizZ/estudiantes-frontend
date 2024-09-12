import { Estudiante } from "./estudiante.interface";

export interface EstudiantesResponse {
  isSuccess: boolean;
  result: Estudiante[];
  message?: string;
}
