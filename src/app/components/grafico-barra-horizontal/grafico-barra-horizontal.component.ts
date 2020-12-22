import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnDestroy {

  resultados: any[] = [
    {
      name: 'Juego 1',
      value: 20
    },
    {
      name: 'Juego 2',
      value: 25
    },
    {
      name: 'Juego 3',
      value: 15
    },
    {
      name: 'Juego 4',
      value: 30
    }
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  intervalo;

  constructor() {
    this.intervalo = setInterval( () => {
      console.log('tick');

      const newResults = [...this.resultados];

      // tslint:disable-next-line:forin
      for (const i in newResults) {
        newResults[i].value = Math.round(Math.random() * 500);
      }

      this.resultados = [...newResults];
    }, 1500);
  }

  onSelect(event): void{
    console.log(event);
  }

  ngOnDestroy(): void{
    clearInterval(this.intervalo);
  }
}
