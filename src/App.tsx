import { FC, useReducer, useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import exportContext from "./exportContext"
import './App.css';
import HomePage from "./components/HomePage/index"
import ShoppingCartPage from "./components/ShoppingCartPage/index"
import LoginPage from "./components/LoginPage/index"
import SearchPage from "./components/SearchPage/index"
import ProductDetailsPage from "./components/ProductDetailsPage/index"
import ClassificationPage from "./components/ClassificationPage/index"
import TopNav from "./components/public/topNav/index"
import MySearch from "./components/public/mySearch/index"
import Rotation from "./components/public/rotation/index"
import MyPage from "./components/MyPage/index"
import TypePage from "./components/TypePage/index"



const App: FC = () => {
  const myLoginExit = LoginExit();
  return (
    <exportContext.Provider value={myLoginExit}>
      <Router>
        <div className="app-top" >
          <TopNav />
          <MySearch />
        </div>
        <div className="app-main" >
          <Switch>
            <Route exact path="/" component={HomePage}>
            </Route>
            <Route exact path="/shoppingCartPage" component={ShoppingCartPage}>
            </Route>
            <Route exact path="/loginPage" component={LoginPage}>
            </Route>
            <Route exact path="/searchPage" component={SearchPage}>
            </Route>
            <Route exact path="/productDetailsPage" component={ProductDetailsPage}>
            </Route>
            <Route exact path="/classificationPage" component={ClassificationPage}>
            </Route>
            <Route exact path="/myPage" component={MyPage}>
            </Route>
            <Route exact path="/typePage" component={TypePage}>
            </Route>
          </Switch>
        </div>
      </Router>
    </exportContext.Provider>
  )
}

const LoginExit = () => {
  const [user, setUser] = useState(null);
  const Login = (fn: Function, username: any) => {//fn<--->toHomePage函数 , 登录 路由跳转-->首页
    setUser(username);
    localStorage.setItem("user", username);
    fn();
  }
  const Exit = (fn: Function) => {//fn<--->toLogin函数 , 退出 路由跳转-->登录页
    setUser(null);
    localStorage.removeItem("user");
    fn();
  }
  return { user, Login, Exit }
}
export default App;