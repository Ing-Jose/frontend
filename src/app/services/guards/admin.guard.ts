import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public _usuarioService:UsuarioService){}
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  canActivate(){
    if (this._usuarioService.usuario.rol === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por Guards Admin');
      this._usuarioService.logout();
      return false;
    }
  }
}
