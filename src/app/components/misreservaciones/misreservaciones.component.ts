import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Reservaciones } from 'src/app/models/reservaciones.model';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { Habitaciones } from 'src/app/models/habitaciones.model';


@Component({
  selector: 'app-misreservaciones',
  templateUrl: './misreservaciones.component.html',
  styleUrls: ['./misreservaciones.component.scss'],
  providers: [ReservacionesService, UsuarioService]

})
export class MisreservacionesComponent implements OnInit {

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
      ''

    );
    this.reservacionesModelAdd = new Reservaciones(
      '',
      '',
      '',
      '',
      ''

    );
  }

  ngOnInit(): void {
    this.obtenerReservaciones();

  }


  obtenerReservaciones() {
    this._reservacionService.obtenerReservaciones(this.token).subscribe(
      (response) => {
        this.reservacionesModelGet = response.Reservacion;
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
        this.reservacionesModelGetId =response.Reservacion;
        console.log(response);
      }
    )
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
      Swal.fire({
        /*position: 'top',*/
        icon: 'success',
        title: 'Reservacion Eliminada correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
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
