import { Estudiante } from './../../interfaces/estudiante.interface';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../../services/estudiante.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-estudiante-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatIconModule,
    ConfirmDialogComponent,
    RouterModule 
  ],
  templateUrl: './estudiante-card.component.html',
  styleUrls: ['./estudiante-card.component.css'],
})
export class EstudianteCardComponent {
  @Input() estudiante!: Estudiante;
  @Output() wasRemoved = new EventEmitter<boolean>();

  // Inyectar los servicios
  private _dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  private _estudianteService = inject(EstudianteService);
  private _router = inject(Router)

  // Método para eliminar registro
  onDelete() {
    if (!this.estudiante.id) {
      this._toast.error('No se puede eliminar el registro', 'Error');
    } else {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: true,
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
      });
      dialogRef
        .afterClosed()
        .pipe(
          filter((x) => x), // Filtra los valores falsy
          switchMap(() =>
            this._estudianteService.deleteEstudiante(this.estudiante.id)
          )
        )
        .subscribe({
          next: (resp) => { // Bloque next para manejar la respuesta exitosa
            if (resp.isSuccess) {
              this._toast.success(resp.message, 'Eliminado');
              this.wasRemoved.emit(true);
            }
          },
          error: (isError: HttpErrorResponse) => { // Bloque error para manejar errores
            this._toast.error(isError.message, isError.statusText);
          }
        });
    }
  }

  // Método para editar el estudiante
  onEdit() {
    this._router.navigate(['/editar', this.estudiante.id]);
  }

  // Método para ver los detalles del estudiante
  onViewDetails() {
    this._router.navigate(['/detalles', this.estudiante.id]);
  }


}
