$(document).ready(onInit);

function onInit() {
    $.ajax({
        url: "http://localhost:8080/api/livro/total",
        type: "get",
        dataType: "json",
        success: function(res) {
           $("#div-total-livros").html(res);
        }
    });
}
