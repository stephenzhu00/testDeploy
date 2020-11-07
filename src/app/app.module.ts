import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const config={
  apiKey: "AIzaSyBPwxmntiOL7hKVf23moKnuxCLyDvjCRio",
  authDomain: "testdeploy-5cb9f.firebaseapp.com",
  databaseURL: "https://testdeploy-5cb9f.firebaseio.com",
  projectId: "testdeploy-5cb9f",
  storageBucket: "testdeploy-5cb9f.appspot.com",
  messagingSenderId: "641110744793",
  appId: "1:641110744793:web:0b18739d71f5f6c10ea8c8"
}

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
