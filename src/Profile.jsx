import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Favorite from '@material-ui/icons/Favorite';
import { getCookie } from './cookies'
import PostDetails from "./PostDetails";

import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import InfiniteScroll from "react-infinite-scroller";
import Navbar from "./Nav";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.paper,
    },
    user: {
        flexGrow: 1,
        marginTop: '5%',
    },
    list: {
        flexGrow: 1,
        padding: theme.spacing(2),
        margin: 'auto',
    },
    paper: {
        // padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

export default function Profile({ match: { params: { id: userId = 0 } = {} } = {}}) {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [isBusy, setBusy] = useState(true);
    const [postCount, setPostCount] = useState(0);
    const [skip, setSkip] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    async function fetchData() {
        const url = `http://localhost:8078/posts?user_id=${userId}`;

        fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Basic ${getCookie('token')}`,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json()).then((response) => {
            setBusy(false);
            if (response.posts) {
                const posts = response.posts;
                setData([ ...data, ...posts ]);
                setSkip(skip + posts.length);
            }

            if (response.count) {
                setPostCount(response.count);
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

    const dataAvailable = !isBusy && data && data[0];
    const totalLikes = dataAvailable && data && data.reduce((sum, post) => (sum + post.likes ), 0);
    const totalComments = dataAvailable && data && data.reduce((sum, post) => (sum + post.comments ), 0);

    const getItems = () => {
        if (!data) {
            return null;
        }
        return data.map(({ photos, content, user: { name, id, imageUrl }, likes, comments}, index ) => {
            const [{ thumbUrl }] = photos;
            return (
            <GridListTile
                key={`${thumbUrl}${index}`}
                className="imgContainer"
                cols={1}
                onClick={() => {
                    setOpenDetails(true);
                    setSelectedPost({
                        image: photos[0].thumbUrl,
                        content,
                        userName: name,
                        id,
                        userImage: imageUrl,
                        likes,
                        comments
                    })
                }}
            >
                <img className="image" src={thumbUrl} alt={content} />
                <div className="img-overlay" >
                    <Grid container direction="row">
                        <Grid item xs className='icon'>
                            <Favorite style={{ marginTop: '2px'}}/> <span>{likes}</span>
                        </Grid>

                        <Grid item xs className='icon'>
                            <ChatBubbleIcon style={{ marginTop: '2px'}}/> {comments}
                        </Grid>
                    </Grid>
                </div>
            </GridListTile>
        )});
    };

    const items = dataAvailable && (
        <GridList cellHeight={293} className="gridList" cols={4}>
            {getItems()}
        </GridList>
    );

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.user}>
                <div className={classes.paper}>
                    <Grid container>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                {dataAvailable ? (
                                <Avatar aria-label="recipe" className={classes.large} src={data[0].user.imageUrl}/> ) : (
                                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                    )
                                }
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} md container>
                            <Grid item xs container direction="column" >
                                <Grid item xs>
                                    {dataAvailable ? (
                                        <Typography gutterBottom variant="h3">
                                            {data[0].user.name}
                                        </Typography>): (
                                        <Skeleton animation="wave" variant="text"/>
                                        )
                                    }
                                   <Grid item xs container direction="row" >
                                       <Grid item xs>
                                           {dataAvailable ? (
                                               <Typography gutterBottom variant="body1">
                                                   <PostAddIcon /> {postCount} Posts
                                               </Typography>): (
                                               <Skeleton animation="wave" variant="text"/>
                                           )
                                           }
                                       </Grid>
                                       <Grid item xs>
                                           {dataAvailable ? (
                                               <Typography gutterBottom variant="body1">
                                                   <Favorite /> {totalLikes} Likes
                                               </Typography>): (
                                               <Skeleton animation="wave" variant="text"/>
                                           )
                                           }
                                       </Grid>
                                       <Grid item xs>
                                           {dataAvailable ? (
                                               <Typography gutterBottom variant="body1">
                                                   <ChatBubbleIcon /> {totalComments} Comments
                                               </Typography>): (
                                               <Skeleton animation="wave" variant="text"/>
                                           )
                                           }
                                       </Grid>
                                   </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <div className={classes.list}  style={{ marginTop: '5%' }}>
                {isBusy && <LinearProgress color="secondary" style={{ marginTop: '3%', height: '2rem' }}/>}
                {dataAvailable && data && <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchData}
                    hasMore={hasMoreItems}>
                    {items}
                </InfiniteScroll>}
            </div>
            {openDetails && <div>
                <PostDetails
                    opened={openDetails}
                    onClose={() => setOpenDetails(false)}
                    post={selectedPost}/>
            </div>}
        </div>
    );
}
