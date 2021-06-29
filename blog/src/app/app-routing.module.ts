import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtikelEditorComponent } from './artikel-editor/artikel-editor.component';
import { ArtikelListeComponent } from './artikel-liste/artikel-liste.component';
import { ArtikelShareComponent } from './artikel-share/artikel-share.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { PagenNotFoundComponent } from './pagen-not-found/pagen-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/articles', pathMatch: 'full'},
  {path: 'articles', component: ArtikelListeComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'kontakt', component: KontaktComponent},
  {path: 'copyright', component: CopyrightComponent},
  {path: 'article/:id', component: ArtikelComponent},
  {path: 'edit/:id', component: ArtikelEditorComponent},
  {path: 'share/:id', component: ArtikelShareComponent},
  {path: '**', component: PagenNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
