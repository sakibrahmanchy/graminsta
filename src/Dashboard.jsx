import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfiniteScroll from 'react-infinite-scroller';
import { Redirect } from 'react-router'
import Post from './Post';
import { getCookie } from './cookies'


import LinearProgress from '@material-ui/core/LinearProgress';
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

    async function fetchData() {
        const take = 10;
        const url = `http://localhost:8078/posts?take=${take}&skip=${skip}`;

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


    const items = (data && data.map(({ photos, content, user: { name, id, imageUrl: userImage }, id: postId })=> {
        const [{ thumbUrl }] = photos;
        // eslint-disable-next-line no-unused-expressions
        return <Post
            key={postId}
            image={thumbUrl}
            userImage={userImage}
            content={content}
            userName={name} id={id} />
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
