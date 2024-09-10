import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearActualizar, EstudianteResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private _baseURL = 'https://localhost:7245/';
  private http = inject(HttpClient);
  constructor() { }

  getEstudiantes(): Observable<EstudianteResponse> {
    return this.http.get<EstudianteResponse>(`${this._baseURL}api/estudiantes`);
  }

  getEstudiante(id: string): Observable<EstudianteResponse> {
    return this.http.get<EstudianteResponse>(
      `${this._baseURL}api/estudiantes/${id}`
    );
  }

  postEstudiante(
    nuevoEstudiante: CrearActualizar): Observable<EstudianteResponse> {
    return this.http.post<EstudianteResponse>(
      `${this._baseURL}api/estudiantes`,
      nuevoEstudiante
    );
  }

  putEstudiante(id: string, estudiante: CrearActualizar) {
    return this.http.put<EstudianteResponse>(
      `${this._baseURL}api/estudiantes/${id}`,
      estudiante
    );
  }

  deleteEstudiante(id: string) {
    return this.http.delete<EstudianteResponse>(
      `${this._baseURL}api/estudiantes/${id}`
    );
  }
}
