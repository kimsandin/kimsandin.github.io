const lista = [
  {word: 'Häst', translation: 'Horse'},
  {word: 'Travsele', translation: 'Trotting Harness'},
  {word: 'Brösta', translation: 'Breast Collar'},
  {word: 'Huvudlag', translation: 'Bridle'},
  {word: 'Bett', translation: 'Bit'},
  {word: 'Uppkäk', translation: 'Overcheck'},
  {word: 'Tömmar', translation: 'Reins'},
  {word: 'Bukgjord', translation: 'Girth'}
];

class Ordlista extends React.Component {
  render() {
    let key = 0;
    const nyLista = this.props.lista.map(
      obj => (<li key={obj.word + obj.translation}>{obj.word} 
       = {obj.translation}</li>)
    );
    return (<ol>{nyLista}</ol>);
  }
}


ReactDOM.render(
  <Ordlista lista={lista} />,
  document.getElementById('react-app')
);