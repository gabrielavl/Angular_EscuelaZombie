import { Component, OnInit,  Renderer2, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cerebros-modal',
  templateUrl: './cerebros-modal.component.html',
  styles: []
})
export class CerebrosModalComponent implements OnInit {
  @ViewChild('modalCerebro') public modal: ElementRef;

sabor: string;
iq: number;
descripcion: string;
propietario: string;
  constructor(private _dataService: DataService, private _rendered: Renderer2) { }

  ngOnInit(): void {
    this.propietario = localStorage.getItem('usAu');
  }
  guardarCerebro() {
    console.log(this.modal);
    this._dataService.agregarCerebro(this.sabor, this.iq, this.descripcion, this.propietario).subscribe((resultado) => {
      console.log(resultado);
      this._rendered.selectRootElement(
        this.modal.nativeElement, true).click();
      this._dataService.obtenerCerebros(this.propietario);
      this.sabor = ' ';
      this.iq = null;
      this.descripcion = ' ';

      document.getElementById('ErrorMessageCerebro').innerHTML = ' ';
    }, (error) => {
      console.log(error);
      document.getElementById('ErrorMessageCerebro').innerHTML = error.error.mensajeError.toString();
    });
  }

}
