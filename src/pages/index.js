import React from 'react';
import { KeepAlive, history } from 'umi';

import VirtualizedList from './components/VirtualizedList';
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
          <VirtualizedList renderItem={renderItem} />
        </div>
      </KeepAlive>
    </div>
  );
};