import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { EstudianteCardComponent } from '../../components/estudiante-card/estudiante-card.component';
import { RouterModule } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';

import { CommonModule } from '@angular/common';
import { Estudiante } from '../../interfaces';

@Component({
  standalone: true,
  imports: [
    SpinnerComponent,
    MatButtonModule,
    EstudianteCardComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {

  private _estudianteService = inject(EstudianteService);
  public estudiante: WritableSignal<Estudiante[]> = signal([]); // Estado reactivo para estudiantes
  isLoading: WritableSignal<boolean> = signal(true); // Estado reactivo para mostrar/ocultar el spinner
  mensaje = 'Cargando listado de estudiantes...';

  ngOnInit(): void {
    this.getAll();
  }

  // Manejar la eliminación de un estudiante
  wasDelete(x: boolean) {
    if (x) {
      this.isLoading.set(true);
      setTimeout(() => {
        this.getAll(); // Recargar los estudiantes después de la eliminación
      }, 1500);
    }
  }

  // Obtener todos los estudiantes
  getAll() {
    this._estudianteService.getEstudiantes().subscribe(x => {
      if (x.isSuccess) {
        this.estudiante.set(x.result);
        setTimeout(() => {
          this.isLoading.set(false); // Ocultar el spinner después de cargar
        }, 1400);
      }
    });
  }


}
