import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'editor-js-sample';

  editorJsUrl = 'api/v3/wiki/editorjs';
  config = {
    holder: 'editor-js-profile',
    placeholder: 'Placeholder from instance',
    onReady: () => {},
    onChange: (api, event) => {},
    inlineToolbar: ['link', 'bold', 'italic'],
    editorTools: ['header', 'table', 'checklist', 'list', 'image', 'raw', 'embed'],
    tools: {}
  }
}
