import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../models/hoteles.model';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token;
  public identidad;

  constructor(public _http: HttpClient) {

   }


  obtenerHoteles(): Observable<any>{
    return this._http.get(this.url + '/verHoteles', {headers: this.headersVariable})
  }

  agregarHoteles(modelHotel : Hotel, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    let parametros = JSON.stringify(modelHotel);
    return this._http.post(this.url + '/registrarHotel', parametros, {headers: headersToken})
  }

  editarHoteles(modeloHotel: Hotel,token){
    let headersToken = this.headersVariable.set('Authorization', token)

    let parametro = JSON.stringify(modeloHotel);

    return this._http.put(this.url + '/editarHotel/' + modeloHotel._id, parametro, {headers: headersToken} )

  }

  obtenerHotelesId(idHotel,): Observable<any>{
    return this._http.get(this.url + '/obtenerHotel/' + idHotel, {headers: this.headersVariable})
  }

  eliminarHotel(idHotel, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarHotel/'+ idHotel,{ headers: headersToken })
  }


}
