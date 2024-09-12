import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../../services/estudiante.service';
import { CrearActualizar, Estudiante } from '../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    SpinnerComponent,
  ],
  templateUrl: './upsert.component.html',
  styleUrl: './upsert.component.css',
})
export class UpsertComponent implements OnInit {
  //crear y actualizar un estudiante
  private _activeRoute = inject(ActivatedRoute);
  private _route = inject(Router);
  private _toast = inject(ToastrService);
  private _estudianteService = inject(EstudianteService);
  private _fb = inject(FormBuilder);

  //Variables
  private crearEstudiante?: CrearActualizar;
  private estudiante?: Estudiante;
  titulo = 'Consultar los datos del estudiante';
  isLoading = false;
  mensaje = 'Cargando datos del estudiante...';
  public formEstudiante: FormGroup;
  constructor() {
    this.formEstudiante = this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      documento: ['', [Validators.required, Validators.minLength(5)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      genero: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isLoading = true;

      this._estudianteService.getEstudiante(id).subscribe({
        next: (x) => {
          if (x.isSuccess) {
            this.estudiante = x.result;
            this.titulo = 'Actualizar los datos del estudiante';
            this.formEstudiante.patchValue(this.estudiante);
            this.isLoading = false;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this._toast.error(error.error.message);
        },
      });
    }
  }
  onSubmit() {
    //si el formulario es valido se procede a enviar la peticion
    //se evalua si el estudiante.id esxiste se actualiza si no se crea
    if (this.formEstudiante.valid) {
      if (this.estudiante?.id) {
        this.ediatrEstudiante();
      } else {
        this.nuevoEstudiante();
      }
    } else {
      this._toast.warning(
        'el formulario no es correcto',
        'Fallo en la validación'
      );
      this.formEstudiante.reset();
    }
  }

  //Metodos para crear y editar
  private nuevoEstudiante() {
    this.crearEstudiante = this.formEstudiante.value;
    if (this.crearEstudiante) {
      this._estudianteService.postEstudiante(this.crearEstudiante).subscribe({
        next: (resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Estudiante Creado');
            this._route.navigate(['/home']);
          } else {
            this._toast.error(resp.message);
          }
        },
        error: (isError: HttpErrorResponse) => {
          this._toast.error(isError.error.messaje, isError.statusText);
          this.formEstudiante.reset();
          this._route.navigate(['/home']);
        },
      });
    }
  }

  private ediatrEstudiante() {
    const estudianteActualizado: CrearActualizar = {
      ...this.formEstudiante.value,
      id: this.estudiante!.id
    };

    this._estudianteService
      .putEstudiante(estudianteActualizado.id, estudianteActualizado)
      .subscribe({
        next: (resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Estudiante actualizado');
            this._route.navigate(['/home']);
          } else {
            this._toast.error(resp.message);
          }
        },
        error: (isError: HttpErrorResponse) => {
          this._toast.error(isError.error.message, isError.statusText);
          this.formEstudiante.reset();
        },
      });
  }
}
