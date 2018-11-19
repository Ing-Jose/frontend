import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  label:string = '';//para almacenar el nomb de la ruta
  //cambiando el meta segun la pagina en que este 
  
  //para manejar las rutas traemos el archivo router 
  constructor( private router: Router, private titleService: Title, public meta: Meta) { 
    //usuando el objeto router
    this.getData()
    .subscribe( data =>{
        
      // console.log(data);
      this.label = data.titulo;
      this.titleService.setTitle(this.label);//cambiamdo el titulo de la pestaña
      //Agregando meta
      let metaTab: MetaDefinition = {
        name: 'description',
        content: this.label
      };
      this.meta.updateTag(metaTab);
    });
  }

  ngOnInit() {
  }
  getData(){
    //usuando el objeto router
    return this.router.events
      .pipe(filter(evento => evento instanceof ActivationEnd))
      .pipe(filter((evento: ActivationEnd) => evento.snapshot.firstChild === null))
      .pipe(map((evento: ActivationEnd) => evento.snapshot.data))

  }
}
