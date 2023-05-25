$(document).ready(listarLivros);

function listarLivros() {

    $.ajax({
        url: 'http://localhost:8080/api/livro/list',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += `<tr><td>` + data.nome + `</td>`;
                html += `<td>` + data.autor + `</td>`;
                html += `<td>` + data.genero + `</td>`;
                html += `<td>` + data.editora + `</td>`;
                html += `<td>` + data.dataLancamento + `</td>`;
                html += `<td><a href="editar-livro.html?id=` + data.id + `"><i class="bi bi-pencil-fill"></i></a>`;
                html += ` <a href="visualizar-livro.html?id=` + data.id + `"><i class="bi bi-search"></i></a>`;
                html += ` <a href="#" onclick="removerLivro(` + data.id + `)"><i class="bi bi-archive-fill"></i></a></td></tr>`;

                $("#tbListarLivrosBody").html(html);
            });

            let table = new DataTable('#tbListarLivros');
        }
    })


}

function removerLivro(id) {

    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/livro/remove/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (result) {
                alert(result);
            }
        })

    }
}