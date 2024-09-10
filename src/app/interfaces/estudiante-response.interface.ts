import { Estudiante } from "./estudiante.interface";

export interface EstudianteResponse {
 isSuccess: boolean;
 result: Estudiante;
 message?: string;
}
