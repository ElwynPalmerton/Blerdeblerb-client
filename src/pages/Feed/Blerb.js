import React, { useEffect, useState } from "react";

import { baseURL } from "../../utils/API";
import { connect } from "react-redux";
import { DateTime } from "luxon";

//MUI
import Box from "@material-ui/core/Box";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LoopIcon from "@material-ui/icons/Loop";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

//avatar
import defaultUserAvatar from "../Bio/assets/defaultUserAvatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(4),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  userName: {
    fontWeight: "bold",
  },
  lightStyle: {
    fontWeight: "500",
  },
  reblerb: {
    fontWeight: "300",
    marginLeft: theme.spacing(0),
    marginBottom: theme.spacing(4),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0),
  },
  text: {
    overflowWrap: "anywhere",
  },
  imgGrid: {
    textAlign: "center",
  },
  img: {
    borderRadius: "100px",
    height: "100px",
    width: "100px",
  },
  icon: {
    color: theme.palette.primary.main,
  },
}));

function Blerb({ blerb, dispatch, likeBlerbHandler, reblerbHandler, userID }) {
  const classes = useStyles();

  const date = blerb.createdAt;
  const formattedDate = DateTime.fromISO(date).toLocaleString(
    DateTime.DATETIME_SHORT
  );

  const [liked, setLiked] = useState(blerb.likes.includes(userID.toString()));

  useEffect(() => {
    setLiked(blerb.likes.includes(userID.toString()));
  }, [blerb, userID]);

  const avatarBaseUrl = baseURL + "/users/avatar/";
  const imgUrl = avatarBaseUrl + blerb.author._id;

  function onImageError(e) {
    e.target.onerror = null;
    e.target.src = defaultUserAvatar;
  }

  return (
    <Box my={4}>
      <Paper className={classes.root} variant="outlined">
        <Grid container justify="space-between" alignItems="center" spacing={3}>
          <Grid className={classes.imgGrid} item={true} xs={4}>
            <img
              className={classes.img}
              alt=""
              onError={onImageError}
              src={imgUrl}
            />
          </Grid>
          <Grid item={true} xs={8}>
            {/* Reblerbed by:  */}
            {blerb.isReblerb && (
              <p className={classes.reblerb}>
                Reblerbed by: {blerb.owner.name}
              </p>
            )}

            {/* Name and datetime blerbed  */}
            <span>
              <span className={classes.userName}>{blerb.author.name} </span>
              <span className={classes.lightStyle}> - {formattedDate}</span>
            </span>

            {/* The BLERB itself  */}
            <p className={classes.text}>{blerb.text}</p>
            <br />

            {/* Reblerb and like buttons */}
            <Grid
              container
              justify="flex-start"
              alignItems="center"
              spacing={3}
            >
              {/* REBLERB button  */}
              <Grid item={true} xs={2}>
                <IconButton
                  aria-label="reblerb"
                  size="small"
                  value={blerb._id}
                  onClick={reblerbHandler}
                >
                  <LoopIcon value={blerb._id} fontSize="inherit" />
                </IconButton>
              </Grid>

              {/* LIKE button */}
              <Grid item={true} xs={9}>
                <IconButton
                  className={classes.icon}
                  aria-label="reblerb"
                  size="small"
                  value={blerb._id}
                  onClick={likeBlerbHandler}
                >
                  {liked ? (
                    <FavoriteIcon value={blerb._id} fontSize="inherit" />
                  ) : (
                    <FavoriteBorderIcon value={blerb._id} fontSize="inherit" />
                  )}
                </IconButton>

                {/* Number of likes  */}
                <span className={classes.lightStyle}> {blerb.totalLikes}</span>
              </Grid>
            </Grid>
            {/* End of Grid for reblerb and like buttons  */}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return { userID: state.loginReducer.userID };
};

export default connect(mapStateToProps)(Blerb);
