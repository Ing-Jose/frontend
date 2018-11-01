import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Rx';
import { timer, interval } from 'rxjs';
import { map, tap, retryWhen, delayWhen } from 'rxjs/operators';

import { retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() { 
    //declarando variables 
    /**
     * en Observable no recibe ni resolve ni rejact como en las promesas
     * recibe un objeto
     */
    // let obs = new Observable(observer => {
    //   let cont = 0;//variable contador
    //   //creando el intervalo
    //   let intervalo = setInterval( () => {
    //     cont++;//Incrementando al contador
    //     observer.next(cont);//obseva la variable contador
    //     //para parar de observar
    //     if ( cont === 3 ) {
    //       clearInterval( intervalo ); //deteniendo el intervalo
    //       observer.complete(); //deteniendo el observable
    //     }
    //     //mandando un error
    //     if (cont === 2) {
    //       clearInterval(intervalo); //deteniendo el intervalo
    //       observer.error('Error creado ok!');
    //     }
        
    //   },1000);
    // }); 
    
    //emit value every 1s
    // const source = interval(1000);
    // const example = source.pipe(
    //   map(val => {
    //     if (val > 5) {
    //       //error will be picked up by retryWhen
    //       throw val;
    //     }
    //     return val;
    //   }),
    //   retryWhen(errors =>
    //     errors.pipe(
    //       //log error message
    //       tap(val => console.log(`Value ${val} was too high!`)),
    //       //restart in 5 seconds
    //       delayWhen(val => timer(val * 1000))
    //     )
    //   )
    // );
    
    //suscribiendo al observador
    /**los subscribe tiene tres colback 1 cuando se recibe informacion 2 un error*/
    
    // obs.subscribe(
    //   resultNumero => {console.log('Subs ',resultNumero);}, //el next
    //   error => {console.log('Error en el obs ', error)}, //el error
    //   () => console.log('El obsevador termino!') //cuando termine 
    // );
   
    //Diciendo que lo intente nuevamente apesar del error
    // obs.pipe(retry(2))
    // .subscribe(
    //       resultNumero => { console.log('Subs ', resultNumero); }, //el next
    //       error => { console.log('Error en el obs ', error) }, //el error
    //       () => console.log('El obsevador termino!') //cuando termine 
    //     );
    // const subscribe = example.subscribe(val => console.log(val));
    
    // this.regresaObs().subscribe(resp => console.log(resp))

    this.regresaObservable().pipe(retry(2))
    .subscribe(
          resultNumero => { console.log('Subs ', resultNumero); }, //el next
          error => { console.log('Error en el obs ', error) }, //el error
          () => console.log('El obsevador termino!') //cuando termine 
        );
    
  }

  ngOnInit() {
  }
  regresaObs(){
    //emit value every 1s
    const source = interval(1000);
    return source.pipe(
      map(val => {
        if (val > 5) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(val => console.log(`Value ${val} was too high!`)),
          //restart in 5 seconds
          delayWhen(val => timer(val * 1000))
        )
      )
    );
  }
  regresaObservable(){
    return new Observable(observer => {
      let cont = 0;//variable contador
      //creando el intervalo
      let intervalo = setInterval( () => {
        cont++;//Incrementando al contador
        observer.next(cont);//obseva la variable contador
        //para parar de observar
        if ( cont === 3 ) {
          clearInterval( intervalo ); //deteniendo el intervalo
          observer.complete(); //deteniendo el observable
        }
        //mandando un error
        if (cont === 2) {
          clearInterval(intervalo); //deteniendo el intervalo
          observer.error('Error creado ok!');
        }

      },1000);
    }); 
  }

}
