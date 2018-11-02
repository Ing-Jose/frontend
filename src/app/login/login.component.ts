import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo:string; //para recordar el cooreo
  recuerdame:boolean = false;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    // si localStorage.getItem('email') no tiene valor asigna vacio a emial
    this.correo = localStorage.getItem('email') || '';
    if (this.correo.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma:NgForm) {

    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.correo, forma.value.password);
    this._usuarioService.login(usuario, forma.value.recuerdame)
          .subscribe(resp=>{
            // console.log(resp);
            // window.location.href = '#/dashboard';
            this.router.navigate(['/dashboard']);
          })
    // console.log(forma.valid);
    // console.log(forma.value);
    
    // this.router.navigate([ '/dashboard' ]);

  }

}
