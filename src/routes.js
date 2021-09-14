import App from "./App";
import Products from "./containers/products/Products";
import Auth from "./containers/Auth/Auth";

const Routes = [
  { exact: true, path: "/", component: App },
  { exact: true, path: "/products", component: Products },
  { exact: true, path: "/auth", component: Auth },
];
export default Routes;
