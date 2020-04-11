import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compra-cerebros',
  templateUrl: './compra-cerebros.component.html',
  styles: []
})
export class CompraCerebrosComponent implements OnInit {
  emailUsuario: string;
  cerebroSeleccionado: string;
  cantidad: number;
  metodoEnvio: string;
  fechaPedido: Date;
  fechaEntrega: Date;

  cerebrosUsuario: any;
  infoPedidos: any; // Todos los pedidos
  infoPedido: any; // Info de un solo pedido


  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
    this.emailUsuario = localStorage.getItem('usAu');
    if (!localStorage.getItem('Autenticated')) {
      this._router.navigate(['login']);
    }

    this.ObtenerCerebrosUsuario(this.emailUsuario);
    this.ActualizarTablaPedidos(this.emailUsuario);
  }

  // Obtener cerebros de usuario logeado para insertar en el Combo Box
  ObtenerCerebrosUsuario(email) {
    this._dataService.cerebroObservable.subscribe((resultados) => {
      this.cerebrosUsuario = resultados;
    });
    this._dataService.obtenerCerebros(email);
  }

  // Obtener datos de compras para la tabla Compras
  ActualizarTablaPedidos(usuario) {
    this._dataService.compraCerebroObservable.subscribe((resultados) => {
      this.infoPedidos = resultados;
      console.log(this.infoPedidos);
    });
    this._dataService.obtenerInformacionCompras(usuario);
  }

  realizarCompra() {
    let fechaActual = new Date();
    let calculo;

    if (this.metodoEnvio == 'Bronce') {
      calculo = fechaActual.getTime() + 1000 * 60 * 60 * 24 * 15; // milisegundos * segundos * minutos * horas * días
      this.fechaEntrega = new Date(calculo);
    } else if (this.metodoEnvio == 'Silver') {
      calculo = fechaActual.getTime() + 1000 * 60 * 60 * 24 * 7; // milisegundos * segundos * minutos * horas * días
      this.fechaEntrega = new Date(calculo);
    } else if(this.metodoEnvio == 'Gold') {
      calculo = fechaActual.getTime() + 1000 * 60 * 60 * 24 * 3; // milisegundos * segundos * minutos * horas * días
      this.fechaEntrega = new Date(calculo);
    } else {
      console.log('No se ha seleccionado método de envío');
    }

    console.log(fechaActual.toDateString(), this.fechaEntrega.toDateString());
    console.log(this.emailUsuario, this.cantidad, this.metodoEnvio, this.cerebroSeleccionado);


    this._dataService.guardarCompra( this.emailUsuario, this.cerebroSeleccionado[0], this.cantidad,
      this.metodoEnvio, fechaActual.toDateString(), this.fechaEntrega.toDateString()).subscribe((resultados) => {
        console.log(resultados);

        this.ActualizarTablaPedidos(this.emailUsuario);
    });

  }

  VerInfoCerebro(cerebroComprado) {
    this._dataService.obtenerCompraInfo(cerebroComprado).subscribe((resultados) => {
      this.infoPedido = resultados;
      console.log(resultados);

      document.getElementById('saborCerebroComprado').value = resultados.sabor;
      document.getElementById('descripcionCerebroComprado').value = resultados.descripcion;
      document.getElementById('iqCerebroComprado').value = resultados.iq;
    }, (error) => {
      console.log(error);
    });

  }

}
