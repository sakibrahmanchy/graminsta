import React, {useEffect, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import FavoriteIcon from "@material-ui/icons/Favorite";
import {green} from "@material-ui/core/colors";
import Grid from '@material-ui/core/Grid';
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { baseUrl } from "./utils/api";
import { getCookie } from "./utils/cookie";
import { formatDate } from "./utils/date";

const styles = () => ({
    root: {
        margin: 0,
        height: '500px',
        width: '935px',
        overflow: 'auto',
    },
    closeButton: {
        position: 'absolute',
    },
    media: {
        height: '100%',
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: green[500],
    },
});


const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function PostDetails({ opened, onClose, post }) {
    const { postId } = post;
    const classes = styles();
    const [open, setOpen] = useState(opened);
    const [imgLoading, setImgLoading] = useState(true);
    const [isBusy, setBusy] = useState(false);
    const [data, setData] = useState(false);


    async function fetchData(id) {
        const url = `${baseUrl}/posts/${id}`;

        fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Basic ${getCookie('token')}`,
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json()).then((response) => {
            setBusy(false);

            if (response) {
               setData(response)
            }
        }).catch(() => {
            setBusy(false);
            setData(null);
        });
    }

    useEffect(() => {
        setBusy(true);
        fetchData(postId);
    }, []);

    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    const {
            photos = [],
            content = '',
            user: { id = 0, name: userName = '', imageUrl: userImage = '' } = {},
            likes,
            comments,
            createdAt: postCreatedAt = '',
    } = data || {};
    const [{ thumbUrl: image = ''} = {}] = photos;
    const showloader = isBusy || imgLoading;

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth = {'md'}
                style={{ height: '800px', overlow: 'hidden' }}
            >
                <DialogContent dividers style={{ overflow: 'hidden' }}>
                    <div>
                        <Grid container direction="row" >
                            <Grid item xs={7}>
                                {showloader ? <Skeleton variant="rect" width={550} height={700} /> : null }
                                <img
                                    hidden={showloader}
                                    src={image}
                                    style={{ width: '100%', height: '700px' }}
                                    onLoad={() => {
                                        setTimeout(() => {
                                            setImgLoading(false)
                                        }, 300);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} style={{ padding: '10px' }}>
                                <div style={{ float: 'right', marginBottom: '10px' }}>
                                    <CloseIcon onClick={() => {onClose(true)}} style={{ cursor: "pointer" }}/>
                                </div>
                                <CardHeader
                                    avatar={
                                        showloader ? (
                                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                        ) : (
                                            <Avatar aria-label="recipe" src={userImage}/>
                                        )
                                    }
                                    title={showloader ?
                                        (
                                            <Skeleton animation="wave" height={10}  style={{ marginBottom: 6 }} />
                                        ) :
                                        (<b>{userName} </b>)
                                    }
                                    subheader={showloader ? (<Skeleton animation="wave" height={10} width="50%" />) :
                                        (formatDate(postCreatedAt))
                                    }
                                />
                               <div style={{ padding: '16px', paddingTop: '0px' }}>
                                   <div>
                                       <Typography variant="body2" color="textSecondary" component="p">
                                           {showloader ? (
                                              <span>
                                                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                  <Skeleton animation="wave" height={10}  style={{ marginBottom: 6 }} />
                                                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                  <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                  <Skeleton animation="wave" height={10} width="50%" />
                                              </span>

                                           ): (
                                              <p>
                                                  {content}
                                              </p>
                                           )}
                                       </Typography>
                                   </div>
                                   <Grid container direction="row" style={{ paddingTop: '10px' }}>
                                       {showloader ? <Skeleton animation="wave"  width={30} height={30} />:
                                           (<Grid item xs className="icon">
                                               <FavoriteIcon style={{ marginTop: '2px'}}/> <span>{likes}</span>
                                           </Grid>)}

                                       {showloader? <Skeleton animation="wave" width={30} height={30} style={{ marginLeft: '20px'}}/> : (
                                           <Grid item xs className='icon'>
                                               <ChatBubbleIcon style={{ marginTop: '2px', marginLeft: '-110px' }}/> {comments.length}
                                           </Grid>
                                       ) }
                                   </Grid>
                               </div>
                                <div style={{ height: '520px', overflow: 'scroll'}}>
                                    <List className={classes.root}>
                                        {
                                            showloader ?
                                            (
                                                <div style={{ padding: '16px' }}>
                                                    <div style={{ paddingTop: '10px'}}>
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10}  style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} width="50%" />
                                                    </div>

                                                    <div style={{ paddingTop: '10px'}}>
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10}  style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} width="50%" />
                                                    </div>

                                                    <div style={{ paddingTop: '10px'}}>
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10}  style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                                        <Skeleton animation="wave" height={10} width="50%" />
                                                    </div>
                                                </div>
                                            )
                                            :
                                                ( comments.map(({
                                                    content: commentContent = '',
                                                    user: {
                                                        name: userName = '',
                                                        imageUrl = '',
                                                    },
                                                }) => {
                                                return (
                                                    <div>
                                                        <ListItem alignItems="flex-start">
                                                            <ListItemAvatar>
                                                                <Avatar alt="Remy Sharp" src={imageUrl} />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={userName}
                                                                secondary={
                                                                    <React.Fragment>
                                                                        <Typography
                                                                            component="span"
                                                                            variant="body2"
                                                                            className={classes.inline}
                                                                            color="textPrimary"
                                                                        >
                                                                            {commentContent}
                                                                        </Typography>
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                    </div>
                                                )
                                            }))
                                        }
                                    </List>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
