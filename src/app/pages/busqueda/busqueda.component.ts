import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  //para mostrar los resultados de la busqueda en el html
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];
  /**
   * @param activatedRoute para recibir el parametro por url
   */
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) { 
    this.activatedRoute.params
        .subscribe(respParams => {
          let termino = respParams['termino'];
          // console.log(termino);
          this.busqueda(termino);
        });
  }

  ngOnInit() {
  }

  busqueda(termino:string){
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    
    this.http.get( url )
        .subscribe((resp: any) => {
          // console.log(resp);
          this.hospitales = resp.hospitales;
          this.medicos = resp.medicos;
          this.usuarios = resp.usuarios;
        });
  }

}
