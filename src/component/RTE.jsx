


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
