import React from "react";
//引入样式
import "../assets/css/index.css";
// 引入二级路由
import Recommend from "../views/home";
import Rank from "../views/rank";
import Search from "../views/search";
//引入路由相关属性
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
class Home extends React.Component {
  render() {
    return (
      <div className="index">
        {/* 顶部导航 */}
        <div className="navTitle">
          优音乐<button>下载APP</button>
          </div>
        {/* 导航链接 */}
        <div className='navBar'>
          <NavLink activeClassName='active' to="/index/recommend">
            推荐音乐
            </NavLink>
          <NavLink activeClassName='active' to="/index/rank">排行榜</NavLink>
          <NavLink activeClassName='active' to="/index/search">搜索</NavLink>
        </div>

        {/* 二级路由出口 */}
        <Switch>
          <Route path="/index/recommend" component={Recommend}></Route>
          <Route path="/index/rank" component={Rank}></Route>
          <Route path="/index/search" component={Search}></Route>
          <Redirect to="/index/recommend"></Redirect>
        </Switch>
      </div>
    );
  }
}
export default Home;
