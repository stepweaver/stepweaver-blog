import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import { getPost } from '../../actions/post';

const Post = () => {
  const dispatch = useDispatch();

  const { post, loading } = useSelector((state) => state.post);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/posts' className='btn bg-light hover:bg-gray-300'>
            Back To Posts
          </Link>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
        </>
      )}
    </>
  );
};

export default Post;
