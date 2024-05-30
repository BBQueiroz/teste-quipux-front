import { Music } from "./music.interface";

export interface Playlist{
    id: number,
    nome: string,
    descricao: string,
    musics: Music[]
}