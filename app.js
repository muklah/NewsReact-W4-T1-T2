import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

let SearchBox = styled.input `
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  font-size: 1.2rem;
  border: 0px;
  height: 40px;
  outline: none;
  padding: 0 10px;
`
let Navigation = styled.header `
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`

let NewsContainer = styled.main`
background-color: rgba(245, 246, 250, 0.8);
  padding: 20px 10%;
`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
  font-family: 'Playfair Display', serif;
  text-transform: capitalize;
`

let DateTime = styled.time`
color: #399DF2;
font-weight: bold;
position: absolute;
bottom: 14px;
`

let Voter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

class News extends Component {

    constructor(){
        super()
    
        this.state = {
          news: [],
          searchValue: '',
          vote: 0
        }

        this.getNews()

    }
  
    getNews(searchTerm = 'Iraq') {
      fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=6abfc2fbdbaf41f4bca92b5c025b68e8`)
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        this.setState({
          news: data.articles
        })
      })
    }
  
    onInputChange(event){
      this.setState({
        searchValue: event.target.value
      })
    } 
  
    onKeyUp(event){
      if(event.key == 'Enter'){
        history.pushState({
            searchterm: this.state.searchValue
          }, "", this.state.searchValue)
        this.getNews(this.state.searchValue)
        this.setState({
          searchValue: ''
        })
      }
    }
  
    render() {
      return (
        <React.Fragment>
          <Navigation>
            <img width="150px;" src={require('./assets/logo.svg')}/>
            <SearchBox
            onChange={this.onInputChange.bind(this)} 
            onKeyUp={this.onKeyUp.bind(this)}
            value={this.state.searchValue} placeholder="search term"/>
          </Navigation>
          <NewsContainer>
          <Dropdown />
            {
              this.state.news.map((item, i)=>{
                return <ChildNews key={i}
                           urlToImage={ item.urlToImage }
                           title={ item.title }
                           description={ item.description }
                           publishedAt={ item.publishedAt }
                       />
              })
            }
          </NewsContainer>
        </React.Fragment>
      )
    }
  }


  class ChildNews extends Component {
    constructor(){
        super()
    
        this.state = {
          vote: 0
        }
    }   

    onVote(type){
        this.setState(prevState => {
            if(prevState.vote === 0){
            return {vote: type == 'add' ? prevState.vote + 1: prevState.vote - 0}
        }
            else{
           return {vote: type == 'add' ? prevState.vote + 1: prevState.vote - 1}
        }
        localStorage.setItem("db", JSON.stringify(prevState.vote));
        });
    }
    
    render(){
        const {urlToImage, title, description, publishedAt} = this.props;
        const { vote } = this.state;

        return (
            <NewsItem>
                <img width="124px;" height="124px" src={urlToImage} />
              <NewsText>
              <h1>{title}</h1>
              <p>{description}</p>
              <DateTime>{publishedAt}</DateTime>
              </NewsText>
              <Voter>
                <img height="13px" src={require('./assets/upvote.svg')} alt=""
                 onClick={ this.onVote.bind(this, 'add') } />
                <div value={ vote }>{ vote }</div>
                <img height="13px" src={require('./assets/downvote.svg')} alt=""
                 onClick={ this.onVote.bind(this, 'min') } />
             </Voter>
            </NewsItem>
        )
    }
  }


  class Dropdown extends React.Component {
    constructor(){
     super();
    
     this.state = {
           news: [],
           displayMenu: false,
         }
    
      this.showDropdownMenu = this.showDropdownMenu.bind(this);
      this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

      this.getSortNews()
    
    }

    getSortNews(sortTerm = 'cat') {
        fetch(`https://newsapi.org/v2/everything?q=${sortTerm}&apiKey=6abfc2fbdbaf41f4bca92b5c025b68e8`)
        .then((response)=>{
          return response.json()
        })
        .then((data)=>{
          this.setState({
            news: data.articles
          })
        })
      }

      onSort(t){
          this.getSortNews(this.state.searchValue)
      }
    
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
      }
    
      hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
          document.removeEventListener('click', this.hideDropdownMenu);
        });
    
      }
    
      render() {
        return (
            <div  className="dropdown" style = {{background:"red",width:"200px"}} >
             <div className="button" onClick={this.showDropdownMenu}> My Setting </div>
    
              { this.state.displayMenu ? (
              <ul>
             <li><a className="active" onClick={this.getSortNews.bind} href="cat">Default Search</a></li>
             <li><a className="active" onClick={this.getSortNews.bind} href="cat">Default Search</a></li>
              </ul>
            ):
            (
              null
            )
            }
    
           </div>
    
        );
      }
    }


function App() {
    return (
      <div><News/></div>
    )
  }

  ReactDOM.render(<App/>, document.getElementById('root'))
