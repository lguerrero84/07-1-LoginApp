import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyAB4tFACkRF_XIevdPnWRM9BzzkXaMnmcw';
  usuarioToken: string;
// crear usuarios
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http:HttpClient) {
    this.leerToken();
   }


  logout(){
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = { ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url}accounts:signInWithPassword?key=${ this.apiKey } `, authData
    ).pipe (
      map ( respuesta => {
        console.log('Entro en el map rxjs');
        this.guardarToken( respuesta ['idToken'] );
        return respuesta;
      })
    );

  }

  nuevoUsuario(usuario: UsuarioModel) {
   const authData = { ...usuario,
                      returnSecureToken: true
                    };
    return this.http.post(
      `${ this.url}accounts:signUp?key=${ this.apiKey } `, authData
    ).pipe (
      map ( respuesta => {
        console.log('Entro en el map rxjs');
        this.guardarToken( respuesta ['idToken'] );
        return respuesta;
      })
    );

  }

  private guardarToken(idToken: string) {
      this.usuarioToken = idToken;

      localStorage.setItem('token', idToken);

      let hoy = new Date();
      hoy.setSeconds(3600);

      localStorage.setItem('expira', hoy.getTime().toString());
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.usuarioToken = localStorage.getItem('token');
    } else {
      this.usuarioToken = '';
    }
    return this.usuarioToken;
  }

 public estaAutenticado(): boolean {

          if ( this .usuarioToken.length < 2) {
            return false;
          }

          const expira = Number(localStorage.getItem('expira'));
          const expiraDate = new Date();
          expiraDate.setTime(expira);

          if (expiraDate > new Date()) {
            return true;
          } else {
            return false;
          }

  }

}
