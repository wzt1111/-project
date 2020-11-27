import axios from 'axios';
import { recMusic, newSong,banner } from '../../util/axios'
import React from "react";
//引入样式
import "../../assets/css/home.css";
import "swiper/css/swiper.css"
//引入swiper
import Swiper from 'swiper';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      newList: [],
      bannerList:[],
    };
  }
  //挂载
  componentDidMount() {
    axios.all([recMusic({ limit: 6 }), newSong(),banner()]).then(
      axios.spread((songList, singList,bannerList) => {
        if (songList.code === 200) {
          this.setState({
            songList: songList.result
          })
        };
        if (singList.code === 200) {
          this.setState({
            newList: singList.result
          })
        };
        if(bannerList.code===200){
          this.setState({
            bannerList:bannerList.banners
          },()=>{
            new Swiper('.swiper-container',{
              loop:true,
              autoplay:{
                delay:2000
              },
              pagination:{
                el:'.swiper-pagination',
              },
            });
          }
        )};

      }))
  }
  //封装一个跳转函数
  goList(id) {
    this.props.history.push(`/list?id=${id}`);
  }
     //跳转播放方法
     toPlay(id){
      this.props.history.push(`/play?id=${id}`)
    }
  render() {
    const { songList, newList,bannerList } = this.state;
    return (
      <div className="home">
        <div className="swiper-container">
          <div className="swiper-wrapper" >
            {bannerList.map(item => {
              return (
                <div className="swiper-slide" key={item.imageUrl}>
                  <img src={item.imageUrl} alt="" />
                </ div>
              )
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <div className="sTitle">推荐歌单</div>
        <div className="remd_songs">
          <ul>
            {songList.map((item) => {
              return (
                <li key={item.id} onClick={this.goList.bind(this, item.id)}>
                  {/* 动态跳转之传递query */}
                  <div className="remd_img"><img src={item.picUrl} alt="" />
                    <span className="remd_lnum">{(item.playCount / 10000).toFixed(1)}万</span></div>
                  <p>{item.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sTitle">最新音乐</div>
        <div className="remd_sglst" >
          {newList.map((item) => {
            return (
              <div key={item.id} className="song" onClick={this.toPlay.bind(this,item.id)}>
                <div className="songName">{item.name}</div>
                <div className="singer">
                  <div className="SQ"></div>
                  {item.song.artists.map((song,index) => {
                   if(index+1===item.song.artists.length){
                   return <span key={song.id}>{song.name}-{item.name}</span>
                   }else{
                    return <span key={song.id}>{song.name}/</span>
                   }
                   
                    })}
                </div>
              </div>
            )
          })

          }
        </div>
        <div className='footer'>
          <div className="logo2"></div>
        </div>
      </div>
    );
  }
}
export default Home;
