import React, { useLayoutEffect } from 'react'
import "../../assets/css/rank.css";
//引入接口
import { hotSong } from '../../util/axios'
class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            songList: [],
            time:0,
        }
    }
    componentDidMount() {
        hotSong()
            .then(res => {
                if (res.code === 200) {
                    console.log(res.playlist.tracks.slice(0, 20))
                    this.setState({
                        songList: res.playlist.tracks.slice(0, 20),
                        time:res.playlist.updateTime
                    })
                }
            })
    }
    toTime(){
        let date = new Date(this.state.time);
        let month=((date.getMonth()+1)+'').padStart(2,'0');
        let day =(date.getDate()+'').padStart(2+'0');
        return `${month}月${day}日`
    }
        //跳转播放方法
  toPlay(id){
    this.props.history.push(`/play?id=${id}`)
  }
    render() {
        const { songList } = this.state;
        return (
            <div className="rank">
                <div className="hotRank">
                    <div className="hotRankText"></div>
                    <div className="time">
                        更新日期：{this.toTime()}
                    </div>
                </div>
    <div className="songList">
        <ul>
        {songList.map((item, index) => {
                return (
            <li key={item.id} onClick={this.toPlay.bind(this,item.id)}>
            <span className="SN">{(index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</span>
            <div className="songInfo">
             <div className="songName">
                {item.name}
            </div>
            <div className="singer">
            <div className="SQ"></div>
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
                <div className="lookALL">
                    <span >查看完整榜单  &gt;</span>
                </div>
            </div>)
    }
}
export default Rank