import React, { useState, useRef } from 'react';
import { useRequest } from '@umijs/hooks';
import { Button, List } from 'antd';

let startIndex = 0;

export default ({ renderItem }) => {
  const containerRef = useRef(null);

  // 获取列表
  const { data, loading, noMore, loadMore, loadingMore } = useRequest(
    () => {
      const data = new Array(20)
        .fill({})
        .map((item, index) => ({ ...item, id: startIndex++ }));

      return new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              total: data.length,
              list: data,
            }),
          1000,
        ),
      );
    },
    {
      loadMore: true,
    },
  );

  const { list = [] } = data || {};

  const renderFooter = () => (
    <>
      {!noMore && (
        <Button onClick={loadMore} loading={loadingMore}>
          {loadingMore ? 'Loading more' : 'Click to load more'}
        </Button>
      )}

      {noMore && <span>No more data</span>}

      <span style={{ float: 'right', fontSize: 12 }}>total: {list.length}</span>
    </>
  );
  console.log('list', list);

  return (
    <div ref={containerRef}>
      <List
        footer={!loading && renderFooter()}
        loading={loading}
        bordered
        dataSource={list}
        renderItem={item => <List.Item>{renderItem(item)}</List.Item>}
      />
    </div>
  );
};
