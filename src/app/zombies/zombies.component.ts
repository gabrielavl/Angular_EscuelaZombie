import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zombies',
  templateUrl: './zombies.component.html',
  styleUrls: ['./zombies.component.css']
})
export class ZombiesComponent implements OnInit {

  // tslint:disable: no-inferrable-types
  nombre: string ;
  email: string ; // email del zombie
  tipo: string ;
  propietario: string; // email del usuario logeado
  zombies: any;
  id: string;
  zombieInfo: any;
  constructor(private _dataService: DataService, private _router: Router, private _rendered: Renderer2) { }

  ngOnInit(): void {
    this.propietario = localStorage.getItem('usAu');
    if (!localStorage.getItem('Autenticated')) {
      this._router.navigate(['login']);
    }

    console.log('Actualizando tabla');
    this.ActualizarTabla();
  }

  ActualizarTabla() {
    this._dataService.zombieObservable.subscribe((resultados) => {
      this.zombies = resultados;
    });
    this._dataService.obtenerZombies(this.propietario);
  }

  DeleteZombie(id: string) {
    console.log(this.email);
    return this._dataService.eliminarZombie(id).subscribe((resultado) => {
    console.log(resultado);
    this._dataService.obtenerZombies(this.propietario);
    }, (error) => {
      console.log(error);
      document.getElementById('ErrorMessageZombie').innerHTML = error.error.mensajeError.toString();
    }
    );
  }

  DatosZombie(nombre: string, email: string, tipo: string) {
    console.log( nombre, email, tipo);

    document.getElementById('nombreEdit').value = nombre;
    document.getElementById('emailEdit').value = email;
    document.getElementById('tipoEdit').value = tipo;

   
  }

 }
