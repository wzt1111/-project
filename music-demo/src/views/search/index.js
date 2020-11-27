import React from 'react'
import "../../assets/css/search.css"
import { hotSearch,getSearch } from '../../util/axios'
class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            searchList: [],
            iptValue: '',
            songList:[],
        }
    }
    //挂载
    componentDidMount(){
        hotSearch()
        .then(res=>{
           if(res.code===200){
               this.setState({
                   searchList:res.data.filter((item, i) => i < 10),
               })
           }
        })
    }
    //封装一个搜索方法
    goSearch(keywords){
        getSearch({
            keywords
        })
        .then(res=>{
            if(res.code===200){
                this.setState({
                    songList:res.result.songs,
                    iptValue:keywords
                },()=>{
                    console.log(this.state.songList);
                }
                )
            }
         })
    }
    changeVal(e) {
        this.setState({
            iptValue: e.target.value,
        })
    }
    //清空
    deleteVal() {
        this.setState({
            iptValue: '',
        })
    //清空搜索列表
    this.setState({
        songList:[]
      })
    }
    //跳转播放方法
  toPlay(id){
    this.props.history.push(`/play?id=${id}`)
  }
  //封装一个enter事件
  enter(e){
      //当用户回车时搜索
      //保证用户输入的内容不为空
      if(e.keyCode===13 && e.target.value !==''){
       this.goSearch(e.target.value)   
      }
      
  }
    render() {
        const { searchList, iptValue,songList } = this.state;
        return (<div className="search">
            <div className="iptCon">
                <input className="ipt" placeholder="搜索歌曲、歌手、专辑" onChange={this.changeVal.bind(this)} onKeyUp={this.enter.bind(this)} value={iptValue}></input>
                <figure className={iptValue !== '' ? "delete" : ""} onClick={this.deleteVal.bind(this)}><i></i></figure>

            </div>
            <div className={iptValue === '' ? "hotSearch" : "hotSearchNone"}>
                <p>热门搜索</p>
                <ul>
                    {searchList.map((item,index) => {
                        return (
                            <li key={index} className="searchItem" onClick={this.goSearch.bind(this,item.searchWord)}>{item.searchWord}</li>
                        )
                    })}

                </ul>
            </div>
            <div className={iptValue === '' ? "hotSearchNone" : "nowSearch"}>
                <div className={songList.length>0 ?"hotSearchNone" : "searchInfo"}>
                搜索"{iptValue}"
                </div>
                <div className="songList">
        <ul>
        {songList.map(item => {
                return (
            <li key={item.id} onClick={this.toPlay.bind(this,item.id)}>
            <div className="songInfo">
             <div className="songName">
                {item.name}
            </div>
            <div className="singer">
            <div className="SQ"></div>
            {/* <div classNam></div> */}
            {item.artists.map((arItem,index)=>{
             if(index+1===item.artists.length){
            return <span key={arItem.id}>{arItem.name}-{item.album.name}</span>
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
            </div>
        </div>)
    }
}
export default Search