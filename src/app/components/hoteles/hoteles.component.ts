import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import {Hotel} from '../../models/hoteles.model'
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class HotelesComponent implements OnInit {
  public hotelModelGet : Hotel;
  public hotelModelPost : Hotel;
  public hotelModelGetId : Hotel;
  public token;


  constructor(private _hotelService: HotelService, public _usuarioService: UsuarioService) {
    this.hotelModelPost = new Hotel('', '', '','' ,'');
    this.hotelModelGetId = new Hotel('', '', '', '','');

    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    this.getHoteles()
  }

  getHoteles(){
    this._hotelService.obtenerHoteles().subscribe({
      next : (response: any) => {
        this.hotelModelGet = response.Empresas
        console.log(response.Empresas);

      },
      error: (err) =>{
        console.log(err);

      }
    })
  }

  postHoteles(){
    this._hotelService.agregarHoteles(this.hotelModelPost, this.token).subscribe(
      (response) => {
        console.log(response);
        this.getHoteles()
        this.hotelModelPost.nombre = '';
        this.hotelModelPost.descripcion = '';
        this.hotelModelPost.direccion = '';

      },
       (err) => {
        console.log( err);

      }
    )
  }

  putHoteles(){
    this._hotelService.editarHoteles(this.hotelModelGetId, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getHoteles()
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }



  getHotelesId(idHotel) {
    this._hotelService.obtenerHotelesId(idHotel).subscribe({
      next: (response: any) => {
        console.log(response);
        this.hotelModelGetId = response.Hotel;

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  eliminarHotel(id){
    this._hotelService.eliminarHotel(id, this.token).subscribe(
      (response)=>{
        console.log(response);
        this.getHoteles()
      },
      (error)=>{
        console.log(<any>error);

      }
    )

  }








}
