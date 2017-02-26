'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        ' 13 React '
    ),
    ' ',
    React.createElement(
        'h3',
        null,
        ' 1.1 '
    ),
    ' ',
    React.createElement(
        'h3',
        null,
        ' Klockan är ',
        new Date().toLocaleTimeString(),
        '. '
    ),
    ' '
), document.getElementById('root'));

function add(a, b) {
    return a + b;
}

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(
        'h3',
        null,
        ' 1.2 add '
    ),
    ' ',
    React.createElement(
        'p',
        null,
        ' Svaret är ',
        add(333, 777),
        ' '
    )
), document.getElementById('add'));

ReactDOM.render(React.createElement(
    'div',
    null,
    React.createElement(
        'h3',
        null,
        ' 1.3 fler HTML - element '
    ),
    ' ',
    React.createElement(
        'p',
        null,
        ' En bild '
    ),
    ' ',
    React.createElement('img', { src: '/kimsandin.github.io//content/yarn.jpg' }),
    React.createElement(
        'p',
        null,
        ' En knapp '
    ),
    ' ',
    React.createElement(
        'button',
        null,
        ' Button '
    )
), document.getElementById('element'));

function Place(props) {
    return React.createElement(
        'p',
        null,
        ' Hej, ',
        props.name,
        'du är i ',
        props.location,
        '! '
    );
}
//Skapa element
var element_with_prop = React.createElement(Place, { name: 'Kim',
    location: 'Högsäter' });
//Visa på sidan
var divPlace = document.getElementById('place');ReactDOM.render(element_with_prop, divPlace);

// Listor

function MakeList() {
    //Skapa en lista
    var myList = ["Chanti", "Zutte", "Sobbe", "Avenir", "Bläzan"];
    //Räknare ger varje objekt i listen en unik nyckel
    var idCounter = 0;
    //Skapa en lista med nycklar
    var list = myList.map(function (x) {
        return React.createElement(
            'li',
            { key: idCounter++ },
            ' ',
            x,
            ' '
        );
    });
    //Returnera
    return React.createElement(
        'ul',
        null,
        ' ',
        list,
        ' '
    );
}
//Visa på sidan
ReactDOM.render(MakeList(), document.getElementById('lista'));

var Book = (function (_React$Component) {
    _inherits(Book, _React$Component);

    //state

    function Book(props) {
        _classCallCheck(this, Book);

        _get(Object.getPrototypeOf(Book.prototype), 'constructor', this).call(this, props);
        //för att kunna ändra properties
        this.state = { status: props.status,
            className: props.className };

        this.changeStatus = this.changeStatus.bind(this);
    }

    _createClass(Book, [{
        key: 'changeStatus',
        value: function changeStatus(e) {

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
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'h2',
                { className: this.state.className,
                    onClick: this.changeStatus },
                'Status: ',
                this.state.status,
                ', Titel: ',
                this.props.titel,
                ', Author ',
                this.props.author,
                ' '
            );
        }
    }]);

    return Book;
})(React.Component);

var bookElement = React.createElement(Book, { className: 'NotRead',
    status: 'Ej läst',
    titel: 'Roms Portar',
    author: 'Conn Iggulden' });
var bookElement2 = React.createElement(Book, { className: 'NotRead',
    status: 'Ej läst',
    titel: 'Kungars död',
    author: 'Conn Iggulden' });

ReactDOM.render(bookElement, document.getElementById('books'));