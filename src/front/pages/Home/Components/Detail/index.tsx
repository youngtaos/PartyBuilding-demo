import React from "react";
import { useLocation } from "react-router-dom";

interface data {
  title: string;
  content: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: Array<string>;
}
const Detail: React.FC = (props) => {
  // content, title, imgSrc, academy, message, people
  const { state } = useLocation();
  return (
    <div>
      <div>{state.title}</div>
      <div>{state.people}</div>
      <div>{state.message}</div>
      <img src={state.imgSrc}></img>
      <div>{state.content}</div>
    </div>
  );
};

export default Detail;
