import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})

export class MedicoComponent implements OnInit {
  /** 
   * para cargar el combobox con todos los hopitales,
   * creamos un arreglo vacio de tipo hospital
  */
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital:Hospital = new Hospital('');
  
  /**
   * 
   * @param _hospitalService para poder consultar un hospital
   * @param _medicoService para grud de medico
   * @param router para poder navegar entre rutas
   * @param activatedRoute para leer el id pasado por la ruta
   * @param _modalUploadService para poder trabajar con el modal de imagen
   */
  constructor(
    public _hospitalService: HospitalService, 
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) { 
      //observable, recibe todos los parametros definido en la ruta
      activatedRoute.params.subscribe(parametros => {
        //en pages.rautes.ts definimos el nombre de este para metro en la ruta de actualizacion
        let id = parametros['id']; 
        //en caso que el parametro id tenga un valor diferente de nuevo, nuevo lo pasa cuando tocamos el btn agregar medico
        if (id !== 'nuevo') {
          // console.log(id);
          
          this.cargarMedico(id);
        }
      });
    }

  ngOnInit() {
    this.obtenerHospitales();
    this.notificacionModal();

  }
  //funsion para traer todos los hospitales
  obtenerHospitales() {
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        // console.log(hospitales);
        this.hospitales = hospitales
      });
  }
  //funsion que permite guardar un medico 
  guardarMedico(f: NgForm){
    // console.log(f.valid);
    // console.log(f.value);
    // console.log(this.medico);
    //validacion
    if (f.invalid) {
      return;
    }

    this._medicoService.crearMedico(this.medico)
      .subscribe( medico => {
        // console.log(medico);
        this.medico._id = medico._id;
        //navegando a otra pagina
        this.router.navigate(['/medico',medico._id])
      });       
  }
  /**funcion para detectar el cambio del combobox */
  cambioHospital( idHospital: string ){
    // console.log(idHospital);
    /** recupera el hospital */
    this._hospitalService.obtenerHospitalById(idHospital)
      .subscribe(resp=>{
        // console.log(resp);
        this.hospital=resp; //almacena en el objeto hospital el hospital consultado
      });
  }
  //funsion para cargar un medico
  cargarMedico(id: string){
    this._medicoService.buscarMedicoById(id)
      .subscribe( (respMedico) => {
        
        this.medico = respMedico;
        // console.log(this.medico);

        this.medico.hospital = respMedico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }
  /** funcion que permite llamar el modal para cambiar la imagen del medico */
  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos',this.medico._id);
  }
  //suscribiendome a la notificacion del modal
  notificacionModal(){
    this._modalUploadService.notificacion.subscribe((resp)=>{
      // console.log(resp);
      this.medico.img = resp.medicoActualizado.img;
    });
  }
}
