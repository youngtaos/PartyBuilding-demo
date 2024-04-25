import React from "react";

type HighlightKeywordsProps = {
  text: string;
  keywords: [];
};
const HighlightKeywords: React.FC<HighlightKeywordsProps> = (props) => {
  const { text, keywords } = props;
  // 对关键词进行排序，确保先匹配长的关键词
  keywords.sort((a: any, b: any) => b.length - a.length);

  // 构建正则表达式匹配关键词
  const regex = new RegExp(keywords.join("|"), "gi");

  // 使用正则表达式将字符串分割成三部分：关键词前的部分、关键词本身和关键词后的部分
  const parts = text.split(regex);

  // 将字符串中的关键词提取出来
  const matchedKeywords = text.match(regex) || [];

  return (
    <>
      <span>{parts[0]}</span>
      <span
        style={{ color: "red", fontWeight: "bold" }}
      >{` ${matchedKeywords} `}</span>
      <span>{parts.slice(1).join("")}</span>
    </>
  );
};

export default HighlightKeywords;
