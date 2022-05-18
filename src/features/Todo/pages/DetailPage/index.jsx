import React from 'react';
import { useParams } from 'react-router-dom';

DetailPage.propTypes = {};

function DetailPage(props) {
  const { todoId } = useParams();

  return <div>{`Todo Detail ${todoId}`}</div>;
}

export default DetailPage;
