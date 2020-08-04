import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, green, grey, yellow } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';
import {formatDate} from "./utils/date";
import Grid from "@material-ui/core/Grid";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 500,
        width: 750,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: green[500],
    },
}));

const skeletonStyle = { background: 'lightPink' };

export default function Post({ image, content, userName = '', id, userImage, createdAt, likes, comments }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [imgLoading, setImgLoading] = React.useState(true);
    const [openDetail, setOpenDetail]= React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
       <div>
           <Card className={classes.root} style={{ marginLeft: '30%', marginTop: '5%' }}>
               <CardHeader
                   avatar={
                       imgLoading ? (
                           <Skeleton style={skeletonStyle} animation="wave" variant="circle" width={40} height={40} />
                       ) : (
                           <Avatar aria-label="recipe" className={classes.avatar} src={userImage}/>
                       )
                   }
                   action={
                       <IconButton aria-label="settings">
                           <MoreVertIcon />
                       </IconButton>
                   }
                   title={imgLoading ?
                       (
                           <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                       ) :
                       (<Link to={`profile/${id}`}>{userName} </Link>)
                      }
                   subheader={imgLoading ? <Skeleton animation="wave" height={10} width="40%" /> :  (formatDate(createdAt))}
               />
               {imgLoading ?  <Skeleton style={skeletonStyle} variant="rect" width={600} height={500} /> : null}
               {    <img
                   width="600px"
                   height="500px"
                   src={image}
                   title="Paella dish"
                   onLoad={() => {setImgLoading(false)}}
               />
               }
               <CardContent>
                   <Typography variant="body2" color="textSecondary" component="p">
                       {content}
                   </Typography>
               </CardContent>
               <CardActions disableSpacing>
                   <Grid container direction="row">
                       <Grid item xs className="icon">
                           <FavoriteIcon/> <span>{likes}</span>
                       </Grid>
                       <Grid item xs className='icon'>
                           <ChatBubbleIcon style={{ marginLeft: '-230px' }}/> {comments}
                       </Grid>
                   </Grid>
               </CardActions>
           </Card>
       </div>
    );
}
