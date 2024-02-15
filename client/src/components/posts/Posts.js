import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';

const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  
  return <div>Post</div>;
};

export default Post;
