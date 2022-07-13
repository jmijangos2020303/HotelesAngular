import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { MisreservacionesComponent } from './components/misreservaciones/misreservaciones.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { ActualizarUsuarioComponent } from './components/actualizar-usuario/actualizar-usuario.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    InicioComponent,
    ReservacionesComponent,
    MisreservacionesComponent,
    HabitacionesComponent,
    ActualizarUsuarioComponent,
    HotelesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
