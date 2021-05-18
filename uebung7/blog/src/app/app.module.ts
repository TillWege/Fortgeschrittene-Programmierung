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

@NgModule({
  declarations: [
    AppComponent,
    ArtikelComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    TagcloudComponent,
    MonthlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
