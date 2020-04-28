$(document).ready(function() {
    
    $('.dropdown-menu a').click(function(){
        //Show table
        var name = this;
        console.log("select = "+name);
    });
    $("input:file").change(function(){
        readURL(this);
    });

    
}); 

function catSelected(cat) {
    $("#btnCat").html(cat);
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#selectFoodImg').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
