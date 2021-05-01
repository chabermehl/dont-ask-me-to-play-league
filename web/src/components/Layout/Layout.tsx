import React from 'react';

import {StyledLayout} from './StyledLayout';

const Layout: React.FC<{}> = (props) => {
  const {children} = props;
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
