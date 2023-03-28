import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: string;
  title = 'editor-js-sample';

  editorJsUrl;
  config = {
    holder: 'editor-js-profile',
    placeholder: 'Placeholder from instance',
    onReady: () => {
    },
    onChange: (api, event) => {
    },
    inlineToolbar: ['link', 'bold', 'italic'],
    editorTools: ['header', 'table', 'checklist', 'list', 'image', 'raw', 'embed'],
    tools: {}
  }

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe({
      next: res => {
        console.log('res', res);
        if (res && res['id']) {
          this.id = res['id'];
          this.editorJsUrl = `/api/wiki/posts/${this.id}`;
        }
      }
    })
  }

}
