import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async saveRemoveArticle(article: Article) {
    this._localArticles = [article,...this._localArticles];
    this._storage?.set('articles', this._localArticles);
  }
}
