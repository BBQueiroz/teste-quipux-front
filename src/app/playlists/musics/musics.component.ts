import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MusicDialogComponent } from './music-dialog/music-dialog.component';
import { Music } from '../dto/music.interface';
import { Playlist } from '../dto/playlist.interface';
import { MusicService } from './music.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrl: './musics.component.scss'
})
export class MusicsComponent {
  playlist!: Playlist;
  musics!: Music[];
  dataSource!: MatTableDataSource<Music>;
  displayedColumns: string[] = ['titulo', 'artista', 'ano', 'album', 'genero', 'acoes'];

  constructor(
    private service: MusicService,
    private playlistService: PlaylistService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<MusicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if (data.playlist) this.playlist = data.playlist;
  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    this.musics = this.playlist.musics;
    this.loadPlaylist();
  }

  loadPlaylist(){
    this.playlistService.getOne(this.playlist.id).subscribe({
      next: resp => this.list(resp),
      error: err => console.log(err),
    });
  }

  list(playlist: Playlist) {
    this.dataSource = new MatTableDataSource(playlist.musics);
    console.log("carregando musicas");
  }


  abrirDialog() {
    const dialogRef = this.dialog.open(MusicDialogComponent, { data: { playlist:this.playlist }});
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.loadPlaylist();
      }
    });
  }
  
  delete(item: Music){
    this.service.delete(item.id).subscribe({
      next: resp => this.loadPlaylist(),      
      error: error => console.log(error),
    });
  }
}
