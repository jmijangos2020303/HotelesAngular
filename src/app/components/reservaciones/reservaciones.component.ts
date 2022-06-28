import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservaciones } from 'src/app/models/reservaciones.model';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Habitaciones } from 'src/app/models/habitaciones.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.scss'],
  providers: [ReservacionesService, UsuarioService]

})
export class ReservacionesComponent implements OnInit {

  public token;
  public habitacionesModelGet:Habitaciones;
  public reservacionesModelGet: Reservaciones;
  public reservacionesModelAdd: Reservaciones;
  public reservacionesModelGetId: Reservaciones;

  constructor(

    public _reservacionService: ReservacionesService,
    public _usuarioService: UsuarioService,
    //public _habitacionService: HabitacionesService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
    this.reservacionesModelGetId = new Reservaciones(
      '',
      '',
      '',
      '',

    );
    this.reservacionesModelAdd = new Reservaciones(
      '',
      '',
      '',
      '',

    );
  }

  ngOnInit(): void {
    this.obtenerReservaciones();
    /*this.obtenerHabitaciones();*/
  }

  obtenerReservaciones() {
    this._reservacionService.obtenerReservaciones(this.token).subscribe(
      (response) => {
        this.reservacionesModelGet = response.reservacionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerReservacion(idReservacion){
    this._reservacionService.obtenerReservacionId(this.token, idReservacion).subscribe(
      response => {
        this.reservacionesModelGetId =response.reservacionEncontrada;
        console.log(response);
      }
    )
  }

  agregarReservaciones() {

    this._reservacionService.agregarReservaciones(this.reservacionesModelAdd, this.token).subscribe(
      response=>{

        this.reservacionesModelAdd.FechaInicio = '';
        this.reservacionesModelAdd.FechaSalida ='';
        this.reservacionesModelAdd.NombreReservacion ='';


        console.log(response);

        Swal.fire({
          /*position: 'top',*/
          icon: 'success',
          title: 'Reservacion agregada correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.obtenerReservaciones;
      }
    );

  }

  editarReservacion(){

      if(
        this.reservacionesModelGetId.FechaInicio===""||
        this.reservacionesModelGetId.FechaSalida===""||
        this.reservacionesModelGetId.NombreReservacion===""

        )
        {

        Swal.fire({
          /*position: 'top',*/
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._reservacionService.editarReservacion(this.reservacionesModelGetId).subscribe(
        response=>{
          console.log(response);

          Swal.fire({
            /*position: 'top',*/
            icon: 'success',
            title: 'Reservacion editada y actualzada correctamente',
            showConfirmButton: false,
            timer: 1500,
          });

          this.obtenerReservaciones();
        }
      )
    }
  }

  eliminarReservacion(idReservacion){
    this._reservacionService.eliminarReservacion(idReservacion).subscribe(
      response=>{
        console.log(response);
        this.obtenerReservaciones();
      }
    )
  }

  /*obtenerHabitaciones() {
    this._habitacionService.obtenerHabitaciones(this.token).subscribe(
      (response) => {
        this.habitacionesModelGet = response.habitacionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }*/

}
