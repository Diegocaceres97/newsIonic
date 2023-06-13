import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

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

  segmentChanged(category: any) {
   this.selectedCategory = category.detail.value;
    console.log(category.detail.value)
  }

}
