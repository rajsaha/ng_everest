import { Component, OnInit } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { Article } from 'src/app/interfaces/article';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  article: Article;

  // Editor
  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Share your thoughts...',
    toolbar: [
      'heading',
      '|',
      'alignment',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'undo',
      'redo'
    ]
  };

  constructor() {
    this.article = {
      title: '',
      text: ''
    };
  }

  ngOnInit() {
  }

}
