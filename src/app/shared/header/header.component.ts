import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    
  }

  Logout() {
    localStorage.removeItem('Autenticated');
    localStorage.removeItem('usAu')
    this._router.navigate(['login']);
  }

}
