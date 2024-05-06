import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useLocation } from "react-router-dom";
import "@wangeditor/editor/dist/css/style.css";
import { Button } from "antd";
import { DomEditor } from "@wangeditor/editor";
import { Boot } from "@wangeditor/editor";
import MyModalMenu from "./chatMenu";

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
    const toolbar = DomEditor.getToolbar(editor);

    // const curToolbarConfig = toolbar.getConfig();
    if (toolbar) {
      const curToolbarConfig = toolbar.getConfig();
      // editor.getConfig().hoverbarKeys = {
      //   chat: { menukeys: ["chat"] },
      //   ...editor.getConfig().hoverbarKeys,
      // };
      curToolbarConfig.insertKeys = {
        index: 0, // 插入的位置，基于当前的 toolbarKeys
        keys: ["chat"],
      };
      editor.getConfig().hoverbarKeys.insertKeys = {
        index: 0, // 插入的位置，基于当前的 toolbarKeys
        keys: ["chat"],
      };
      editor.getConfig().hoverbarKeys.text.menuKeys.unshift("chat");
      // toolbarConfig.insertKeys = {
      //   index: 0, // 插入的位置，基于当前的 toolbarKeys
      //   key: "bold",
      // };
    }

    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div id="editorBox">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={goBack}>返回</Button>
        <Button style={{ background: "rgb(243, 30, 30)", color: "white" }}>
          {" "}
          保存
        </Button>
      </div>
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
    </div>
  );
};

export default MyEditor;
