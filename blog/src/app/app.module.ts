import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtikelComponent } from './artikel/artikel.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TagcloudComponent } from './tagcloud/tagcloud.component';
import { MonthlistComponent } from './monthlist/monthlist.component';
import { ArtikelListeComponent } from './artikel-liste/artikel-liste.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ArtikelShareComponent } from './artikel-share/artikel-share.component';
import { ArtikelEditorComponent } from './artikel-editor/artikel-editor.component';
import { PagenNotFoundComponent } from './pagen-not-found/pagen-not-found.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArtikelComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    TagcloudComponent,
    MonthlistComponent,
    ArtikelListeComponent,
    ImpressumComponent,
    KontaktComponent,
    ArtikelShareComponent,
    ArtikelEditorComponent,
    PagenNotFoundComponent,
    CopyrightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
