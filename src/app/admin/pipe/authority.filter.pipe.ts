import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterAuthority',
    pure: false
})

@Injectable()
export class SearchAuthorityPipe implements PipeTransform {
      transform(items: any[], busquedaAuthority): any {
        return busquedaAuthority && items ? items.filter(item =>
		(item.name.indexOf(busquedaAuthority) !== -1) 
        ): items;
    }
}
