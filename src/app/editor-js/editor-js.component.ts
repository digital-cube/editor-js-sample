import List from '@editorjs/list';
import Table from '@editorjs/table';
import RawTool from '@editorjs/raw';
import Embed from '@editorjs/embed';
import Header from "@editorjs/header";
import ImageTool from '@editorjs/image';
import EditorJS from "@editorjs/editorjs";
import Checklist from '@editorjs/checklist';
import {HttpClient} from "@angular/common/http";
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-editor-js',
  templateUrl: './editor-js.component.html',
  styleUrls: ['./editor-js.component.scss']
})
export class EditorJsComponent implements OnInit {
  editor;

  @Input() instanceUrl: string; // for fetching and saving data

  @Input() instanceConfig = { // If config is not provided, use defaults below
    holder: 'editor-js',
    placeholder: 'Placeholder text',
    onReady: () => {
      this.editor.focus();
    },
    onChange: (api, event) => {
    },
    inlineToolbar: ['link', 'bold', 'italic'],
    tools: {},
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    // Adding config that we do not want to override (same for every instance)
    this.instanceConfig = {
      ...this.instanceConfig,
      onReady: this.instanceConfig.onReady.bind(this),
      onChange: this.debounce(this.instanceConfig.onChange),
    }

    // For every plugin provided in instance, we add it to tools
    if (this.instanceConfig['editorTools']) {
      this.instanceConfig['editorTools'].forEach((tool: any) => {
        this.instanceConfig.tools[tool] = this.setTool(tool);
      })
    }

    this.http.get(this.instanceUrl)
      .subscribe({
        next: val => {
          this.editor = new EditorJS({
            ...this.instanceConfig,
            data: {...val['content']}
          })
          console.log('editor', this.editor);
        }, error: () => {
          this.editor = new EditorJS({
            ...this.instanceConfig
          })
        }
      })
  }

  // For every onChange event
  debounce(callback, timeout = 500) {
    let timer;
    return (...args) => {
      const [blocks, event] = [...args];
      clearTimeout(timer);
      this.onSave(event);
      timer = setTimeout(() => {
        callback.apply(this, args);
      }, timeout);
    };
  }

  onSave(event) {
    this.editor.save().then((data) => {
      // Data can't be empty if we are not moving or deleting a block
      if (!data.blocks[event.detail.index] && !['block-removed', 'block-moved'].includes(event.type)) {
        return;
      }
      const body = {  // 1) Same for every call
        type: event.type,
      }
      if (data.blocks[event.detail.index]) {
        body['data'] = data.blocks[event.detail.index];
      }
      if (event.type === 'block-moved') { // 2) If we only move a block up or down
        body['fromIndex'] = event.detail.fromIndex;
        body['toIndex'] = event.detail.toIndex;
      } else { // 3) If we change a block
        body['index'] = event.detail.index;
      }
      this.http.patch(this.instanceUrl, body)
        .subscribe();
    }).catch((err) => {
      console.log('err', err);
    });
  }

  setTool(val) {
    let tool;
    switch (val) {
      case 'header':
        tool = {
          class: Header,
          inlineToolbar: true
        }
        break;
      case 'table':
        tool = {
          class: Table,
          inlineToolbar: true
        };
        break;
      case 'checklist':
        tool = {
          class: Checklist,
          inlineToolbar: true
        };
        break;
      case 'list':
        tool = {
          class: List,
          inlineToolbar: true
        };
        break;
      case 'image':
        tool = {
          class: ImageTool,
          config: {
            byFile: '', // TODO: add endpoint
            byUrl: '' // TODO: add endpoint
          }
        }
        break;
      case 'raw':
        tool = {
          class: RawTool
        }
        break;
      case 'embed':
        tool = {
          class: Embed,
          inlineToolbar: true
        }
        break;
    }
    return tool;
  }
}
