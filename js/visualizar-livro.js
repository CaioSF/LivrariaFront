function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var id_livro = GetURLParameter("id");

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
            $('#input-isbn').val(),
            $('#input-nome').val(),
            $('input-idioma').val(),
            $('input-numeroPaginas').val(),
            $('input-genero').val(),
            $('input-autor').val(),
            $('input-editora').val(),
            $("#input-dataLancamento").val(formatDate(new Date(data.dataLancamento)));
        }
    });
});
