import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean  // Se recibe el dato booleano para manejar la confirmación
  ) {}

  // Define el tipo de retorno como void
  onNoClick(): void {
    this.dialogRef.close();  // Cierra el diálogo sin hacer nada
  }

  // Método para confirmar la acción
  onConfirm(): void {
    this.dialogRef.close(true);  // Retorna true para confirmar la acción
  }
}
