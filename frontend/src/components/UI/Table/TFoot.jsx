import React from 'react';

function TFoot(props) {
  const { children } = props;
  return (
    <tfoot className="table__foot">{children}</tfoot>
  );
}

export default TFoot;
