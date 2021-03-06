import React, { useState } from "react";
import { connect } from "react-redux";

import API from "../../utils/API";
import Blerb from "./Blerb";
import {
  likeBlerb,
  likePost,
  addBlerb,
  preLikeBlerb,
} from "../../actions/feed";
import ErrorBoundary from "../Nav/ErrorBoundary";

function BlerbStream(props) {
  const [error, setError] = useState("");

  function reblerbHandler(e) {
    e.preventDefault();
    const postID = e.currentTarget.value;

    preLikeBlerb(postID);

    API.post("/feed/reblerb", {
      postID: postID,
    })
      .then((result) => {
        if (!result.data.error && result.data) {
          console.log("reblerb success: ", result.data);
          props.addBlerb(result.data);
        } else {
          console.log("result: ", result.data.error);
          setError(result.data.error);
          alert(error);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function likeBlerbHandler(e) {
    e.preventDefault();
    const postID = e.currentTarget.value;
    console.log("liked: ", postID);

    //preLikeBlerb: Activates the LIKE before the api call and then update the total number of likes and replace the blerb with the api call.
    //This should make the LIKE instantaneous and then by replacing the entire post with the
    //... updated post from the server to make sure it matches the backend.
    //... also while updating the likes on that post to include those of other simultaneous users.
    preLikeBlerb(postID);

    API.post("/feed/like", {
      postID: postID,
    })
      .then((result) => {
        if (result.data.likedSuccess === false) {
          setError(result.data.message);
        }

        if (result.data.likedBlerb) {
          props.likeBlerb(result.data.likedBlerb);
          if (props.user === result.data.likedBlerb.owner._id) {
            console.log("liking post result.");
            props.likePost(result.data.likedBlerb);
          }
        } else if (result.data.message) {
          setError(result.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <ErrorBoundary>
      <React.Fragment>
        {/* {error && <p>error</p>} */}
        {props.blerbs.length > 0 &&
          props.blerbs.map((item, i) => {
            return (
              <Blerb
                key={i}
                blerb={item}
                likeBlerbHandler={likeBlerbHandler}
                reblerbHandler={reblerbHandler}
              />
            );
          })}
      </React.Fragment>
    </ErrorBoundary>
  );
}

const mapStateToProps = (state) => {
  const user = state.loginReducer.userID;
  return {
    feed: state.feedReducer,
    user,
  };
};

const mapDispatchToProps = {
  likeBlerb,
  likePost,
  addBlerb,
  preLikeBlerb,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlerbStream);
