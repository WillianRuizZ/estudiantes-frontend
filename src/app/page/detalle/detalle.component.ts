import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    SpinnerComponent,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  private _activeRoute = inject(ActivatedRoute);
  private _estudianteService = inject(EstudianteService);
  private _router = inject(Router);
  private _toast = inject(ToastrService);

  isLoading: boolean = true;
  estudiante?: Estudiante;

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/home']);
    } else {
      this._estudianteService.getEstudiante(id).subscribe({
        next: (x) => {
          if (x.isSuccess) {
            this.estudiante = x.result;
            this.isLoading = false;
          } else {
            this._toast.error(x.message);
            this._router.navigate(['/home']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this._toast.error(error.error.message);
        }
      });
    }
  }
}
