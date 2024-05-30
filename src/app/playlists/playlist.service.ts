import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationParameters } from '../pagination/pagination-parameters.interface';
import { Observable } from 'rxjs';
import { Page } from '../pagination/page.interface';
import { Playlist } from './dto/playlist.interface';
import { NovaPlaylist } from './dto/nova-playlist.interface';
import { AtualizarPlaylist } from './dto/atualizar-playlist.interface';

const ENDPOINT = 'http://localhost:8080/lists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  list(filtros: any, paginationParameters: PaginationParameters): Observable<Page<Playlist>> {
    let params = new HttpParams({
      fromObject: {
        size: paginationParameters.size,
        page: paginationParameters.page,
        sort: paginationParameters.sort
      }
    });

    for (let filtro in filtros) {
      let valor = filtros[filtro];
      if(valor)
        params = params.set(filtro, valor);
    }

    return this.http.get<Page<Playlist>>(ENDPOINT, { params });
  }

  getOne(id: Number): Observable<Playlist>{
    return this.http.get<Playlist>(ENDPOINT+ `/${id}`);
  }

  create(dto: NovaPlaylist) {
    console.log(dto);
    return this.http.post(ENDPOINT, dto);
  }

  update(id: number, dto: AtualizarPlaylist) {
    return this.http.put(ENDPOINT + `/${id}`, dto);
  }

  delete(id: number) {
    const endpoint = ENDPOINT + `/${id}`;
    return this.http.delete(endpoint);
  }
}
