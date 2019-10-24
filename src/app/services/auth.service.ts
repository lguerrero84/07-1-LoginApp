import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyAB4tFACkRF_XIevdPnWRM9BzzkXaMnmcw';
// crear usuarios
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//login
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(private http:HttpClient) { }


  logout(){}

  login(usuario:UsuarioModel){}

  nuevoUsuario(usuario: UsuarioModel) {
   const authData = { ...usuario,
                      returnSecureToken: true
                    };
    return this.http.post(
      `${ this.url}accounts:signUp?key=${ this.apiKey } `, authData
    )

  }
}
