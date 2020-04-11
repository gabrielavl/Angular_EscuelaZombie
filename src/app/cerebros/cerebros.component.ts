import { Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cerebros',
  templateUrl: './cerebros.component.html',
})
export class CerebrosComponent implements OnInit {

  // tslint:disable: no-inferrable-types
  sabor: string;
  descripcion: string;
  iq: number;
  imagen: string;
  propietario: string;  // <== email del usuario logeado
  id: string;
  cerebros: any;

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
    this.propietario = localStorage.getItem('usAu'); // <== Asigna a "this.propietario" el email del usuario logeado
    if (!localStorage.getItem('Autenticated')) {
      this._router.navigate(['login']);
    }

    console.log('Actualizando tabla');
    this.ActualizarTabla();
  }

  EliminarCerebro(id: string) {
    console.log(id);
    this._dataService.DeleteCerebro(id).subscribe((resultado) => {
      console.log(resultado);
      this._dataService.obtenerCerebros(this.propietario);
    });

   }

   ActualizarTabla() {
    this._dataService.cerebroObservable.subscribe((resultados) => {
      this.cerebros = resultados;
    });

    this._dataService.obtenerCerebros(this.propietario);
  }

  DatosCerebro(sabor: string, descripcion: string, iq: number, id: string) {
    console.log( sabor, descripcion, iq);

    document.getElementById('saborEdit').value = sabor;
    document.getElementById('descriptionEdit').value = descripcion;
    document.getElementById('iqEdit').value = iq;
    localStorage.setItem('idCerebroEdit', id);

   
  }


}
