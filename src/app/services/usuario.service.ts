import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url : String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public headersToken = new HttpHeaders({'Content Type': 'application/json','Authorization': this.getToken()})
  public token;
  public identidad;

  constructor(public _http: HttpClient) { }


  register(params){
    return this._http.post(this.url + '/registrar', params, { headers: this.headersVariable});
  }

  Ver(token) : Observable<any> {

    return this._http.get(this.url + '', {});
  }


  login(usuario, obtenerToken = null): Observable<any> {

    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, { headers: this.headersVariable });
  }

  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2
    } else {
      this.token = '';
    }

    return this.token;
  }

  clearToken(){
    localStorage.clear();

  }

  getIdentidad() {
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    }else{
      this.identidad = null;
    }

    return this.identidad;
  }

  Eliminar( id, token ): Observable<any> {

    let headersToken = this.headersVariable.set('Authorization', token )
    return this._http.delete(this.url + '//'+ id, { headers: headersToken})
  }

  obtenerId(id, token):Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token );
    return this._http.get(this.url + '//'+ id,{ headers: headersToken})
  }

  editar(modelo:Usuario, token):Observable<any> {
    let parametros = JSON.stringify(modelo);
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.put(this.url + '//'+ modelo._id, parametros, { headers: headersToken})
  }


  updateUser(id, params){
    return this._http.put(this.url + '/EditarPerfil/'+ id, params, {headers: this.headersToken});
  }
}
