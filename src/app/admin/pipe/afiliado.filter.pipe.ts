import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterAfiliado',
    pure: false
})

@Injectable()
export class SearchAfiliadoPipe implements PipeTransform {
      transform(items: any[], busquedaAfiliado): any {
        return busquedaAfiliado && items ? items.filter(item =>
	(
    (item.beneficiarioId+"").indexOf(busquedaAfiliado) !== -1)
||	((item.fecha_afiliacion+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase) !== -1) 
||	((item.foto+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.correo+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.apellido_materno+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.acta_nacimiento+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.monto_pension+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.apellido_paterno+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.observaciones+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.nombre+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.generoId+"").indexOf(busquedaAfiliado) !== -1)
||	((item.semanas_cotizadas+"").toLowerCase().indexOf(busquedaAfiliado.toLowerCase()) !== -1) 
||	((item.nss+"").toLowerCase().indexOf(busquedaAfiliado) !== -1) 
        ): items;
    }
}