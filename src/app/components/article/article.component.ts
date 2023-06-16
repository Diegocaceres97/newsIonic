import { StorageService } from './../../services/storage-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  @Input() article!: Article;
  @Input() index!: number;

  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  async onOpenMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        handler: async()=>await this.onShareArticle()
      },
    {
      text: 'Favorito',
      icon: 'heart-outline',
      handler:() => this.onToggleFavorito()
    },
  {
    text: 'Cancelar',
    icon: 'close-outline',
    role: 'cancel'
  }]
    });

    await actionSheet.present();
  }

  async openArticle(){

    if(this.platform.is('ios') || this.platform.is('ios')) {
      await Browser.open({ url: this.article.url });
      return;
    }

    window.open(this.article.url, '_blank');
  }

  async onShareArticle(){
    await Share.share({
      text: this.article.title,
      url: this.article.url,
    });
    console.log('share article')
  }

  onToggleFavorito(){
    this.storageService.saveRemoveArticle(this.article);
  }

}
