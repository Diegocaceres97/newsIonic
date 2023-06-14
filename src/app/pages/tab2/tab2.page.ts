import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonInfiniteScroll, {static:true}) infiniteScroll!: IonInfiniteScroll;

  categories: string[] = ["business","entertainment","general","health","science","sports","technology"]
  selectedCategory:string=this.categories[0];
  articles: Article[] = [];



  constructor(
    private newService: NewsService
  ) {}
  ngOnInit(): void {
    this.newService.getTopHeadlineByCategory(this.selectedCategory)
    .subscribe(article => {
      this.articles = article
    })
  }

  segmentChanged(category: Event) {
   this.selectedCategory = (category as CustomEvent).detail.value;
    this.newService.getTopHeadlineByCategory(this.selectedCategory)
    .subscribe(article => {
      this.articles = [...article]
    })
  }

  loadData(){
    this.newService.getTopHeadlineByCategory(this.selectedCategory,true)
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
