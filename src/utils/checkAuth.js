import setHeaders from "./setHeaders";
import API from "./API";

export default function checkAuth(login, logout) {
  //This is called when the user tries to authorize a Private Route.

  let hasToken = setHeaders();
  if (!hasToken) {
    console.log("loggging out no token");
    logout();
  } else {
    API.get(`users/checkAuth`, {
      test: "test message",
    })
      .then((result) => {
        //Add more error checking:
        if (!result.data.error) {
          const user = {
            name: result.data.user.name,
            id: result.data.user._id,
            bio: result.data.user.bio,
            following: result.data.user.following,
          };

          login(user);
        } else {
          console.log("logging out not verified");
          //JWT not verified.
          logout();
        }
      })
      .catch((e) => {
        logout();
        //log the user out.
        console.log(e);
      });
  }
}
