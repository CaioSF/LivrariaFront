$('#form-inserir-livro').submit(function (event) {

    event.preventDefault();

    dataLancamento = new Date($('#input-dataLancamento').val());

    //Criar formData
    var formData = {
        'isbn': $('#input-isbn').val(),
        'autor': $('#input-autor').val(),
        'editora': $('#input-editora').val(),
        'genero': $('#input-genero').val(),
        'nome': $('#input-nome').val(),
        'numeroPaginas': $('#input-numeroPaginas').val(),
        'idioma': $('#input-idioma').val(),
        'fotoCapa': $('#picture__input').val(),
        'dataCadastro': new Date().toISOString(),
        'dataLancamento': dataLancamento.toISOString(),
        
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/livro/create',
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