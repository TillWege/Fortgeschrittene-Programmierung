import { Injectable } from '@angular/core';
import { Artikel } from './artikel';
import { Observable,  Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UpdateComponentListener } from './update-component-listener';
import { LoginStates } from './data';
@Injectable({
  providedIn: 'root'
})
export class BlogartikelService {

  private url = "http://164.68.105.78:3200/";
  //private url = "http://localhost:3200/"
  listener!: UpdateComponentListener[];
  loginState: LoginStates = LoginStates.Anon;
  constructor(private http: HttpClient) {
    this.listener = [];
  }

  getArticles(pTag: string, pQuery: string, pMonth: string): Observable<Map<number, Artikel>>{
    return this.http.get<Map<number, Artikel>>(`${this.url}articles?tag=${pTag}&query=${pQuery}&month=${pMonth}`)
  }

  getArticleByID(id:number): Observable<Artikel>{
    return this.http.get<Artikel>(`${this.url}article/${id}`)
  }

  updateArticle(pArtikel: Artikel): Observable<genericResponse>{
    let a = this.http.put<genericResponse>(`${this.url}article/${pArtikel.id}`,pArtikel) // 0 da auf dem Server die ID aus dem Body verwendet wird
    let r = new Subject<genericResponse>()
    a.subscribe(r)
    r.subscribe(()=>{
      this.updateComponents();
    })
    return r;
  }

  createArticle(pArtikel: Artikel): Observable<createArticlesResponse>{
    let a =  this.http.post<createArticlesResponse>(`${this.url}articles/`,pArtikel)
    let r = new Subject<createArticlesResponse>()
    a.subscribe(r)
    r.subscribe(()=>{
      this.updateComponents();
    })
    return r;
  }

  deleteArticleByID(ID: string): Observable<genericResponse>{
    let a = this.http.delete<genericResponse>(`${this.url}article/${ID}`)
    let r = new Subject<genericResponse>()
    a.subscribe(r)
    r.subscribe(()=>{
      this.updateComponents();
    })
    return r;
  }

  getTags(): Observable<Map<string, number>>{
    return this.http.get<Map<string, number>>(`${this.url}tags`)
  }

  getMonths(): Observable<number[]>{
    return this.http.get<number[]>(`${this.url}months`)
  }

  doLogin(username: string, password: string){
    let a =  this.http.get<loginResponse>(`${this.url}login?usr=${username}&pwd=${password}`)
    a.subscribe((Response: loginResponse)=>{
      if(!Response.success){
        window.alert("Falsche Login Daten")
      }
      this.loginState = Response.state;
      this.updateComponents();
    })
  }

  updateComponents(){
    this.listener.forEach((Listener)=>{
      Listener.reload();
    })
  }

  addUpdateComponentListener(Listener: UpdateComponentListener){
    this.listener.push(Listener);
  }

  doLogout() {
    this.loginState = LoginStates.Anon
    this.updateComponents()
  }

  updateServer(pUrl: string) {
    this.url = pUrl;
    this.updateComponents()
  }

  uploadImage(image: File): Observable<fileUploadResponse>{
    let fd = new FormData()
    fd.append("uploads[]", image, image.name)
    return this.http.post<fileUploadResponse>(`${this.url}image`, fd)
  }

  getServerURL(): string{
    return this.url;
  }

}
export interface genericResponse{
  success: Boolean
}

export interface loginResponse{
  success: Boolean;
  state: LoginStates;
}

export interface createArticlesResponse{
  success: Boolean;
  id: number;
}

export interface fileUploadResponse{
  success: Boolean;
  path: string;
}
