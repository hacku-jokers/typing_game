$( function () {
    var request = new XMLHttpRequest();
    var url = 'http://api.paiza.io/runners/create'
    request.open('GET',url, true);
    request.responseType = 'json';
    var params = {
        source_code:"print('hello')",
        language:"python3",
        input:"",
        longpoll:"",
        longpoll_timeout:""};
    request.onload = function () {
      var data = this.response;
      console.log(data);
    };
    $.getJSON( url, params, function( result ) {
          showResult( result )
        })
      })
