import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainComp from "./component/MainComp";
import LoginScreen from "./auth/LoginScreen";
import PrivateRoute from "./auth/signin/PrivateRoute";
import PrivateScreen from "./auth/signin/PrivateScreen";
import RegisterScreen from "./auth/RegisterScreen";
import ForgotPasswordScreen from "./auth/ForgotPasswordScreen";
import ResetPasswordScreen from "./auth/ResetPasswordScreen";
import Logout from "./auth/signin/Logout";
/* const App = () => {
  // return (
    <Router>
      <div className="app">
        <Switch>
          <Route
            exact
            path="/us/:type?"
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Aboutus {...e} />
              </Suspense>
            )}
          />
          <Route exact path="/welcome" component={WelcomeScreen} />
          <PrivateRoute
            exact
            path="/"
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <PrivateScreen {...e} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/logout"
            component={(e) => (
              <Suspense fallback={<div>Login you out. Just a second</div>}>
                {<Logout {...e}></Logout>}
              </Suspense>
            )}
          />
          <Route
            exact
            path="/login"
            component={(e) => {
              return (
                <Suspense fallback={<div>Loading...</div>}>
                  {<LoginScreen {...e}></LoginScreen>}
                </Suspense>
              );
            }}
          />

          <Route
            exact
            path="/register"
            // component={RegisterScreen}
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <ErrorScreen id="register" {...e} />
              </Suspense>
            )}
          />

          <Route
            exact
            path="/forgotpassword"
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <ForgotPasswordScreen {...e} />
              </Suspense>
            )}
          />
          <Route
            exact
            path="/newpassword/:resetToken"
            // component={ResetPasswordScreen}
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordScreen {...e} />
              </Suspense>
            )}
          />

          <Route
            path="/form/:agent"
            // component={Publicform}
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Publicform {...e} />
              </Suspense>
            )}
          />

          <Route
            path="/membership/:tiers?"
            // component={memberInfo}
            component={(e) => (
              <Suspense fallback={<div>Loading...</div>}>
                <MembershipInfo {...e} />
              </Suspense>
            )}
          />

          <Route
            path="/*"
            component={(e) => (
              <Suspense
                fallback={<div>An error happened. let me verfy your Link</div>}
              >
                <ErrorScreen {...e} />
              </Suspense>
            )}
          />
        </Switch>
      </div>
    </Router>
  // );
// };*/

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginScreen} />
          <PrivateRoute exact path="/welcome" component={PrivateScreen} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/" component={MainComp} />

          <Route exact path="/register" component={RegisterScreen} />

          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />

          <Route
            path="/newpassword/:resetToken"
            component={ResetPasswordScreen}
          />
          <Route path="*" component={() => <h1>404</h1>} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
