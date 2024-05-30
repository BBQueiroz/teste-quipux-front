import { Injectable } from '@angular/core';
import { NovaMusica } from '../dto/nova-musica.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Page } from '../../pagination/page.interface';
import { PaginationParameters } from '../../pagination/pagination-parameters.interface';
import { Observable } from 'rxjs';
import { Music } from '../dto/music.interface';

const ENDPOINT = 'http://localhost:8080/musics';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(
    private http: HttpClient
  ) { }

  create(dto: NovaMusica) {
    console.log(dto);
    return this.http.post(ENDPOINT, dto);
  }

  delete(id: number) {
    const endpoint = ENDPOINT + `/${id}`;
    return this.http.delete(endpoint);
  }

  list(idParametro: number, paginationParameters: PaginationParameters): Observable<Page<Music>> {
    let params = new HttpParams({
      fromObject: {
        size: paginationParameters.size,
        page: paginationParameters.page,
        sort: paginationParameters.sort
      }
    });

    return this.http.get<Page<Music>>(ENDPOINT + `/${idParametro}`, { params });
  }
}
