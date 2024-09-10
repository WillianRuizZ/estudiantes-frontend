import { CrearResponse } from "./crear-response.interface";

export interface ActualizarResponse{
  isSuccess: boolean;
  result: CrearResponse;
  message?: string;
}
