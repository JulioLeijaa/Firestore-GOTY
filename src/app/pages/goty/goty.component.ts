import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];
  cargando: boolean;

  constructor(private gameService: GameService) { }

  ngOnInit(): void{
    this.cargando = true;
    this.gameService.getNominados().subscribe( response => {
      setTimeout( () => {
        this.juegos = response;
        this.cargando = false;
      }, 1000);
    });
  }

  votarJuego(juego: Game): void{
    this.gameService.votarJuego(juego.id)
                    .subscribe( (response: {ok: boolean, mensaje: string}) => {
        if (response.ok) {
          juego.votos = juego.votos + 1;

          Swal.fire({
            icon: 'success',
            title: `Has votado por ${juego.name}.`,
            text: '¡Convoca a más personas para votar!',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Ooops! Ocurrió un error al votar.',
            text: `${response.mensaje}`,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar'
          });
        }
    });
  }

}


