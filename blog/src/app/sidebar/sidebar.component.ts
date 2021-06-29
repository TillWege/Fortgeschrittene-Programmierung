import { Component, OnInit, Input} from '@angular/core';
import { Artikel } from '../artikel';
import { BlogartikelService } from '../blogartikel.service';
import { LoginStates } from '../data';
import { UpdateComponentListener } from '../update-component-listener';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, UpdateComponentListener {

  Query!: String;
  Username!: String;
  Password!: String;
  Serverpath!: String;
  loggedin!: boolean;
  constructor(private service: BlogartikelService) {
    service.addUpdateComponentListener(this)
  }

  ngOnInit(): void {
    this.Query = "";
    this.Username = "";
    this.Password = "";
    this.Serverpath = this.service.getServerURL();
    this.loggedin = false;
  }

  reload(){
    this.loggedin = this.service.loginState > LoginStates.Anon
  }

  doLogin(){
    this.service.doLogin(this.Username.toString(), this.Password.toString())
  }

  doLogout(){
    this.service.doLogout()
  }

  isAdmin(): boolean{
    return this.service.loginState == LoginStates.Admin
  }

  updateServer(){
    this.service.updateServer(this.Serverpath.toString())
  }
}
