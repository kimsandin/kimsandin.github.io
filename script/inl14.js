function MakeList() {
    //Skapa en lista
    const myList = [{"Chanti", "Zutte", "Sobbe", "Avenir", "Bläzan"}];
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