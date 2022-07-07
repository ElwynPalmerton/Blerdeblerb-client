//Todo: Some of the stuff in App should be refactored into separate files.
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { initializePosts } from "../../actions/feed";
import setHeaders from "../../utils/setHeaders";

//Components
import API from "../../utils/API";
import BlerbForm from "../Feed/BlerbForm";
import BlerbStream from "../Feed/BlerbStream";
import LayoutGrid from "../LayoutGrid";
import Navbar from "../Nav/Navbar";

//MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  centerColumn: {
    margin: "0 auto",
    width: theme.feedWidth,
  },
}));

function Profile(props) {
  const classes = useStyles();

  //-Fix error:

  // Line 53:6:  React Hook useEffect has a missing dependency: 'props'. Either include it or remove the dependency array. However, 'props' will change when *any* prop changes, so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside useEffect  react-hooks/exhaustive-deps.

  const location = useLocation();
  const userPosts = props.feed.posts;
  const [error, setError] = useState("");

  useEffect((initializedPosts) => {
    setHeaders();
    API.get("/feed/posts", {
      test: "test message",
    })
      .then((result) => {
        if (result.data) {
          props.initializePosts(result.data);
        } else {
          console.log("No data returned");
          setError("Unable to submit Blerb to the server");
        }
      })
      .catch((e) => {
        setError("Unable to submit Blerb to the server");
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar from={location} />

      <LayoutGrid
        center={
          <div>
            <BlerbForm />
            {error && <h3>{error}</h3>}
            {userPosts && (
              <BlerbStream
                className={classes.centerColumn}
                blerbs={userPosts}
              />
            )}
          </div>
        }
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { feed: state.feedReducer };
};

const mapDispatchToProps = { initializePosts };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
