import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //propiedades
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) { 
    // console.log('servicio del usuario listo');
    this.cargarStorage();
  }

  estalogueado(){
    return (this.token.length > 5) ? true : false;
  }

  //Precargar el storage
  cargarStorage(){
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.usuario = null;
      this.token = '';
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    this.usuario=usuario;
    this.token=token;
  }
  //logout para salir 
  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    //redirecionando
    this.router.navigate(['/login']);
  }

  login(usuario:Usuario, recordar:boolean=false){
    
    if (recordar) {
      localStorage.setItem('email',usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    
    //url donde se va hacer la peticion
    //localStorage solo almacena string
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario)
        .pipe(map((resp:any)=>{
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          // localStorage.setItem('id',resp.id);
          // localStorage.setItem('token',resp.token);
          // localStorage.setItem('usuario',JSON.stringify(resp.usuario));
          //recreso true
          return true;
        })); 
  }

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario';
    //enviando la peticion
    return this.http.post(url,usuario)
      .pipe(map((resp:any) => {
        //si la respuesta es correcta se tendra un usuario
        swal("Usuario Creado!", usuario.email, "success");
        return resp.usuario;
      }));
  }
}
