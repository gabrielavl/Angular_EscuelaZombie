import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

let apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }

  /*headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
  });*/

  guardarUsuario(correo: string, contrasenia: string) {
    let nuevoUsuario = {
      email: correo,
      password: contrasenia
    };
    return this._http.post(apiUrl + 'registro/new', nuevoUsuario);
  }

  verificarCuenta(correo: string, contrasenia: string) {
    const usuario = {
      email: correo,
      password: contrasenia}
      ;
    return this._http.post(apiUrl + 'usuario/login', usuario);
  }

}
