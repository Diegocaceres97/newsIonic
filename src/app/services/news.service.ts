import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, News, articlesByCategoryAndPage } from '../interfaces';
import { Observable, map, of } from 'rxjs';

const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private articlesByCategoryAndPage: articlesByCategoryAndPage = {};

  constructor(private http: HttpClient) {}

  private executeQuery<T>(endpoint: string) {
    console.log('Peticion HTTP realizada');
    return this.http.get<T>(`https://newsapi.org/v2${endpoint}`);
  }

  getTopHeadlines(): Observable<Article[]> {
    return this.getTopHeadlineByCategory('business');
  /*   return this.http
      .get<News>(
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
      )
      .pipe(map(({ articles }) => articles)); */
  }

  getTopHeadlineByCategory(
    category: string,
    loadMore: boolean = false
  ): Observable<Article[]> {
    if (loadMore) {
      return this.getArticlesByCategory(category);
    }

    if (this.articlesByCategoryAndPage[category]) {
      return of(this.articlesByCategoryAndPage[category].articles);
    }

    return this.getArticlesByCategory(category);
  }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if (this.articlesByCategoryAndPage[category]) {
      //this.articlesByCategoryAndPage[category].page +=1;
    } else {
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: [],
      };
    }

    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<News>(
      `/top-headlines?country=us&category=${category}&apiKey=${apiKey}&page=${page}`
    ).pipe(
      map(({ articles }) => {
        if (articles.length === 0) return this.articlesByCategoryAndPage[category].articles;

        this.articlesByCategoryAndPage[category] = {
          page: page,
          articles: [
            ...this.articlesByCategoryAndPage[category].articles,
            ...articles,
          ],
        };

        return this.articlesByCategoryAndPage[category].articles;
      })
    );
  }
}
