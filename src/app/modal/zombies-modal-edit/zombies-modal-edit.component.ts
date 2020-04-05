import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-zombies-modal-edit',
  templateUrl: './zombies-modal-edit.component.html',
  styles: []
})
export class ZombiesModalEditComponent implements OnInit {
  @ViewChild('modalZombieEdit')public modal: ElementRef;

  nombre: string;
  email: string;
  tipo: string;
  zombies: any;
  propietario: string;
  // id: string;

  constructor(private _dataService: DataService, private _rendered: Renderer2) { }

  ngOnInit(): void {
    // let zombieData = this._dataService.obtenerZombieData(this.id);
    this.propietario = localStorage.getItem('usAu');
  }

  EditarZombieInfo() {
    this.nombre = document.getElementById('nombreEdit').value;
    this.email = document.getElementById('emailEdit').value;
    this.tipo = document.getElementById('tipoEdit').value ;
  

    console.log(this.nombre, this.email, this.tipo);
    this._dataService.actualizarZombieInfo(this.nombre, this.email, this.tipo).subscribe((resultado) => {
      console.log(resultado);
      this._rendered.selectRootElement(
        this.modal.nativeElement, true).click();
      this._dataService.obtenerZombies(this.propietario);
      this.nombre = ' ';
      this.email = ' ';
      this.tipo = ' ';
    }, (error) => {
      console.log(error);
      document.getElementById('mensajeErrorZombieEdit').innerHTML = error.error.mensajeError.message.toString();
    }
    );

  }

}
