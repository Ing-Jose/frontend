import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;//para trabajar con el formulario
  constructor(public _usuarioSevice:UsuarioService, public router: Router) { }
  //creando los valores por defecto de los campos y validaciones
  ngOnInit() {
    init_plugins();
    this.forma=new FormGroup({
      nombre: new FormControl(null,Validators.required),
      correo: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password','password2')});
    //llenando el formulario
    this.forma.setValue({
      nombre: 'Test ',
      correo: 'test@test.com',
      password:'123456',
      password2:'123456',
      condiciones:true,
    });
  }

  registrarUsuario(){
    //si no pasa la validacion de la contraseñas
    if (this.forma.invalid) {
      return;
    }
    // válidando las condiciones
    if (!this.forma.value.condiciones) {
      // console.log('Dede de aceptar las condiciones');
      swal("Importante!", "Dede de aceptar las condiciones!", "warning");
      return;
    }
    // console.log('Forma válida ',this.forma.valid);
    // console.log(this.forma.value);
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password,
    );
    //llamdo el servicio para guardar el usuario
    this._usuarioSevice.crearUsuario(usuario)
          .subscribe(resp=>{
            //cuando tiene una respuesta positiva navega al router
            this.router.navigate(['/login']);
            
            console.log(resp);
            
          });
  }
  sonIguales(campo1: string, campo2: string){
    return( group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return{ sonIguales:true };
    };
  }
}
