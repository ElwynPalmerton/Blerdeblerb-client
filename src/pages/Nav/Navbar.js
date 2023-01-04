import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../actions/styles";

//Components
import LogoutButton from "../LoginRegister/LogoutButton";

//Material-UI
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Switch from "@material-ui/core/Switch";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuListComponent from "./MenuListComponent";
import Grid from "@material-ui/core/Grid";

//Switch for DarkMode

const CustomSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#8888ff", //thumb when on
    },
    $track: {
      backgroundColor: "#9782a8", //track when on lightmode.
    },
  },
  checked: {},
  track: {},
})(Switch);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    color: theme.palette.navText.main,
    background: "#444ff",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: theme.palette.navText.main,
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    textDecoration: "none",
    color: theme.palette.yellow.main,
  },
  button: {
    marginTop: "5px",
    color: "#111111",
    background: theme.palette.yellow.main,
    marginRight: "5px",
  },
  bar: {
    backgroundColor: theme.palette.navBackground.main,
  },
}));

function Navbar(props) {
  const classes = useStyles();

  useEffect(() => {
    const darkModeInLocalStorage = localStorage.getItem("darkMode") === "true";
    const darkModeInState = props.state.darkMode;

    if (darkModeInLocalStorage !== darkModeInState) {
      props.toggleDarkMode(darkModeInLocalStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.darkMode]);

  function changeDarkMode(e) {
    const newDarkModeSetting = !props.state.darkMode;
    props.toggleDarkMode(newDarkModeSetting);
    localStorage.setItem("darkMode", newDarkModeSetting);
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <Toolbar>
          {/* HAMBURGER - menu  */}
          <Grid container spacing={3} justify="space-between">
            <Grid item={true} xs={3}>
              <MenuListComponent
                {...props}
                classes={classes}
                className={classes.menuButton}
              />
            </Grid>

            {/* BLERDEBLERB - HOMEPAGE - MAIN FEED */}
            <Grid item={true} xs={6}>
              <div style={{ textAlign: "center" }}>
                <Link
                  to={{
                    pathname: "/",
                    state: { referer: props.from },
                  }}
                  className={classes.title}
                >
                  <div className="title">
                    blerdeblurb
                    <span style={{ fontSize: "1.5rem" }}>🗯</span>
                  </div>
                </Link>
              </div>
            </Grid>

            <Grid item={true} xs={2}>
              <div style={{ textAlign: "right" }}>
                {/* LOGIN, REGISTER, and LOGOUT */}
                {!props.loggedIn ? (
                  <div>
                    {/* login  */}
                    <Link
                      className={classes.link}
                      to={{
                        pathname: "/login",
                        state: { referer: props.from },
                      }}
                    >
                      <Button className={classes.button}>Login</Button>
                    </Link>
                    {/* Register  */}
                    <Link
                      className={classes.link}
                      to={{
                        pathname: "/signup",
                        state: { referer: props.from },
                      }}
                    >
                      <Button
                        // color="yellow"
                        variant="contained"
                        className={classes.button}
                      >
                        REGISTER
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <LogoutButton class={classes.button} />
                )}
              </div>
            </Grid>

            {/* DARKMODE SWITCH  */}
            <Grid item={true} xs={1}>
              <CustomSwitch
                className={classes.switch}
                onChange={changeDarkMode}
                checked={props.state.darkMode}
              ></CustomSwitch>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.stylesReducer,
    loggedIn: state.loginReducer.loggedIn,
  };
};

const mapDispatchToProps = { toggleDarkMode };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
