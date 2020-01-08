$(document).ready(function() {
    var total_letras = 50;
    $('#description').keyup(function() {
  var longitud = $(this).val().length;
  var resto = total_letras - longitud;
  $('#numero').html(resto);
  if(resto <= 0){
      $('#description').attr("maxlength", 50);
  }
    });
});
$(document).ready(function() {
  var total_letras = 15;
  $('#title').keyup(function() {
var longitud = $(this).val().length;
var resto = total_letras - longitud;
$('#title').html(resto);
if(resto <= 0){
    $('#title').attr("maxlength", 15);
}
  });
});
//// Search 
var i;
 const search = ()=>{
  const input = document.getElementById('search')
  const title = input.value.toUpperCase()
  const ul = document.getElementById('content')
  const li = ul.getElementsByTagName('li')
    for( i = 0; i < li.length; i++){
        const strong = document.getElementsByTagName('strong')[i]
        const text =  strong.textContent || strong.innerHTML
        console.log(strong)
        if(text.toUpperCase().indexOf(title) > -1){
            li[i].style.display = ''
        }else{
          li[i].style.display = 'none'
        }
    }
 }
addEventListener('keyup', search)
 