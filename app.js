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
            value: 'coconut',
            size: '5'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.onVote  = this.onVote.bind(this);

    }
    componentDidMount(){
        const data = JSON.parse(localStorage.getItem('votes'));

       this.getNews();
       
    }
    onVote (type, title) {
        switch(type){
            case "add":
            const news = [...this.state.news];
            const indexx = this.state.news.findIndex(item => item.title === title);
            news[indexx].like = this.state.news[indexx].like + 1;
            localStorage.setItem('votes', JSON.stringify(news[indexx].like));
            console.log(news[indexx].like)
            this.setState({news});
            
            break;
            case "min":
            const newss = [...this.state.news];
            const indexxx = this.state.news.findIndex(item => item.title === title);
            newss[indexxx].like = this.state.news[indexxx].like + 1;
            this.setState({news})
        }
        
    }

    getNews(searchTerm = 'Iraq', dateTerm = '', sizeTerm = '') {
        fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=${dateTerm}&apiKey=6abfc2fbdbaf41f4bca92b5c025b68e8`)
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                const news=[];
                data.articles.map((item,index) => {
                    item.like = 0;
                    item.id = index;
                    news.push(item);
                });
                if(sizeTerm === '5'){
                var slice = news.slice(0, 5)
                this.setState({news: slice});
                console.log(slice);
                
                }
                if(sizeTerm === '10'){
                    var slice = news.slice(0, 10)
                    this.setState({news: slice});
                    console.log(slice);
                    }
                if(sizeTerm === '15'){
                        var slice = news.slice(0, 15)
                        this.setState({news: slice});
                        console.log(slice);
                        }
                if(sizeTerm === ''){
                this.setState({news: news});
                }
            })
    }

    getNewsByTitle() {
        const news = [...this.state.news];
        const sorted = news.sort(function(a,b){
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        });
        console.log(sorted);
        this.setState({
            news: sorted
        })
    }

    onInputChange(event){
        this.setState({
            searchValue: event.target.value
        });
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

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log({value: event.target.value});
        if(event.target.value === 'default'){
            let searchValue = location.pathname.substr(1)
            if(searchValue){
                this.getNews(searchValue)
            }else{
                this.getNews()
            }
        }
        if(event.target.value === 'bydate'){
            let searchValue = location.pathname.substr(1)
            let dateValue = 'publishedAt'
            if(searchValue){
                this.getNews(searchValue, dateValue)
            }else{
                this.getNews('Iraq', dateValue)
            }
        }
        if(event.target.value === 'bytitle'){
            this.getNewsByTitle()
        }
      }

      handleSize(event) {
          
        this.setState({size: event.target.value});
        if(event.target.value === '5'){
            let searchValue = location.pathname.substr(1)            
            if(searchValue){
                this.getNews(searchValue, '', '5')
            }else{
                this.getNews('Iraq', '', '5')
            }
        }

        if(event.target.value === '10'){
            let searchValue = location.pathname.substr(1)            
            if(searchValue){
                this.getNews(searchValue, '', '10')
            }else{
                this.getNews('Iraq', '', '10')
            }
           }

        if(event.target.value === '15'){
            let searchValue = location.pathname.substr(1)            
            if(searchValue){
                this.getNews(searchValue, '', '15')
            }else{
                this.getNews('Iraq', '', '15')
            }
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
                    
            <select name="sort" value={this.state.value} onChange={this.handleChange}>
            <option value="default">Default News</option>
            <option value="bydate">News By Date</option>
            <option value="bytitle">News By Title</option>
          </select>

          <select name="page" value={this.state.size} onChange={this.handleSize}>
            <option value="1" >Number of Articles</option>
            <option value="5">5 Articles</option>
            <option value="10">10 Articles</option>
            <option value="15">15 Articles</option>
          </select>
                    {
                        this.state.news.map((item, i)=>{
                            return <ChildNews key={i}
                                              urlToImage={ item.urlToImage }
                                              title={ item.title }
                                              description={ item.description }
                                              publishedAt={ item.publishedAt }
                                              like={item.like}
                                              id={item.id}
                                              onVote={this.onVote}

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


    render(){
        const {urlToImage, title, description, publishedAt,id,onVote,like} = this.props;
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
                         onClick={ () =>onVote('add',title) } />
                    <div value={ vote }>{ like }</div>
                    <img height="13px" src={require('./assets/downvote.svg')} alt=""
                         onClick={() => onVote('min',title) } />
                </Voter>
            </NewsItem>
        )
    }
}


function App() {
    return (
        <div><News/></div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))