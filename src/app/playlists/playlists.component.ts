import { Component, ViewChild } from '@angular/core';
import { Page } from '../pagination/page.interface';
import { FormGroup } from '@angular/forms';
import { Playlist } from './dto/playlist.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PlaylistService } from './playlist.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationParameters } from '../pagination/pagination-parameters.interface';
import { PlaylistDialogComponent } from './playlist-dialog/playlist-dialog.component';
import { Music } from './dto/music.interface';
import { MusicDialogComponent } from './musics/music-dialog/music-dialog.component';
import { expand } from 'rxjs';
import { MusicService } from './musics/music.service';
import { Router } from '@angular/router';
import { MusicsComponent } from './musics/musics.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent {
  page: Page<Playlist> | undefined;
  dataSource!: MatTableDataSource<Playlist>;
  musicSource!: MatTableDataSource<Music>;
  displayedColumns: string[] = ['nome', 'descricao', 'musicas', 'acoes'];
  displayedMusicColumns: string[] = [];
  formGroup!: FormGroup;
  filtroNome!: string;
  expandedElement!: Playlist | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: PlaylistService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.list();
  }

  list() {
    let paginationParameters: PaginationParameters = {
      size: this.paginator.pageSize,
      page: this.paginator.pageIndex,
      sort: ''
    };

    this.service.list(this.filtroNome, paginationParameters).subscribe({
      next: resp => this.loadData(resp),
      error: err => console.log(err),
    });
  }

  loadData(page: Page<Playlist>) {
    this.page = page;
    this.dataSource = new MatTableDataSource(page.content);
    this.dataSource.sort = this.sort;

    this.paginator.length = page.totalElements;
    this.paginator.pageIndex = page.pageable.pageNumber;
    this.paginator.pageSize = page.pageable.pageSize;
  }

  abrirDialog(playlist: Playlist | null = null) {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, { data: { playlist } });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.list();
      }
    });
  }

  showMusics(playlist: Playlist | null = null) {
    const dialogRef = this.dialog.open(MusicsComponent, { data: { playlist } });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.list();
      }
    });
  }

  delete(item: Playlist) {
    this.service.delete(item.id).subscribe({
      next: resp => this.list(),
      error: error => console.log(error),
    });
  }

}
