// Page.js
import React from "react";

const Page = ({ title, text }) => (
  <div className="j-book-page">
    <h3>{title}</h3>
    {text.map((t, index) => (
      <p key={`text-${index}`}>{t}</p>
    ))}
  </div>
);

export default Page;
