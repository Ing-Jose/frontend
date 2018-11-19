import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service'; //para obtener el token
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0; //para almacenar la cantidad de medicos

  //importamos para hacer peticiones http
  constructor(public http: HttpClient, public _usuarioService: UsuarioService, public router: Router) { }
  
  // traer todos los médicos
  cargarMedicos(desde: number = 0){
    let url = URL_SERVICIOS + '/medico?desde='+desde; //url donde se hara la petición
    return this.http.get(url)
      .pipe(map((resp: any)=>{
        this.totalMedicos = resp.total;
        // console.log(resp);
        return resp.medicos;
      }))
  }
  //para editar medico
  
  //borrar medico
  borrarMedico(id:string){
    let url = URL_SERVICIOS + '/medico/'+id; //url donde se hara la petición
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete(url)
      .pipe(map(resp => swal('Médico Borrado', 'Médico borrado correctamente', 'success')));

  }
  //funcion que permite buscar un medico cuando se dijita en el input su nombre
  buscarMedico(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    
    return this.http.get(url)
      .pipe(map((resp: any) => resp.medicos));

  }
  
  /** funsion para consultar por un médico */
  buscarMedicoById(id: string){
    let url = URL_SERVICIOS + '/medico/'+id; //url donde se hara la petición
    //la respuesta solo retorna el medico
    return this.http.get(url) 
      .pipe(map((resp: any) => resp.medico));

  }
  /**funcion que permite crear un nuevo medico */
  crearMedico(medico: Medico){
    let url = URL_SERVICIOS + '/medico'; //url donde se hara la petición

    // si  existe el id del medico es una actulización 
    if (medico._id) {
      // Actuakizando
      url += '/'+medico._id;
      url += '?token=' + this._usuarioService.token;
      //de esta respuesta solo necesito el medico
      return this.http.put(url,medico)
        .pipe(map((resp: any) => {
          swal('Médico Actualizado', medico.nombre + ' Atualizado correctamente', 'success')
            .then((value) => {
              this.router.navigate(['/medicos']);
              //swal(`The returned value is: ${value}`);
            });
          return resp.medico;
          //redirecionando
          // this.router.navigate(['/login']);
        }));
    } else {
      //creando medico nuevo
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post(url,medico)
        .pipe(map((resp: any) => {
          swal('Médico Creado', medico.nombre+' guardado correctamente', 'success')
          return resp.medico;
        }));

    }



  }
}
