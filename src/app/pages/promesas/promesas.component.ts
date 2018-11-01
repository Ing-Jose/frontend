import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    
    // this.contarTres()
    //   .then(
    //     mensaje => console.log('termino', mensaje)
    //   )
    //   .catch(
    //     error => console.log('Error en la promesa', error)
    //   );
    /**promesa que retorna un booleano */
    this.contarTresBooleano()
      .then(
        mensaje => console.log('termino', mensaje)
      )
      .catch(error => console.log('Error en la promesa', error));
  }

  ngOnInit() {
  }
  contarTres() {
    return new Promise((resolve, reject) => {
      let contador = 0;
      //recibe lo que quiero hacer en cada intervalo
      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve('OK!');
          // reject('simple error'); //retornando un error
          clearInterval(intervalo); //detiene el intervalo
        }
      }, 1000);
    });
    
  }
  /**promesa que retorna un valor de tipo booleano */
  contarTresBooleano():Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;
      //recibe lo que quiero hacer en cada intervalo
      let intervalo = setInterval(() => {

        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          // reject('simple error'); //retornando un error
          clearInterval(intervalo); //detiene el intervalo
        }
      }, 1000);
    });

  }
}
