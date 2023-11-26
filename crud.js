$(function() {
    loadRecipes();
    $("#recipes").on("click", ".btnDelete", handleDelete);
    $("#addBtn").click(addRecipe);
});

function addRecipe() {
    let title = $("#title").val();
    let body = $("#body").val();
    console.log(title + body);
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method: "POST",
        data: {title: title, body: body},
        success: function(response) {
            console.log(response);
            loadRecipes();
        }
    });
}

function handleDelete() {
    let btn = $(this);
    let parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes/"+id,
        method: "DELETE",
        success: function() {
            loadRecipes();
        }
    });
}

function loadRecipes() {
    $.ajax({
        url: "https://usman-fake-api.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response) {
            let recipes = $("#recipes");
            recipes.html("An error has occurred!");
        },
        success: function(response) {
            console.log(response);
            let recipes = $("#recipes");
            recipes.empty();
            for (let i = 0; i < response.length; i++) {
                let rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btnDelete float-right">Delete</button><button class="btn btnEdit float-right">Edit</button>${rec.body}</p></div>`);
            }
        }
    });
}