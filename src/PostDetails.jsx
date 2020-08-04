import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";
import {Link} from "react-router-dom";
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


const styles = () => ({
    root: {
        margin: 0,
        // padding: theme.spacing(2),
        height: '600px',
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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function PostDetails({ opened, onClose, post }) {
    const { image, content, userName, id, userImage, likes, comments } = post;
    const classes = styles();
    const [open, setOpen] = React.useState(opened);
    const [imgLoading, setImgLoading] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        onClose(false);
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth={true}
                maxWidth = {'md'}
            >
                <DialogContent dividers>
                    <div>
                        <Grid container  direction="row" >
                            <Grid item xs={7}>
                                {imgLoading ?  <Skeleton variant="rect" width={600} height={500} /> : null}
                                {    <img
                                    src={image}
                                    style={{ width: '100%', height: '600px' }}
                                    onLoad={() => {setImgLoading(false)}}
                                />
                                }
                            </Grid>
                            <Grid item xs={5} style={{ padding: '10px' }}>
                                <div style={{ float: 'right', marginBottom: '10px' }}>
                                    <CloseIcon onClick={() => {onClose(true)}} style={{ cursor: "pointer" }}/>
                                </div>
                                <CardHeader
                                    avatar={
                                        imgLoading ? (
                                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                        ) : (
                                            <Avatar aria-label="recipe" src={userImage}/>
                                        )
                                    }
                                    title={imgLoading ?
                                        (
                                            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                        ) :
                                        (<Link to={`profile/${id}`}>{userName} </Link>)
                                    }
                                    subheader={imgLoading ? <Skeleton animation="wave" height={10} width="40%" /> :  '5 hours ago'}
                                />
                               <div style={{ padding: '16px' }}>
                                   <div>
                                       <Typography variant="body2" color="textSecondary" component="p">
                                           {content}
                                       </Typography>
                                   </div>
                                   <Grid container direction="row" style={{ paddingTop: '10px' }}>
                                       <Grid item xs className="icon">
                                           <FavoriteIcon style={{ marginTop: '2px'}}/> <span>{likes}</span>
                                       </Grid>

                                       <Grid item xs className='icon'>
                                           <ChatBubbleIcon style={{ marginTop: '2px', marginLeft: '-110px' }}/> {comments}
                                       </Grid>
                                   </Grid>
                               </div>
                                <div style={{ height: '300px', overflow: 'scroll'}}>
                                    <List className={classes.root}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Brunch this weekend?"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Ali Connors
                                                        </Typography>
                                                        {" — I'll be in your neighborhood doing errands this…"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Summer BBQ"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            to Scott, Alex, Jennifer
                                                        </Typography>
                                                        {" — Wish I could come, but I'm out of town this…"}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Oui Oui"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Sandra Adams
                                                        </Typography>
                                                        {' — Do you have Paris recommendations? Have you ever…'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Oui Oui"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Sandra Adams
                                                        </Typography>
                                                        {' — Do you have Paris recommendations? Have you ever…'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Oui Oui"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Sandra Adams
                                                        </Typography>
                                                        {' — Do you have Paris recommendations? Have you ever…'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Oui Oui"
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            Sandra Adams
                                                        </Typography>
                                                        {' — Do you have Paris recommendations? Have you ever…'}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
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
