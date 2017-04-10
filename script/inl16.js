class FilterInput extends React.Component{

  constructor(props){
   super(props);
	}
	 
     handleChange = (e) => {
    this.props.filterList(e.target.value);
  }
   
  render(){
	
  	return(
    	<div>
    		Search:  <input placeholder="Filtrera länder" onChange={this.handleChange} 
		className="searchInput"></input>
        <hr/>
      </div>
    )
    }
}

class Countries extends React.Component{

  constructor(props){
      super(props);
      this.state = {
          inputEditor: null,
          editorText: null,
      }
  }
  editName = (countryName) => {
  this.setState({ inputEditor: 'name', editorText: countryName});
  }  
  editContinent = (continentName) => {
  	this.setState({ inputEditor: 'continent', editorText: continentName});
  }  
  handleChange = (e) => {
    this.setState({ editorText: e.target.value });
  }  
  endEditName = () => {
    this.setState({ inputEditor: null});
    this.props.updateCountryName(this.props.name, this.state.editorText);
  }  
  endEditContinent = () =>{
  	this.setState({ inputEditor: null});
    this.props.updateContinent(this.props.name, this.state.editorText);
  }  
  render() {
  	 return (
    <div onClick={() => this.props.selectCountry(this.props.name)}>
      	<div>
                {this.props.name === this.props.selectedCountry ?
          <button className="btnDelete btn" onClick={() => this.props.deleteCountry(this.props.name)}>
		 Ta bort <span className="glyphicon glyphicon-trash"></span></button> : ''
        }
        	{this.state.inputEditor !== 'name' ?
          <span onClick={() => this.editName(this.props.name)} className="countryName" >{this.props.name}</span> :
          <input onChange={this.handleChange}  autoFocus onBlur={() => this.endEditName()} value={this.state.editorText} /> }
        </div>
        <div>
        {this.state.inputEditor !== 'continent' ?
                  <span onClick={() => this.editContinent(this.props.continent)}>{this.props.continent}</span> :
          <input onChange={this.handleChange}  autoFocus onBlur={() => this.endEditContinent()} value={this.state.editorText} /> 
        }       
       </div>
      
    </div>
  );
  }

 
};

const CountryList = (props) => {
	return (
  	<div>
        {props.countries.length === 0 ?        
        	<h3>Laddar länder...</h3> : '' }
        
        	{props.countries.map(country => <Country deleteCountry={props.deleteCountry} 
		selectedCountry={props.selectedCountry} updateCountryName={props.updateCountryName} 
		updateContinent={props.updateContinent} selectCountry={props.selectCountry} 
		key={country.name} {...country} />)}
        <div>Antal länder: {props.countries.length}</div>  
   	</div>
    
  )
}

class CountryData extends React.Component {
 
    
   componentDidMount() {
       
    let _this = this;
    fetch('https://forverkliga.se/JavaScript/api/simple.php?world=whatever')
    .then(function(response) {
        return response.json();
    })
        
        .then(function(json) {
            _this.setState({countries: json})
		_this.filterList('');
        
        }).catch(function(error) {
            console.log('Fetch misslyckades: ' + error.message);
        });
       
        let timesToFetch = 5;
        _this.timerID = setInterval(
          () => {
          if (json != undefined)
          {              
              _this.setState({countries: json})
		_this.filterList('');
              
              clearInterval(this.timerID);
          }
          else if(timesToFetch == 0)
          {
              _this.setState({countries: "Ingen kontakt."});
              clearInterval(this.timerID);
          }
          timesToFetch--;
        },100); 
    }  
   
    deleteCountry = (country) => {
		  	this.setState(prevState => ({
    		filteredCountries: prevState.filteredCountries.filter(c => c.name != country)
    }));
}
    state = {
  	countries: [],
    filteredCountries: [],
    selectedCountry: null,
  };
  
  selectCountry = (country) => {
  	this.setState({ selectedCountry: country});
  }
  
  updateCountryName = (countryName, newName) => {
  	
    if (newName.length === 0){
    	alert('Land kan inte vara utan namn.');
    	return;
    }
    
    let countryExists = false;
  
  	this.state.countries.forEach(function(country) {
      if (country.name === newName && newName !== countryName) {
          alert('Landet finns redan!');
      		countryExists = true;
      }
    });
    
    if(!countryExists)
    {
      this.state.countries.forEach(function(country) {
        if (country.name === countryName) {
            country.name = newName;
        }
      });
    }
  
  }
  
  updateContinent = (countryName, newContinent) => {
  	this.state.countries.forEach(function(country){
    if(country.name === countryName){
    	country.continent = newContinent;
    }
    })
  }
  
  filterList = (filterText) => {
  	console.log(filterText);
    if(filterText.length === 0){
    	this.setState({filteredCountries: this.state.countries})
    }
    else{
    	let re = new RegExp(filterText, 'gi');
    	this.setState({filteredCountries: this.state.countries.filter(c => c.name.match(re) || c.continent.match(re))})
    }
  } 
  
	render () {  
  	return (
    	<div>
      <FilterInput filterList={this.filterList} />
      	<CountryList deleteCountry={this.deleteCountry} selectedCountry={this.state.selectedCountry} 
		selectCountry={this.selectCountry} countries={this.state.filteredCountries} 
		updateCountryName={this.updateCountryName} updateContinent={this.updateContinent} />
      </div>
    )
  }
}

ReactDOM.render(<CountryData/>, document.getElementById('reactAPI-app'))
