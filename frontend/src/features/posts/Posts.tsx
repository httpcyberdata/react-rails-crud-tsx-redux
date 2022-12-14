import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { fetchPostsAsync, selectPosts } from './postsSlice';

function Posts() {
	const posts = useAppSelector(selectPosts);
	return <div>
		<h1>Posts </h1>
	</div>
}

export default Posts;