import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetaTag } from "@models/metaTag.model";

@Injectable({
  providedIn: 'root'
})
export class SeoServiceService {
  private urlMeta: string = "og:url";
  private titleMeta: string = "og:title";
  private descriptionMeta: string = "og:description";

  constructor(private metaService: Meta) { }

  public setFacebookTags(url: string, title: string, description: string): void {
    var tags = [
      new MetaTag(this.urlMeta, url),
      new MetaTag(this.titleMeta, title),
      new MetaTag(this.descriptionMeta, description),
    ];
    this.setTags(tags);
  }

  private setTags(tags: MetaTag[]): void {
    tags.forEach(siteTag => {
      this.metaService.updateTag({ property: siteTag.name, content: siteTag.value });
    });
  }
}
