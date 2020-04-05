import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: string;
  contrasenia: string;
  constructor(private _authSer: AuthService, private _router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('Autenticated')) {
      this._router.navigate(['dashboard']);
    }
  }

  iniciarSesion() {
    this._authSer.verificarCuenta(this.correo, this.contrasenia).subscribe((resultado) => {
      console.log(resultado);
      this._router.navigate(['dashboard']);
      localStorage.setItem('Autenticated', 'true');
      localStorage.setItem('usAu', this.correo);

      
    }, (error) => {
      console.log(error);
      document.getElementById('loginError').innerHTML = error.error.errors.toString();
    });
  }

}
