import React from 'react';
import { KeepAlive, history } from 'umi';

import VirtualizedList from './components/VirtualizedList';
import AutoLoadList from './components/AutoLoadList';
import AntdList from './components/AntdList';
import styles from './index.less';

export default () => {
  const renderItem = data => (
    <div
      key={data.id}
      className={styles.card}
      onClick={() => history.push('detail')}
    >
      {data.id}
    </div>
  );

  return (
    <div className={styles.body}>
      <div className={styles.header} />
      <KeepAlive>
        <div id="container" className={styles.content}>
          <div className={styles.block} />
          {/* <AntdList renderItem={renderItem} /> */}
          <VirtualizedList renderItem={renderItem} />
        </div>
      </KeepAlive>
    </div>
  );
};
