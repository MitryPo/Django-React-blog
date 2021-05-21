import React, { useState, useEffect } from 'react'
import axiosInstance from './axios';
import PostLoadingComponent from '../Posts/postLoading'
import Posts from './posts'
import Header from '../header'
import Footer from '../footer'


export default function Admin() {

	const PostLoading = PostLoadingComponent(Posts)
	const [appState, setAppState] = useState({
		posts: null,
		loading: true,
	})

	useEffect(() => {
		axiosInstance.get('posts/my/')
			.then((res) => {
				setAppState({
					posts: res.data,
					loading: false
				})
			})
	}, [])


	return (
		<div>
			<Header />
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
			<Footer />
		</div>
	)
}
