    ReactDOM.render(
    <div>
        <h1>13 React</h1>
        <h3>1.1</h3>
        <h3>Klockan är {new Date().toLocaleTimeString()}.</h3>
    </div>, document.getElementById('root') );

    function add(a, b){
        return a+b;
    }
    
    ReactDOM.render(
    <div>
        <h3>1.2 add</h3>
        <p>Svaret är { add(333, 777)}</p>
    
    </div>, document.getElementById('add') );
   
    ReactDOM.render(
    <div>
        <h3>1.3 fler HTML-element</h3>
        <p>En bild</p>
        <img src="/content/yarn.jpg" />
        
        <p>En knapp</p>
        <button>Button</button>
    
    </div>, document.getElementById('add') );
  

    