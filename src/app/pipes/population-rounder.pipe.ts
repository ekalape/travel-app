import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'populationRounder',
  standalone: true
})
export class PopulationRounderPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (!value) return "unknown"
    if (value >= 1000000) {
      if (value / 1000000 >= 2) return (value / 1000000).toFixed(1) + " Millions";
      return (value / 1000000).toFixed(1) + " Million";
    }
    if (value >= 1000) {
      if (value / 1000 >= 2) return (value / 1000).toFixed(1) + " Thousands";
      return (value / 1000).toFixed(1) + " Thousands";
    }
    return value.toString();
  }

}
