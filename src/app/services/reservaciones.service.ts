import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservaciones } from '../models/reservaciones.model';

@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {
  public url : String = 'http://localhost:3000/api';
  public token;
  public identidad;
  public headersVariable = new HttpHeaders().set( 'Content-Type', 'application/json' );
  public headersToken = new HttpHeaders({'Content Type': 'application/json','Authorization': this.getToken()})

  constructor(public _http: HttpClient) { }

  obtenerReservaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/verReservaciones', {
      headers: headersToken,
    });
  }

  agregarReservaciones(reservacion: Reservaciones, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);
    let params = JSON.stringify(reservacion);

    return this._http.post(this.url + '/agregarReservacion', params, {
      headers: headersToken,
    });
  }



  obtenerReservacionId(token, id: string): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerReservacion/' + id, {
      headers: headersToken,
    });
  }

  editarReservacion(reservacion: Reservaciones):Observable<any>{
    let params = JSON.stringify(reservacion);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())

    return this._http.put(this.url + '/editarReservacion/' + reservacion._id, params, {headers: headersToken})
  }

  eliminarReservacion(id:String): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getToken());
    return this._http.delete(this.url + '/eliminarReservacion/' + id, {headers: headersToken})
  }

  obtenerHabitaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerHabitaciones', {
      headers: headersToken,
    });
  }

  getToken(){
    var token2 = localStorage.getItem('token');
    if(token2 != 'undefined'){
      this.token = token2;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }


}
