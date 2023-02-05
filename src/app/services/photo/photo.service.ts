import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { PhotoModel } from '../../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private httpClient: HttpClient) { }

  getPhotos(page: number): Observable<PhotoModel[]> {
    let randomDelay = Math.floor(Math.random() * (300 - 200 + 1) + 200);
    return this.httpClient.get<any>(`https://picsum.photos/v2/list?page=${page}&limit=21`)
      .pipe(delay(randomDelay));
  }
}
