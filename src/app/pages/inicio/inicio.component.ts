import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

  juegos: any[] = [];

  ngOnInit(): void {
    // Enviando un arreglo con sólo los atributos necesarios
    this.firestore.collection('goty').valueChanges()
                  .pipe(
                    map( (response: Game[]) => {
                      // return response.map( ({name, votos}) => ({name, value: votos}));
                      // o
                      return response.map( juego => {
                        return {
                          name: juego.name,
                          value: juego.votos
                        };
                      });
                    })
                  )
                  .subscribe( response => {
                    // console.log(response);
                    this.juegos = response;
                  });

  // Enviando un arreglo de juegos
  // this.firestore.collection('goty').valueChanges()
  // .subscribe( (response: Game[]) => {
  //   // console.log(response);
  //   this.juegos = response;
  // });
  }

}
