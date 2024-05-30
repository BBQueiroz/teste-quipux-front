import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MusicService } from '../music.service';
import { Playlist } from '../../dto/playlist.interface';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrl: './music-dialog.component.scss'
})
export class MusicDialogComponent implements OnInit {
  playlist!: Playlist;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MusicDialogComponent>,
    private service: MusicService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data.playlist) {
      this.playlist = data.playlist;
      console.log(this.playlist);
    }
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      ano: ['', Validators.required],
      album: ['', Validators.required],
      genero: ['', Validators.required],
    });
  }


  submit() {
    const values = this.formGroup.getRawValue();
    
    let dto = {
      titulo: values.titulo,
      artista: values.artista,
      ano: values.ano,
      album: values.album,
      genero: values.genero,
      idPlaylist: this.playlist.id
    };

    this.service.create(dto).subscribe({
      next: resp => this.handleSuccess(resp),
      error: error => console.log(error)
    }); 
  }

  handleSuccess(resp: Object): void {
    this.dialogRef.close(true);
  }

}
