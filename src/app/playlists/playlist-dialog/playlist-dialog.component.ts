import { Component, Inject, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Playlist } from '../dto/playlist.interface';
import { Music } from '../dto/music.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.scss'
})
export class PlaylistDialogComponent implements OnInit {

  playlist: Playlist | undefined;
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PlaylistDialogComponent>,
    private service: PlaylistService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    if (data.playlist) {
      this.playlist = data.playlist;
    }
  }

  ngOnInit(): void {
    const nome = this.playlist ? this.playlist.nome : '';
    const descricao = this.playlist ? this.playlist.descricao : '';

    this.formGroup = this.formBuilder.group({
      nome: [nome, Validators.required],
      descricao: [descricao, Validators.required],
    });
  }


  submit() {
    const values = this.formGroup.getRawValue();
    
    let dto = {
      nome: values.nome,
      descricao: values.descricao,
    };

    if (this.playlist) {
      this.service.update(this.playlist.id, dto).subscribe({
        next: resp => this.handleSuccess(resp),
        error: error => console.log(error)
      });
    } else {
      this.service.create(dto).subscribe({
        next: resp => this.handleSuccess(resp),
        error: error => console.log(error)
      }); 
    }
  }

  handleSuccess(resp: Object): void {
    this.dialogRef.close(true);
  }

}
