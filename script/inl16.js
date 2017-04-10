class CountryData extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
          countryDataList: [],
          numElements: 0
      }   
   }
    
   componentDidMount() {
       
    let _this = this;
    fetch('http://forverkliga.se/JavaScript/api/simple.php?world=whatever')
    .then(function(response) {
        return response.json();
    })
        
        .then(function(json) {
            let count = json.length;
            _this.setState({countryDataList: json, numElements: count})
        
        }).catch(function(error) {
            console.log('Fetch misslyckades: ' + error.message);
        });
       
        let timesToFetch = 5;
        _this.timerID = setInterval(
          () => {
          if (json != undefined)
          {              
              _this.setState({countryDataList: json, numElements: count})
              
              clearInterval(this.timerID);
          }
          else if(timesToFetch == 0)
          {
              _this.setState({countryDataList: "Ingen kontakt."});
              clearInterval(this.timerID);
          }
          timesToFetch--;
        },100); 
    }
    
    
   
    deleteCountry(countryId) {

     let newList = this.state.countryDataList;
     newList.splice(countryId, 1);
     let count = newList.length;

     this.setState({ list: newList, numElements: count })  
    }  

		render(){
			return(
			<div>
				<h3>Lista över länder</h3>
				<ListOfCountries countryDataList={this.state.countryDataList} onDelete={this.deleteCountry.bind(this)}/>
				<h4>Det finns {this.state.numElements} länder i listan</h4>
			</div>
			)
		}
}

 
class ListOfCountries extends React.Component{
		constructor(props){
		super(props);
            this.state = {
                    selectedCountryId: null, 
            } 
		}

		clickFunction(countryId, event) {
		event.stopPropagation();
        if (event.target.id === 'btnDelete') {
            this.props.onDelete(countryId);
            this.setState({
                selectedCountryId: null
            });
        } 
		
		else {	
			if(this.state.selectedCountryId !== countryId){
				this.setState({
                selectedCountryId:  countryId
            });
			}
			else{
				this.setState({			
                selectedCountryId: null
                });
                }	
            }
        }

		render(){
			const ListOfCountries = this.props.countryDataList.map((country, countryId) =>
            <li
                onClick={this.clickFunction.bind(this, countryId)}
                key={countryId}
                className='list-group'>
							
                Land:  {country.name}, Kontinent: {country.continent} 
                <span> - Invånarantal: {country.population}</span>

				{this.state.selectedCountryId === countryId &&
                    <button
                        id="btnDelete"
                        onClick={this.clickFunction.bind(this, countryId)}
                        className={'btn trash-btn'}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                }
            </li>);

        return (
            <div>
                <ul className='list-group'>
                    {list}
                </ul>
            </div>
        );
	
}
}
ReactDOM.render(<CountryData/>, document.getElementById('reactAPI-app'))
