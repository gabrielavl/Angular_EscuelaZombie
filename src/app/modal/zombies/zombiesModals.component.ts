import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'modal-zombies',
  templateUrl: './zombiesModals.component.html',
  styles: []
})
export class ZombiesModalsComponent implements OnInit {
  @ViewChild('modalZombieAdd') public modal: ElementRef;

  nombre: string;
  email: string;
  tipo: string;
  propietario: string;
  constructor(private _dataService: DataService, private _rendered: Renderer2) { }

  ngOnInit(): void {
    this.propietario = localStorage.getItem('usAu');
  }
  guardarZombie() {
    console.log(this.nombre, this.email, this.tipo);
    this._dataService.agregarZombie(this.nombre, this.email, this.tipo, this.propietario).subscribe((resultado) => {
      console.log(resultado);
      this._rendered.selectRootElement(
        this.modal.nativeElement, true).click();
      this._dataService.obtenerZombies(this.propietario);
      this.nombre = ' ';
      this.email = ' ';
      this.tipo = ' ';

      document.getElementById('mensajeErrorZombieAdd').innerHTML = ' ';
    }, (error) => {
      console.log(error);
      document.getElementById('mensajeErrorZombieAdd').innerHTML = error.error.mensajeError.toString();
    }
    );
  }
}
