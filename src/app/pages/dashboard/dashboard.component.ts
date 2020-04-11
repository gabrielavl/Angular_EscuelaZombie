import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import * as CanvasJS from 'src/assets/js/canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    usuariosRegistrados: any;
    sabores: any;
    propietario: string;

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    this.propietario = localStorage.getItem('usAu');
    if (!localStorage.getItem('Autenticated')) {
      this._router.navigate(['login']);
    }

    this.graficaSabores(this.propietario);
    this.graficaUsuarios(this.propietario);
  }


  async graficaUsuarios(usuario) {
    this._dataService.ContarCerebros(usuario).subscribe((resultado) => {
     console.log(resultado);

    // Empezar a graficar
     let graficaUsuarios = new CanvasJS.Chart('graficaCerebrosPorUsario', {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light3',
      title: {
        text: 'Cantidad de cerebros por usuario'
      },
      data: [{
        type: 'pie',
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: resultado
      }]
    });
     graficaUsuarios.render();
    });
  }


  async graficaSabores(usuario: string) {
    await this._dataService.ContarSabores(usuario).subscribe((resultado) => {
     console.log(resultado);

     // GRAFICAR USANDO  CANVAS JS_______________
     let graficaSabores = new CanvasJS.Chart('graficaSabores', {
      animationEnabled: true,
      exportEnabled: true,
      theme: 'light3',
      title: {
        text: 'Cerebros por sabor'
      },
      data: [{
        type: 'column',
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: [
          { y: resultado.picante, label: 'Picante' },
          { y: resultado.amargo, label: 'Amargo' },
          { y: resultado.dulce, label: 'Dulce' },
          { y: resultado.salado, label: 'Salado' },
          { y: resultado.acido, label: 'Ácido' }
        ]
      }]
    });
     graficaSabores.render();
  }, (error) => {
    console.log(error);
  });
}

}


