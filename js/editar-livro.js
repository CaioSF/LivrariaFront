function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

var id_livro = GetURLParameter("id");

//Processar formulário
$('#form-editar-livro').submit(function (event) {

    event.preventDefault();

    dataLancamento = new Date($('#input-dataLancamento').val());

    //Criar formData
    var formData = {
        'id' :id_livro,
        'isbn': $('#input-isbn').val(),
        'autor': $('#input-autor').val(),
        'editora': $('#input-editora').val(),
        'genero': $('#input-genero').val(),
        'nome': $('#input-nome').val(),
        'numeroPaginas': $('#input-numeroPaginas').val(),
        'idioma': $('#input-idioma').val(),
        'dataCadastro': new Date().toISOString(),
        'dataLancamento': dataLancamento.toISOString(),
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/livro/edit',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-livro.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
 });

 function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/livro/getById/' + id_livro,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#input-isbn').val(data.isbn),
            $('#input-autor').val(data.autor),
            $('#input-editora').val(data.editora),
            $('#input-genero').val(data.genero),
            $('#input-nome').val(data.nome),
            $('#input-numeroPaginas').val(data.numeroPaginas),
            $('#input-idioma').val(data.idioma),
            $("#input-dataLancamento").val(formatDate(new Date(data.dataLancamento)));
        }
    })

});
