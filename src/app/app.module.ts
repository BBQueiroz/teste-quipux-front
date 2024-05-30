import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MyCustomPaginatorIntl } from './pagination/paginator-intl';
import { RequestInterceptor } from './auth/request.interceptor';
import { PlaylistDialogComponent } from './playlists/playlist-dialog/playlist-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MusicDialogComponent } from './playlists/musics/music-dialog/music-dialog.component';
import { MusicsComponent } from './playlists/musics/musics.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistsComponent,
    LoginComponent,
    PlaylistDialogComponent,
    MusicDialogComponent,
    MusicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    {provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
