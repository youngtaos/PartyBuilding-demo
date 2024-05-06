/* eslint-disable no-undef */
// import { IDomEditor, IModalMenu, SlateNode } from "@wangeditor/editor";
import { Boot } from "@wangeditor/editor";
import axios from "axios";
import qs from "qs";

//class MyModalMenu implements IModalMenu {    // TS 语法
class MyModalMenu {
  // JS 语法

  constructor() {
    this.title = "AI";
    // this.iconSvg = '<svg >...</svg>'
    this.tag = "button";
    this.showModal = true;
    this.modalWidth = 600;
    this.result = "";
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
    axios
      .post(
        "/api/people/getOpenaiText",
        qs.stringify({ content: editor.getSelectionText() }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        console.log(JSON.parse(res.data.data).result);
        this.result = JSON.parse(res.data.data).result;
        setTimeout(() => {
          this.getModalContentElem();
        }, 2000);
      });
    // Modal menu ，这个函数不用写，空着即可
  }

  // 弹出框 modal 的定位：1. 返回某一个 SlateNode； 2. 返回 null （根据当前选区自动定位）
  // getModalPositionNode(editor: IDomEditor): SlateNode | null {  // TS 语法
  getModalPositionNode(editor) {
    // JS 语法
    return null; // modal 依据选区定位
  }

  // 定义 modal 内部的 DOM Element

  getModalContentElem(editor) {
    // 创建一个包含内容的 div 元素
    const $div = document.createElement("div");
    const $content = document.createElement("div");
    $content.innerText = this.result;
    $div.appendChild($content);
    $div.classList.add("modalBox");
    $content.classList.add("modalContent");
    const $buttonBox = document.createElement("div");
    $buttonBox.classList.add("buttonBox1234");
    // 创建取消按钮
    const $cancel = document.createElement("button");
    $cancel.innerText = "取消";
    $cancel.classList.add("buttonquxiao"); // 添加样式类以便后续样式定制
    $cancel.addEventListener("click", () => {
      console.log("Cancel button clicked!");
      // this.showModal = false;
      // 这里可以添加你想要执行的操作
    });
    // 创建确认按钮
    const $confirm = document.createElement("button");
    $confirm.innerText = "采用";
    $confirm.classList.add("buttoncaiyong"); // 添加样式类以便后续样式定制
    $confirm.addEventListener("click", function () {
      console.log("Cancel button clicked!");
      // 这里可以添加你想要执行的操作
    });
    // 将按钮添加到 $content 中
    $buttonBox.appendChild($cancel);
    $buttonBox.appendChild($confirm);

    $div.appendChild($buttonBox);

    // 将 $content 返回
    return $div;
  }
}

// Boot.registerMenu(menu1Conf);

export default MyModalMenu;
