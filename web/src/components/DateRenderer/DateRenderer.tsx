import React from 'react';
import format from 'date-fns/format';

import {useQuery} from '../../hooks/';
import {Layout} from '../index';

const DateRenderer = () => {
  const {data, loading, error} = useQuery('/.netlify/functions/status');

  if (loading || !data) {
    return (
      <Layout>
        <div>loading</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>error</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <span>{format(new Date(data.currentTime), 'MM/dd/yyyy')}</span>
    </Layout>
  );
};

export default DateRenderer;
