class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: ['Logan', 'Charles', 'Mystique', 'Cyclops'],
      filterText: ''
    }
    this.filterTextChange = this.filterTextChange.bind(this);
  }
  filterTextChange(event) {
    //console.log('filterTextChange');
    this.setState({
      filterText: event.target.value
    });
  }
  render() {
    return (
      <div>
      <FilterBox changeEvent={this.filterTextChange} />
      <FilterList data={this.state.lista}
        filter={this.state.filterText} />
      react
      </div>
    );
  }
}
class FilterBox extends React.Component {
  render() {
    return <input onChange={this.props.changeEvent} />;
  }
}
class FilterList extends React.Component {
  render() {
    const filterLC = this.props.filter.toLowerCase();
    const filterUC = this.props.filter.toUpperCase();
    const newList = this.props.data.filter(
      x => x.includes(filterLC) || x.includes(filterUC)
    ).map(
      x => <li key={x}>{x}</li>
    );
    return (
      <ul>
      {newList}
      </ul>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);