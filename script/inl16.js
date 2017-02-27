class CountryData extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
          countryList: props.countryList,
          numElements: props.numElements,
          continentList: props.continentList,
          chosenCPop: props.chosenCPop,
          json: props.json
      }

       this.selectedCountry = this.selectedCountry.bind(this);
       this.changeName = this.changeName.bind(this);
       this.countryData = this.countryData.bind(this);
       this.deleteSelected = this.deleteSelected.bind(this);
   }

   componentDidMount() {
       
    let jsonData;
       
    fetch('http://forverkliga.se/JavaScript/api/simple.php?world=whatever')
    .then(function(response) {
        return response.json();
    })
        
        .then(function(json) {
            jsonData = json;
        }).catch(function(error) {
            console.log('Fetch misslyckades: ' + error.message);
        });
       
        let timesToFetch = 5;
        this.timerID = setInterval(
          () => {
          if (jsonData != undefined)
          {              
              this.setState({json: jsonData});
              this.countryData();
              clearInterval(this.timerID);
          }
          else if(timesToFetch == 0)
          {
              this.setState({countryList: "Ingen kontakt."});
              clearInterval(this.timerID);
          }
          timesToFetch--;
        },100); 
    }
    
    
    changeName(event){
        let countryToChange = this.state.json.find(x => x.population == this.state.chosenCPop);
        
        countryToChange.name = event.target.value;
        this.countryData();
    }
    
    countryData(){
        
        let searchVal = this.refs.inputFilter.value;
        let counter = 0;
        
        let newList = this.state.json.filter(function(x){
            return (x.name.includes(searchVal));
        }).map(function(x){
            return (<li className={'back' + counter%2} key={counter}>
                      <button className="countryStyle" id={"countryNum" + counter++}>{x.name}</button>
                      <span> - Invånarantal: {x.population}</span>
                    </li>);
        });
        this.setState({countryList: newList});
        this.setState({numElements: counter});
    }
               
               
    selectedCountry(event){
        let clickedcountryId = event.target.id;
        let changeName = this.refs.inputField; 
        let btn_del = this.refs.btn_del;
            
        if(clickedcountryId.includes("countryNum"))
        {
           
            let marked = event.target;
            marked.blur();
            
            this.setState({chosenCPop: event.target.nextSibling.innerHTML.match(/(\d+)(?!.*\d)/)[0]});
            
            changeName.style.display = 'block';
            changeName.value = marked.innerHTML;
            changeName.style.left = marked.offsetLeft + 'px';
            changeName.style.top = marked.offsetTop + 'px';
            btn_del.style.visibility = 'visible';
        }
            
        else if(clickedcountryId != "inputField")
        {            
            changeName.style.display = 'none';
            btn_del.style.visibility = 'hidden';
        }
    }
        
    deleteSelected(){
        let valuePop = this.state.deleteSelected;
        
        let updJson = this.state.json.filter(function(x){
            return (x.population != valuePop);
        }).map(function(x){
            return (x);
        });
        
        this.setState({json: updJson});
        
        this.timer = setInterval(
          () => {
          if (updJson.length == this.state.json.length)
          {
              this.countryData();
              clearInterval(this.timer);
          }
        },100);
    }
        
        
    render(){
        return(<div id="container" onClick={this.selectedCountry}>
                 <h2>{this.props.title}</h2>
                 Filtrera: <input onChange={this.countryData} type="text" id="inputFilter" ref="inputFilter"/>
                 <input onChange={this.changeName} type="text" id="inputField" hidden ref="inputField"/>
                 <ol>{this.state.countryList}</ol>
                 <span>Antal element: {this.state.numElements}</span><br/>
                 <button className="countryStyle" id="btn_del" onClick={this.deleteSelected} ref="btn_del">Radera landet</button>
               </div>
       );
    }
       

ReactDOM.render(<CountryData/>, document.getElementById('reactAPI-app'));
