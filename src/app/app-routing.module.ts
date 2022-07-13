import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { MisreservacionesComponent } from './components/misreservaciones/misreservaciones.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent },
  {path: 'inicio', component: InicioComponent},
  {path: 'reservaciones', component: ReservacionesComponent},
  {path: 'misreservaciones', component: MisreservacionesComponent},
  {path: 'habitaciones', component: HabitacionesComponent},
  {path: 'actualizarUsuario', component: ActualizarUsuarioComponent},
  {path: 'hoteles', component: HotelesComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
