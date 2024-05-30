import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { authGuard } from './auth/auth.guard';
import { MusicsComponent } from './playlists/musics/musics.component';

const routes: Routes = [
  { path: '', redirectTo: '/playlists', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [authGuard] },
  { path: 'playlists/musics', component: MusicsComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
