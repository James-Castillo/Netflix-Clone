import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input({required:true}) userImg: string = '';
  navList = ["Inicio", "Tv shows", "Noticias y populares", "Mi lista", "Buscar por lenguaje"]

  constructor (private _authService : AuthService) {}

  signOut() {
    this._authService.signOut();
  }
}
