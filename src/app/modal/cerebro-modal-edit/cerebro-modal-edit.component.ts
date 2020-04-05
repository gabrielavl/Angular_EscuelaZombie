import { Component, Renderer2, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-cerebro-modal-edit',
  templateUrl: './cerebro-modal-edit.component.html',
})
export class CerebroModalEditComponent implements OnInit {
  @ViewChild('mCerebroEdit')public modal: ElementRef;

  sabor: string;
  descripcion: string;
  iq: string;
  id: string;
  propietario: string;
  constructor(private _dataService: DataService, private _rendered: Renderer2) { }

  ngOnInit(): void {
    this.propietario = localStorage.getItem('usAu');
  }

  EditarCerebroInfo() {

    this._dataService.actualizarCerebroInfo(this.sabor, this.descripcion, this.iq, this.id).subscribe((resultado) => {
      console.log(resultado);
      this._rendered.selectRootElement(
        this.modal.nativeElement, true).click();
      this._dataService.obtenerCerebros(this.propietario);
      this.sabor = ' ';
      this.descripcion = ' ';
      this.iq = ' ';
    }, (error) => {
      console.log(error);
      document.getElementById('mensajeErrorCerebroEdit').innerHTML = error.error.mensajeError.message.toString();
    }
    );
  }

}
