import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';
import Post from './Post';
import { getCookie } from './utils/cookie';


import { baseUrl } from "./utils/api";
import Navbar from "./Nav";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    const [data, setData] = useState([]);
    const [isBusy, setBusy] = useState(true);
    const [skip, setSkip] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [redirect, setRedirect] = useState(false);

    /**
     * Fetching posts from api, in dashboard view
     * @returns {Promise<void>}
     */
    async function fetchData() {
        const take = 10;
        const url = `${baseUrl}/posts?take=${take}&skip=${skip}`;

        fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Basic ${getCookie('token')}`,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json()).then((response) => {
            setBusy(false);

            if (response.errors) {
               setRedirect(true);
            }

            if (response.posts) {
                const posts = response.posts;
                setData([ ...data, ...posts ]);
                setSkip(skip + posts.length);
            }
            if (response.count) {
                if (skip >= response.count) {
                    setHasMoreItems(false);
                }
            }
        }).catch(() => {
            setBusy(false);
            setData(null);
        });
    }

    useEffect(() => {
        setBusy(true);
        fetchData();
    }, []);

    /**
     * Rendering each posts using the Post component
     * @type {*[]}
     */
    const items = (data && data.map(({
         photos,
         content,
         user: { name, id, imageUrl: userImage },
         id: postId,
         createdAt,
         likes,
         comments,
    })=> {
        const [{ thumbUrl }] = photos;
        return <Post
            key={postId}
            image={thumbUrl}
            userImage={userImage}
            content={content}
            userName={name} id={id}
            createdAt={createdAt}
            likes={likes}
            comments={comments}
        />
    })) || [];

    return (
        <div className={classes.root}>
            {redirect && <Redirect to='/login'/>}
            <Navbar />
            {isBusy && <LinearProgress color="secondary" style={{ marginTop: '3%', height: '2rem' }}/>}
            {!isBusy && items.length && <div>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchData}
                    hasMore={hasMoreItems}>
                    {items}
                </InfiniteScroll>
            </div>}
        </div>
    );
}
