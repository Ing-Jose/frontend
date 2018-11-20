import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService,public router:Router) { }

  ngOnInit() {
  }
  //esta funcion redirecionara a componente buscador 
  buscar(termino: string){
    if (termino!='') {
      // llaves cuadradas por que la funcion recibe un arreglo la ruta y el parametro
      this.router.navigate(['/busqueda',termino]);
    } else {
      swal("Error", "Dijite el termino a buscar", "error");
      
    }
  }
}
