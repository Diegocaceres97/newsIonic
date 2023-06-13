import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, News } from '../interfaces';
import { Observable, map } from 'rxjs';

const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.http
      .get<News>(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
      )
      .pipe(map(({ articles }) => articles));
  }

  getTopHeadlineByCategory(category: string): Observable<Article[]> {
    return this.http
      .get<News>(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
      )
      .pipe(map(({ articles }) => articles));
  }
}
