import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  user: Usuario;
  repeatPass: string = '';

  constructor(
    private userRest: UsuarioService,
    public router: Router
  ) {
    this.user = new Usuario(
      "",
      "",
      "",
      0,
      "",
      "",
      ""
    );
   }

  ngOnInit(): void {
  }

  checkPass(){
    if(this.repeatPass != this.user.password){
      return false;
    }else{
      return true;
    }
  }

  register(){
      this.userRest.register(this.user).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: 'Usuario creado satisfactoriamente, ya puedes logearte con el email '+ res.usuario.email,
            icon: 'success',
            timer: 4500
          });
          this.router.navigate(['/login']);
        }, // capturar todas las respuestas HTTP 200 Ok
        error: (err)=> Swal.fire({
          title: err.error.mensaje,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        }), // capturar todas las respuestas HTTP != 200 (400, 404, 500, 401, 403..)
      })

  }

}
