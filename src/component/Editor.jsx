// import React, { useRef } from "react";
// import { createReactEditorJS } from "react-editor-js";
// import Header from "@editorjs/header";

// const ReactEditorJS = createReactEditorJS();

// const tools = {
//   header: Header,
// };

// const MyEditor = ({ onChange, defaultValue }) => {
//   const editorCore = useRef(null);

//   return (
//     <ReactEditorJS
//       tools={tools}
//       defaultValue={defaultValue}
//       onReady={() => {
//         console.log("Editor is ready");
//       }}
//       onChange={async (api) => {
//         const data = await api.saver.save();
//         onChange(data); // This updates react-hook-form
//       }}
//       editorRef={(instance) => (editorCore.current = instance)}
//     />
//   );
// };

// export default MyEditor;
import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

import { EDITOR_TOOLS } from "./Editortool";

export default function EditorBasic() {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const editor = new EditorJS({
      holder: ref.current,
      tools: EDITOR_TOOLS ,
      data: {},
      onReady: () => {
        console.log("Editor ready!");
      },
    });

    return () => {
      editor.isReady.then(() => editor.destroy());
    };
  }, []);

  return (
    <div className="p-4">
      <div ref={ref} className="border min-h-[250px] rounded bg-white" />
    </div>
  );
}
