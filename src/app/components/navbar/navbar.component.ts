import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UsuarioService]

})
export class NavbarComponent implements OnInit {

  public token: any;


  constructor(
    public _usuarioService: UsuarioService) {
      this.token = this._usuarioService.getToken();

   }

  ngOnInit(): void {

    console.log(this._usuarioService.getToken());
  }

  VaciarToken(){
    this._usuarioService.clearToken();

    Swal.fire({
      icon: 'success',
      title: 'Sesión Cerrada',
      showConfirmButton: false,
      timer: 1500
    })

  }
}
