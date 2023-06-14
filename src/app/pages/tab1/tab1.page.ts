import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article, News } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll!: IonInfiniteScroll;

  articles: Article[] = [];

  constructor(private newService: NewsService) {}
  ngOnInit(): void {
   this.newService.getTopHeadlines().subscribe(articles => {
    this.articles.push(...articles)
    });
  }

  loadData(){
    this.newService.getTopHeadlineByCategory('business',true)
    .subscribe(articles=> {

      if(articles.length === this.articles.length) {
        this.infiniteScroll.disabled=true;
        return;
      }

      this.articles = articles;
      this.infiniteScroll.complete();
    })
  }

}
