import React from 'react';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

const Loading = (props) => {
  const size = props?.size || 30;
  return (
    <UseAnimations
      animation={loading}
    //   wrapperStyle={{ width: 'auto' }}
      strokeColor="#fff"
      size={size}
    />
  );
};

export default Loading;
