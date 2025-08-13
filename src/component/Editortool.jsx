// // editorTools.js

import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";   
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";

import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";

import Table from "@editorjs/table";

    export const EDITOR_TOOLS = {
      header: {
        class: Header,
        inlineToolbar: true,
        config: {
          placeholder: "Enter a header",
          levels: [1, 2, 3, 4, 5, 6],
          defaultLevel: 2,
        },
      },
      simpleimage: {
        class: SimpleImage,
          inlineToolbar: true,
          config: {
            placeholder:" image here"
        }
      },
      list: List,
      checklist: Checklist,
      quote: Quote,
      warning: Warning,
      marker: Marker,

      inlineCode: InlineCode,
      linkTool: LinkTool,

      table: Table,
    };