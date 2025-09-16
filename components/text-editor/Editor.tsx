"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

function TextEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      {/* <EditorContent editor={editor} /> */}
    </div>
  );
}

export default TextEditor;
