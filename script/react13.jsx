    ReactDOM.render( <div>
        <h1> 13 React </h1> <h3> 1.1 </h3> <h3> Klockan är {
            new Date().toLocaleTimeString()
        }. </h3> </div> , document.getElementById('root'));

    function add(a, b) {
        return a + b;
    }

    ReactDOM.render( <div>
        <h3> 1.2 add </h3> < p > Svaret är {
        add(333, 777)
    } </p>

    </div>, document.getElementById('add') );

    ReactDOM.render( <div>
            <h3> 1.3 fler HTML - element </h3> < p > En bild </p> <img src = "/kimsandin.github.io//content/yarn.jpg" />

            <p> En knapp </p> <button> Button </button>

            </div>, document.getElementById('element') );

            function Place(props) {
                return <p> Hej {props.name}, du är i {props.location}! </p>;
            }
            //Skapa element
            const element_with_prop = <Place name = "Kim"
            location = "Högsäter" /> ;
            //Visa på sidan
            let divPlace = document.getElementById('place'); ReactDOM.render(element_with_prop, divPlace);

            // Listor

            function MakeList() {
                //Skapa en lista
                let myList = ["Chanti", "Zutte", "Sobbe", "Avenir", "Bläzan"];
                //Räknare ger varje objekt i listen en unik nyckel
                let idCounter = 0;
                //Skapa en lista med nycklar
                let list = myList.map(x => <li key = {
                            idCounter++
                        }> {
                            x
                        } </li>);
                        //Returnera
                        return <ul> {
                            list
                        } </ul>;
                    }
                    //Visa på sidan
                ReactDOM.render(MakeList(), document.getElementById('lista'));
           


            class Book extends React.Component {
                //state
                constructor(props) {
                    super(props);
                    //för att kunna ändra properties
                    this.state = {status: props.status,
                                  className: props.className};
                    
                    this.changeStatus = this.changeStatus.bind(this);
                }

                changeStatus(e) {

                    if (this.state.status == "Ej läst") {
                        this.setState({
                            className: "Started"
                        });
                        this.setState({
                            status: "Läser "
                        });
                    } else if (this.state.status == "Läser ") {
                        this.setState({
                            className: "Done"
                        });
                        this.setState({
                            status: "Läst!"
                        });
                    } else {
                        this.setState({
                            className: "NotRead"
                        });
                        this.setState({
                            status: "Ej läst"
                        });
                    }
                }

                //som sedan returnerar
                render(){
                    return ( <h2 className = {
                            this.state.className
                        }
                        onClick = {
                            this.changeStatus
                        }>
                        Status: {
                            this.state.status
                        },
                        Titel: {
                            this.props.titel
                        },
                        Author {
                            this.props.author
                        } </h2>
                    );

                }
            }


            const bookElement = <Book className = "NotRead"
                                 status = "Ej läst"
                                 titel = "Roms Portar"
                                 author = "Conn Iggulden"/>;
            const bookElement2 = <Book className = "NotRead"
                                 status = "Ej läst"
                                 titel = "Kungars död"
                                 author = "Conn Iggulden"/>;

            ReactDOM.render(bookElement, document.getElementById('book1'));

            ReactDOM.render(bookElement, document.getElementById('book2'));