class App extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
         data: 'Initial data...'
      }

      this.updateState = this.updateState.bind(this);
   };

   updateState(e) {
      this.setState({data: e.target.value});
   }

   render() {
      return (
         <div><button onClick = {this.updateState}>CLICK</button>
            <h4>{this.state.data}</h4>
            <Content myDataProp = {this.state.data} 
               updateStateProp = {this.updateState}></Content>
         </div>
      );
   }
}

class Content extends React.Component {

   render() {
      return (
         <div>
            <input type = "text" value = {this.props.myDataProp} 
               onChange = {this.props.updateStateProp} />
            <h3>{this.props.myDataProp}</h3>
         </div>
      );
   }
}


class ListItems extends React.Component {
    render() {
        var listItem = ['skriv', 'något', 'här'];
        return (
            <ul>
                {listItem.map(function(listItem, index){
                    return <li key={ index }>{listItem}</li>;
                  })}
            </ul>
        );
    }
    ReactDOM.render(<ListItems />, document.getElementById('list'));
}



ReactDOM.render(<App/>, document.getElementById('app'));

    
