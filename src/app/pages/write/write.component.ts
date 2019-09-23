import { Component, OnInit } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { Article } from 'src/app/interfaces/article';
import { CloudinaryImageUploadAdapter } from 'ckeditor-cloudinary-uploader-adapter';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  article: Article;

  // Editor
  public Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Share your thoughts...',
    extraPlugins: [ this.imagePluginFactory ]
  };

  constructor() {
    this.article = {
      title: '',
      text: ''
    };
  }

  ngOnInit() {
  }

  imagePluginFactory(editor) {
    try {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new CloudinaryImageUploadAdapter(
          loader,
          'rajsaha',
          'ebgizjgk',
          [ 160, 500, 1000, 1052 ]);
      };
    } catch (error) {
      console.error(error);
    }
  }

}
