/* eslint-disable no-undef */
// import { IDomEditor, IModalMenu, SlateNode } from "@wangeditor/editor";
import { Boot } from "@wangeditor/editor";

//class MyModalMenu implements IModalMenu {    // TS 语法
class MyModalMenu {
  // JS 语法

  constructor() {
    this.title = "AI";
    // this.iconSvg = '<svg >...</svg>'
    this.tag = "button";
    this.showModal = true;
    this.modalWidth = 300;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  //isActive(editor: IDomEditor): boolean {    // TS 语法
  isActive(editor) {
    // JS 语法
    return false;
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  //getValue(editor: IDomEditor): string | boolean {    // TS 语法
  getValue(editor) {
    // JS 语法
    return "";
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  //isDisabled(editor: IDomEditor): boolean {   // TS 语法
  isDisabled(editor) {
    // JS 语法
    return false;
  }

  // 点击菜单时触发的函数
  //exec(editor: IDomEditor, value: string | boolean) {   // TS 语法
  exec(editor, value) {
    // JS 语法
    console.log(editor.getSelectionText());
    // Modal menu ，这个函数不用写，空着即可
  }

  // 弹出框 modal 的定位：1. 返回某一个 SlateNode； 2. 返回 null （根据当前选区自动定位）
  //getModalPositionNode(editor: IDomEditor): SlateNode | null {  // TS 语法
  //   getModalPositionNode(editor) {
  //     // JS 语法
  //     return null; // modal 依据选区定位
  //   }

  // 定义 modal 内部的 DOM Element

  //   getModalContentElem(editor) {
  //     // JS 语法
  //     // const $content = $("<div></div>");
  //     // const $button = $("<button>do something</button>");
  //     // $content.append($button);
  //     // $button.on("click", () => {
  //     //   editor.insertText(" hello ");
  //     // });
  //     // return $content[0]; // 返回 DOM Element 类型
  //     // PS：也可以把 $content 缓存下来，这样不用每次重复创建、重复绑定事件，优化性能
  //   }
}

// Boot.registerMenu(menu1Conf);

export default MyModalMenu;
