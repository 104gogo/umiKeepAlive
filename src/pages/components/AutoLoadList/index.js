import React, { useState } from 'react';
import { useRequest } from '@umijs/hooks';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

let startIndex = 0;

const AutoLoadList = ({ renderItem }) => {
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // 获取列表
  const { loading, run } = useRequest(
    () => {
      const data = new Array(20)
        .fill({})
        .map((item, index) => ({ ...item, id: startIndex++ }));

      return new Promise(resolve => setTimeout(() => resolve(data), 1000));
    },
    {
      onSuccess(data) {
        setList([...list, ...data]);
      },
    },
  );

  const handleInfiniteOnLoad = () => {
    console.log(111111111);

    run();
  };

  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && hasMore}
        useWindow={false}
      >
        <List
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>{renderItem(item)}</List.Item>
          )}
        >
          {loading && (
            <div className="demo-loading-container">
              <Spin />
            </div>
          )}
        </List>
      </InfiniteScroll>
    </div>
  );
};

export default React.memo(AutoLoadList);
