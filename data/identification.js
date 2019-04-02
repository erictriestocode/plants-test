
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var plantApiKey = "uE6x4WzpWVPnWwBZqpVSneRhhl9y7gwe3hRB8qfUt5wpVpbDzF"; //needs to be replaced by env variable

var requestTwo = new XMLHttpRequest();



module.exports = function (idNumber) {

    // request.abort(); No idea why thi s isnt working
    requestTwo.open('POST', 'https://api.plant.id/check_identifications');
    requestTwo.setRequestHeader('Content-Type', 'application/json');

    requestTwo.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(this);
            console.log('Status:', this.status);
            console.log('Headers:', this.getAllResponseHeaders());
            console.log('Body:', this.responseText);
        }
    };

    var bodyTwo = {
        'key': plantApiKey,
        'ids': [idNumber]
    };

    requestTwo.send(JSON.stringify(bodyTwo));
};

