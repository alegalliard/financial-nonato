// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule} from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDatabase } from './in-memory-database';
// esses caras aqui em cima foram para o core module
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule,
    CoreModule, // carregado uma única vez
    
    // Configurando todas as chamadas de api para o in-memory-web-api. 
    // Remover quando for fazer a chamada pro backend
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
