import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterUser',
    pure: false
})

@Injectable()
export class SearchUserPipe implements PipeTransform {
      transform(items: any[], busquedaUser): any {
        return busquedaUser && items ? items.filter(item =>
	(item.username.toLowerCase().indexOf(busquedaUser.toLowerCase()) !== -1) 
||	(item.firstname.toLowerCase().indexOf(busquedaUser.toLowerCase()) !== -1) 
||	(item.lastname.indexOf(busquedaUser) !== -1) 
||	(item.email.toLowerCase().indexOf(busquedaUser.toLowerCase()) !== -1)
        ): items;
    }
}
