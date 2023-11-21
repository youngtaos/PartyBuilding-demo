import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useLocation } from "react-router-dom";
import "@wangeditor/editor/dist/css/style.css";
import { Button } from "antd";

const MyEditor = () => {
  const [editor, setEditor] = useState(null); // 存储 editor 实例

  const { state } = useLocation();

  const HtmlString = `${state.title} <img src="${state.imgSrc}"/> ${state.content} <p>${state.message}<p/>`;
  const [html, setHtml] = useState(HtmlString);

  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
  };
  const goBack = () => {
    window.history.go(-1);
  };
  // 及时销毁 editor
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <Button onClick={goBack}>返回</Button>
      <div style={{ border: "1px solid #ccc", zIndex: 100, marginTop: "15px" }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px" }}
        />
      </div>
    </>
  );
};

export default MyEditor;
