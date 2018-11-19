import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})

export class MedicosComponent implements OnInit {

  medicos: Medico[]= [] //arreglo para almacenar todos los medicos

  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde)
      .subscribe((medicos) => {
        this.medicos = medicos;
        this.totalRegistros = this._medicoService.totalMedicos;
        this.cargando = false;
      });
  }
  
  buscarMedico(termino: string){
    // console.log(termino);
    if (termino.length <= 0) { //si no ha escrito nada en el input del nombre del medico a buscar
      this.cargarMedicos();
      return;
    }
    //cuando dijite alguna letra 
    this._medicoService.buscarMedico(termino)
      .subscribe(medicos => this.medicos = medicos);
    
  }
  actualizarImagen(medico:Medico){
    console.log(medico);
    
  }
  editarMedico(medico: Medico){

  }
  borrarMedico(id: string){
    // console.log(id);
    
    this._medicoService.borrarMedico(id)
      .subscribe(() => this.cargarMedicos());
  }
  //para la paginacion
  cambiarDesde(valor: number) {
    // console.log('valor '+valor+' desde '+this.desde+' total '+this.totalRegistros);
    
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }
}
