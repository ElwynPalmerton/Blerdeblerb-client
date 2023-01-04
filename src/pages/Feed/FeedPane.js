import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeName, logout } from "../../actions/user";
import { initializeBlerbs, addHistory, addBlerbs } from "../../actions/feed";
import BlerbForm from "./BlerbForm";
import BlerbStream from "./BlerbStream";
import API from "../../utils/API";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  more: {
    color: "#111111",
  },
}));

function FeedPane(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const blerbs = props.feed;

  useEffect(() => {
    getNewBlerbs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getNewBlerbs() {
    API({
      method: "get",
      url: `/feed/blerbstream`,
      params: {
        foo: "bar",
      },
    })
      .then((result) => {
        if (result.data) {
          if (result.data.length !== 0) {
            // console.log("initializing blerbs", result.data);
            props.initializeBlerbs(result.data);
          }
        } else {
          setError("Unable retrieve get blerbs.");
        }
      })
      .catch((e) => {
        setError("Unable retrieve get blerbs.");
      });
  }

  function getHistory(e) {
    let oldestBlerb = null; //= new Date();
    console.log(oldestBlerb);
    if (blerbs.length > 0) {
      //Don't do the API call if it is empty since initialization should handle that.
      const oldestBlerb = blerbs[blerbs.length - 1].createdAt;

      API({
        method: "get",
        url: `/feed/history`,
        params: {
          foo: "bar",
          oldestBlerb: oldestBlerb,
        },
      })
        .then((result) => {
          if (result.data) {
            if (result.data.length !== 0) {
              props.addHistory(result.data);
            }
          } else {
            setError("Unable retrieve get blerbs.");
          }
        })
        .catch((e) => {
          setError("Unable retrieve get blerbs.");
        });
    }
  }

  return (
    <div>
      <BlerbForm />
      {error && <h3>{error}</h3>}

      {blerbs && <BlerbStream blerbs={blerbs} />}
      <div style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.more}
          onClick={getHistory}
        >
          more
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const sortedFeed = state.feedReducer.blerbs.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return {
    feed: sortedFeed,
    initialized: state.feedReducer.initializedFeed,
  };
};

const mapDispatchToProps = {
  initializeBlerbs,
  addHistory,
  addBlerbs,
  changeName,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPane);
