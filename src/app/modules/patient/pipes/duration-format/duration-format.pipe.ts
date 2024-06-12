import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: number): unknown {
    if (value < 1) {
      const seconds = Math.round(value * 60);
      return `${seconds} seconds`;
    }

    const minutes = Math.floor(value);
    const seconds = Math.round((value - minutes) * 60);
    
    if (value >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hours ${remainingMinutes} minutes ${seconds} seconds`;
    } else {
      return `${minutes} minutes ${seconds} seconds`;
    }
  }

}
