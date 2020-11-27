import React from "react";
//querystring 模块提供用于解析和格式化 URL 查询字符串的实用工具
import "../assets/css/list.css";
import qsString from 'querystring'
import { playDetail } from "../util/axios";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      playList:{},
      songList:[],
      bcImg:""
    };
  }
//挂载
componentDidMount(){
  let query =this.props.location.search.slice(1);
  playDetail({
    id:qsString.parse(query).id,
  }).then((res)=>{
    console.log(res.playlist.tracks);
    if(res.code===200){
      this.setState({
        playList:res.playlist,
        bcImg:res.playlist.coverImgUrl,
        songList: res.playlist.tracks,
      })
    }
  })
}
//跳转播放方法
toPlay(id){
  this.props.history.push(`/play?id=${id}`)
}
render() {
  const { playList, songList,bcImg } = this.state;
    return (
      <div className="list">
        <div className='header'> 
        <div className="bcImg"  style={{backgroundImage: "url("+bcImg+")"}}></div>
        <div className="black"></div>
          <div className="pImg">
          <img src={playList.coverImgUrl}></img>
            <span className="remd_lnum">{(playList.playCount / 10000).toFixed(1)}万</span>
            <span className="lsthd_icon">歌单</span>
          </div>
          <div className="headInfo">
            <div className="headInfo_title">{playList.name}</div>
            <div className="headUser">
              <img src={playList.creator?playList.creator.avatarUrl:''}/>
              {playList.creator?playList.creator.nickname:'' }
            </div>
          </div>
        </div>
        <div className="songTitle">歌曲列表</div>
        <div className="songList">
        <ul>
        {songList.map((item,index)=>{
          return(
                 <li key={item.id} onClick={this.toPlay.bind(this,item.id)}>
                 <span className="SN">{(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</span>
                 <div className="songInfo">
                  <div className="songName">{item.name}
                 </div>
                 <div className="singer">
                 {item.ar.map((arItem,index)=>{
                  if(index+1===item.ar.length){
                 return <span key={arItem.id}>{arItem.name}-{item.al.name}</span>
                 }else{
                  return <span key={arItem.id}>{arItem.name}/</span>
                     }
                 })}
                  </div>
                  </div>
                  </li>
                  )})}
              </ul>
            </div>
            <div className="store">
            <div>收藏歌单</div>
          </div>
    </div>
    );
  }
}
export default Home;
