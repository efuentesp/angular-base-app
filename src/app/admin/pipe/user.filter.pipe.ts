import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterUser',
    pure: false
})

@Injectable()
export class SearchUserPipe implements PipeTransform {
      transform(items: any[], busquedaUser): any {
        return busquedaUser && items ? items.filter(item =>
	(item.userName.indexOf(busquedaUser) !== -1) 
||	(item.firstname.indexOf(busquedaUser) !== -1) 
||	(item.lastname.indexOf(busquedaUser) !== -1) 
||	(item.email.indexOf(busquedaUser) !== -1)
        ): items;
    }
}
