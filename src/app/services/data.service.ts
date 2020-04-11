import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

let apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private updateZombies$ = new Subject<any>();
  zombieObservable = this.updateZombies$.asObservable();

  private updateCerebros$ = new Subject<any>();
  cerebroObservable = this.updateCerebros$.asObservable();

  private updateCompraCerebros$ = new Subject<any>();
  compraCerebroObservable = this.updateCompraCerebros$.asObservable();

  private updateInfoCerebroComprado$ = new Subject<any>();
  infoCerebroCompradoObservable = this.updateInfoCerebroComprado$.asObservable();

  constructor(private _client: HttpClient) { }

async obtenerZombies(zombiesOfUser: string) {
  let zombies = await this._client.get<any>(apiUrl + 'zombies/' + zombiesOfUser);
  console.log(zombies);
  return this.updateZombies$.next(zombies);
}

async obtenerZombieData(id: string) {
  let zombie = await this._client.get<any>(apiUrl + 'zombieData/' + id);
  // return this.updateZombies$.next(zombie);
  return zombie;
}

agregarZombie(name: string, correo: string, type: string, owner: string) {
  let nuevoZombie = {
    nombre: name,
    email: correo,
    tipo: type,
    propietario: owner
  };
  return this._client.post(apiUrl + 'zombies/add', nuevoZombie);
}

actualizarZombieInfo(name: string, correo: string, type: string) {
  let zombieData = {
    nombre: name ,
    email: correo,
    tipo: type
  };
  return this._client.put(apiUrl + 'zombie/edit/' + zombieData.email, zombieData);
}

eliminarZombie(id) {
  return this._client.delete(apiUrl + 'zombies/delete/' + id);
}

// SECCIÓN CEREBRO_______________________________________________________________


async obtenerCerebros(brainsOfUser: string) {
  let cerebros = await this._client.get<any>(apiUrl + 'cerebros/' + brainsOfUser);
  console.log(cerebros);
  return this.updateCerebros$.next(cerebros);
}

agregarCerebro(flavor: string, IQ: number, description: string, owner: string) {
  let nuevoCerebro = {
    sabor: flavor,
    iq: IQ,
    descripcion: description,
    propietario: owner
  };
  return this._client.post(apiUrl + 'cerebro/add', nuevoCerebro);
}

actualizarCerebroInfo(flavor: string, description: string, IQ: string, _id: string) {
  let cerebroData = {
    sabor: flavor ,
    descripcion: description,
    iq: IQ,
    id: _id
  };
  return this._client.put(apiUrl + 'cerebro/edit/' + cerebroData.id, cerebroData);
}

DeleteCerebro(id) {
  return this._client.delete(apiUrl + 'cerebros/delete/' + id);
}


// SECCION GRAFICAS __________________________________________________________________

ContarSabores(usuario) {
  let sabores = this._client.get<any>(apiUrl + 'dashboard/graficaSabores/' + usuario);
  return sabores;
}

ContarCerebros(usuario) {
  let usuariosCerebros = this._client.get<any>(apiUrl + 'dashboard/graficaUsuarios/' + usuario);
  return usuariosCerebros;
}



// SECCION COMPRAS (CEREBRO)_____________________________________________________________________

async obtenerInformacionCompras(user: string) {
  let informacionCompra = await this._client.get<any>(apiUrl + 'cerebros/compras/' + user);
  console.log(informacionCompra);
  return this.updateCompraCerebros$.next(informacionCompra);
}

guardarCompra(email: string, cerebro, cantidadCerebros: number, formaEnvio: string, fPedido: string, fEntrega: string ) {
  let nuevaCompra = {
    emailUsuario: email,
    cerebroSeleccionado: cerebro,
    cantidad: cantidadCerebros,
    metodoEnvio: formaEnvio,
    fechaPedido: fPedido,
    fechaEntrega: fEntrega
  };
  return this._client.post(apiUrl + 'cerebros/compras/new', nuevaCompra);
}

obtenerCompraInfo(idCerebro: string) {
  let cerebroComprado = this._client.get<any>(apiUrl + 'cerebros/compras/cerebro/' + idCerebro);
  this.updateInfoCerebroComprado$.next(cerebroComprado);
  return cerebroComprado;
}
}
