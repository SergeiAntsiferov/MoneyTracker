import React from 'react';
import type { Children } from '../../../types';

function TFoot(props: Children) {
  const { children } = props;
  return (
    <tfoot className="table__foot">{children}</tfoot>
  );
}

export default TFoot;
