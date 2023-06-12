import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private newService: NewsService) {}
  ngOnInit(): void {
   this.newService.getTopHeadlines().subscribe(articles => {
    console.warn(articles)
    });
  }

}