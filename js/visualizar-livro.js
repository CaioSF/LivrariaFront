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

var id_aluno = GetURLParameter("id");

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
        url: 'http://localhost:8080/api/livro/getById/' + id_aluno,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-nome").val(data.nome);
            $("#input-autor").val(data.autor);
            $("#input-genero").val(data.genero);
            $("#input-editora").val(data.editora);
            $("#input-numeroPaginas").val(data.numeroPaginas);
            $("#picture__input").val(data.picture__input);
            $("#input-dataLancamento").val(formatDate(new Date(data.dataLancamento)));
            

        }

        
    })

});