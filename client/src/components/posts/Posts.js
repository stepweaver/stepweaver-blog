import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';

const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const { posts, loading } = post;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className='large text-primary font-semibold'>Posts</h1>
          <p className='lead text-light'>
            <i className='fas fa-user-friends text-primary'></i> Welcome to the
            community
          </p>
          {/* <PostForm /> */}
          <div className='posts'>
            {posts.length > 0 ? (
              posts.map((post) => <PostItem key={post._id} post={post} />)
            ) : (
              <h4>No posts found...</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
