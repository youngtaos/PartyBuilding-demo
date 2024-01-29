import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, Divider, List, Skeleton } from "antd";
type ArticleListProps = {
  articles: any[];
};
interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}
const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const simulateLoadMoreData = async (
    startIndex: number,
    loadCount: number
  ) => {
    // 模拟异步操作，从数据源中获取指定范围的数据
    return new Promise((resolve) => {
      setTimeout(() => {
        const segmentData = articles.slice(startIndex, startIndex + loadCount);
        resolve(segmentData);
      }, 1000); // 模拟异步操作
    });
  };

  const loadMoreData = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const startIndex = data.length; // 当前数据的长度即起始索引
      const loadCount = 5; // 每次加载的数据条数

      const newDataSegment: any = await simulateLoadMoreData(
        startIndex,
        loadCount
      );

      // 更新数据
      setData([...data, ...newDataSegment]);
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (articles.length === 0) {
    return <></>;
  }

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "300px",
        overflow: "auto",
        //padding: "0 16px",
        //border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 10}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={articles}
          renderItem={(item, index) => {
            let people = item.people;
            if (typeof item.people === "string") {
              people = JSON.parse(item.people);
            }
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<Avatar src={item.imgSrc} />}
                  title={<a href={item.articleUrl}>{item.title}</a>}
                  description={people.join(" ")}
                />
                {/* <div>{item.title}</div> */}
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ArticleList;
