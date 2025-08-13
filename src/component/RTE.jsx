// import React, { useRef} from "react";

// import Editor from "./Editor"
// import { Controller } from "react-hook-form";
// import Header from "@editorjs/header";


// export default function RTE({ name, control, label, defaultValue = "" }) {
//    const editorRef = useRef(null);
//   const editorInstanceRef = useRef(null);
//   useEffect(() => {
//     if (!editorRef.current) return;

//     const editor = new EditorJS({
//       holder: editorRef.current,
//       tools: {
//         header:Header
//         // list: require("@editorjs/list"),
//         // paragraph: require("@editorjs/paragraph"),
//       },
//       data: defaultValue ? JSON.parse(defaultValue) : {},
//       onReady: () => {
//         console.log("Editor.js is ready!");
//         editorInstanceRef.current = editor;
//       },
//     });

//     return () => {
//       editor.isReady
//         .then(() => editor.destroy())
//         .catch((e) => console.error("ERROR editor cleanup", e));
//     };
//   }, []);
  
//   return (
//     <div
//       className="w-full"
//       style={{ minHeight: "300px", padding: "16px", border: "1px solid gray" }}
//     >
//       {label && <label className="inline-block mb-1 pl-1"> {label}</label>}
//       <Controller
//         name={name || "content"}
//         control={control}
//         defaultValue={defaultValue}
//         render={({ field: { onChange, value } }) => (   )}
        
//       />
//     </div>
//   );
// }


import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { Controller } from "react-hook-form";
import Header from "@editorjs/header";
 import List from "@editorjs/list";
import EditorBasic from "./Editor";
import { EDITOR_TOOLS } from "./Editortool";

function RTE({ name, control, defaultValue, label }) {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const savedOnChange = useRef(null);

  // useEffect(() => {
  //   if (!editorRef.current) return;
  //   console.log("Editor mount ref:", editorRef.current);

  //   const editor = new EditorJS({
  //     holder: editorRef.current,
  //     tools: {
  //       header:Header,
  //       list: List,
  //       // paragraph: require("@editorjs/paragraph"),
  //     },
  //     data: defaultValue ? JSON.parse(defaultValue) : {},
  //     onReady: () => {
  //       console.log("Editor.js is ready!");
  //       editorInstanceRef.current = editor;
  //     },
  //   });

  //   return () => {
  //     editor.isReady
  //       .then(() => editor.destroy())
  //       .catch((e) => console.error("ERROR editor cleanup", e));
  //   };
  // }, []);

    // const handleBlur = async () => {
    //   if (editorInstanceRef.current) {
    //     const savedData = await editorInstanceRef.current.save();
    //     onChange(JSON.stringify(savedData));
    //   }
    // };

  
   useEffect(() => {
     if (!editorRef.current || editorInstanceRef.current) return;

     const editor = new EditorJS({
       holder: editorRef.current,
       tools: EDITOR_TOOLS,
       data: defaultValue ? JSON.parse(defaultValue) : {},
       onChange: async () => {
         if (savedOnChange.current && editor) {
           const content = await editor.save();
           savedOnChange.current(JSON.stringify(content));
         }
       },
       onReady: () => {
         console.log("✅ Editor.js is ready!");
         editorInstanceRef.current = editor;
       },
     });

     return () => {
       editor.isReady
         .then(() => editor.destroy())
         .catch((e) => console.error("Editor cleanup error", e));
     };
   }, []);
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => {
         savedOnChange.current = onChange;

         return (
           <div
             ref={editorRef}
             className="border p-2 rounded min-h-[250px] bg-white"
           />
         );
        }}
      />

     
    </div>
  );
}

export default RTE;
