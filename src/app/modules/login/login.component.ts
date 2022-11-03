import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  loading = false; //iniciar seción, si la contraseña es valida muestra el spinner

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  ingresar() {
    const usuario = this.formulario.value.usuario;
    const contraseña = this.formulario.value.contraseña;

    if (usuario == 'n' && contraseña == 'n') {
      //en caso contrario se rediccionara al dashboard (tablero)
      this.falsoloading();
    }
    //se muestra un error
    else {
      this.error();
      this.formulario.reset();
    }
  }
  //formato al mensaje de error
  error() {
    this._snackBar.open('Usuario o contraseña ingresado son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  falsoloading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['inicio']);
    }, 100);
  }
}
