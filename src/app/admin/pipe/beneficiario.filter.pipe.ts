import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBeneficiario',
    pure: false
})

@Injectable()
export class SearchBeneficiarioPipe implements PipeTransform {
      transform(items: any[], busquedaBeneficiario): any {
        return busquedaBeneficiario && items ? items.filter(item =>
	((item.apellido_materno+"").toLowerCase().indexOf(busquedaBeneficiario.toLowerCase()) !== -1) 
||	((item.curp+"").toLowerCase().indexOf(busquedaBeneficiario.toLowerCase()) !== -1) 
||	((item.fecha_nacimiento+"").indexOf(busquedaBeneficiario) !== -1) 
||	((item.parentescoId+"").indexOf(busquedaBeneficiario) !== -1)
||	((item.nombre+"").toLowerCase().indexOf(busquedaBeneficiario.toLowerCase()) !== -1) 
||	((item.apellido_paterno+"").toLowerCase().indexOf(busquedaBeneficiario.toLowerCase()) !== -1) 
        ): items;
    }
}
