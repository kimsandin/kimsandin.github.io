class App extends React.Component {

   constructor(props) {
      super(props);
		
      this.state = {
          num1: 0,
          num2: 0,
          result: 0,
          operator: 'add',
          error: ''
      }

       this.updateState = this.updateState.bind(this);
       this.operatorSelection = this.operatorSelection.bind(this);
   }

   updateState(e) {
   let value1 = document.getElementById('num1').value;
   let value2 = document.getElementById('num2').value;
       
      this.setState({
          num1: value1,
          num2: value2
      }, () => this.getSum())
   }
    
    operatorSelection(e){
        
        let opSel = e.target.value;
        
        this.setState({
            operator: opSel
        }, () => this.getSum())
    }

    
getSum(){
    let num1 = parseFloat(this.state.num1);
    let num2 = parseFloat(this.state.num2);
    let sum = 0;

    
 if(Number.isNaN(num1) || Number.isNaN(num2) ){
  this.setState({error: 'Endast siffror tillåtna', result: NaN })
}

else if(this.state.operator === 'add'){
  sum = num1 + num2;
}
else if(this.state.operator === 'subtract'){
  sum = num1 + num2;
}
else if(this.state.operator === 'divide'){
  sum = num1 + num2;
}
else if(this.state.operator === 'multiply'){
  sum = num1 + num2;
}
  this.setState({result: sum, error: ''});
}   

   render() {
      return (
         <div id='react-app'>
            <Form>
                <input id='num1' type='text' value={this.state.num1} onChange={this.updateState}/> 

          <select value={this.state.operator} onChange={this.operatorSelection}>
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="divide">/</option>
            <option value="multiply">*</option>
          </select>

				  <input id='num2' type='text' value={this.state.num2} onChange={this.updateState} /> = 
          <Results result = {this.state.result} />          
		    </Form>
        <p>{this.state.error}</p>
         </div>
      );
   }
}

class Form extends React.Component {

   render() {
      return (
         <form>{this.props.children}</form>)
   };
}


class Results extends React.Component {
    render() {        
        return (
      <input type='text' readOnly value={this.props.result}/>  
        )}
}

    

ReactDOM.render(<App/>, document.getElementById('react-app'));

    
