import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        // console.log(resp);
        
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;

      });

  }
  //para la paginacion
  cambiarDesde(valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }
  //funcion para buscar usuario cuando se digite una letra en la caja de texto
  buscarUsuario(termino: string) {
    // console.log(termino);//
    
    if (termino.length <= 0) {
        this.cargarUsuarios();
        return;
    }
      
      this.cargando = true;
      
      this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log(usuarios);
        
        this.usuarios = usuarios;
        this.cargando = false;
      });

  }
  //para borrar usuario
  borrarUsuario(usuario: Usuario) {
    // console.log(usuario);
    
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then(borrar => {
        // console.log(borrar);
        
        if (borrar) {

          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              this.cargarUsuarios();
            });

        }

      });

  }
  //guardar usuario
  guardarUsuario(usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();

  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('usuarios', id);
  }


}
