import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeName, logout } from "../actions/user";
import { initializeBlerbs, addHistory, addBlerbs } from "../actions/feed";
import BlerbForm from "./BlerbForm";
import BlerbStream from "./BlerbStream";
import API from "../utils/API";
import setHeaders from "../utils/setHeaders";
import { DateTime } from "luxon";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  more: {
    color: "#111111",
  },
}));

function FeedPane(props) {
  console.log(props);

  const classes = useStyles();
  const [error, setError] = useState("");
  const blerbs = props.feed;

  const [lastUpdated, setLastUpdated] = useState(null);

  // console.log("blerbs at top: ", blerbs);

  const [isTop, setTop] = useState(true);

  // useEffect(
  //   (blerbs) => {
  //     let flag = true;

  //     const updateOnScrollUp = () => {
  //       if (window.scrollY === 0) {
  //         if (flag === true) {
  //           console.log("API call", Math.random());

  //           getNewBlerbs(props.feed.blerbs);

  //           window.scrollTo(0, 10);

  //           flag = false;

  //           setTimeout(() => {
  //             flag = true;
  //           }, 5000);
  //         }
  //       }
  //     };

  //     document.removeEventListener("scroll", updateOnScrollUp);
  //     // }

  //     document.addEventListener("scroll", updateOnScrollUp);

  //     if (!props.feed.initialized) {
  //       //Initializing the page with the first batch of blerbs.

  //       setHeaders();

  //       //Date needs to be older by an arbitrary amount.
  //       // let lastUpdated = null; //= new Date();
  //       if (!props.initialized) {
  //         API({
  //           method: "get",
  //           url: "/feed/blerbstream",
  //           params: {
  //             foo: "bar",
  //             lastUpdated: lastUpdated,
  //           },
  //         })
  //           .then((result) => {
  //             if (result.data) {
  //               if (result.data.length !== 0) {
  //                 console.log("initializing blergs: ", result.data);
  //                 props.initializeBlerbs(result.data);
  //               }
  //             } else {
  //               console.log("No data returned");
  //               setError("Unable retrieve get blerbs.");
  //             }
  //           })
  //           .catch((e) => {
  //             setError("Unable to retrieve blerbs.");
  //           });
  //       }
  //     }
  //   },
  //   [isTop, blerbs]
  // );

  useEffect(() => {
    API({
      method: "get",
      url: `/feed/blerbstream`,
      params: {
        foo: "bar",
        // lastUpdated: props.feed.lastUpdated,
      },
    })
      .then((result) => {
        if (result.data) {
          if (result.data.length !== 0) {
            console.log("initializing blerbs", result.data);
            props.initializeBlerbs(result.data);
          }
        } else {
          setError("Unable retrieve get blerbs.");
        }
      })
      .catch((e) => {
        setError("Unable retrieve get blerbs.");
      });
    // getNewBlerbs();
  }, []);

  function getNewBlerbs() {
    // if (props.feed.length > 0) {
    //   let lastUpdated = props.feed[0].createdAt;
    //   const formattedDate = DateTime.fromISO(lastUpdated).toLocaleString(
    //     DateTime.DATETIME_SHORT
    //   );
    //   console.log(formattedDate);

    //   const formattedPropDate = DateTime.fromISO(
    //     props.feed.lastUpdated
    //   ).toLocaleString(DateTime.DATETIME_SHORT);
    //   console.log("props.feed.lastUpdated: ", formattedPropDate);

    if (!props.initialized) {
      API({
        method: "get",
        url: `/feed/blerbstream`,
        params: {
          foo: "bar",
          // lastUpdated: props.feed.lastUpdated,
        },
      })
        .then((result) => {
          if (result.data) {
            if (result.data.length !== 0) {
              console.log("initializing blerbs", result.data);
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
    // }
  }

  function getHistory(e) {
    let oldestBlerb = null; //= new Date();
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
      {/* <button
        onClick={getNewBlerbs}
      >get more blerbs</button> */}
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

  console.log("sorted Feed:", sortedFeed);

  return {
    feed: sortedFeed,
    // feed: state.feedReducer,
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
