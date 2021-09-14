import { BrowserRouter } from "react-router-dom";
import { Redirect, Route } from "react-router";
import Auth from "./containers/Auth/Auth";
import routes from "./routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/ox-test">
      <Redirect to="/auth" />
      {routes.map((item, index) => (
        <Route
          key={index}
          exact={item.exact}
          path={item.path}
          component={item.component}
        />
      ))}
    </BrowserRouter>
  );
}

export default App;
