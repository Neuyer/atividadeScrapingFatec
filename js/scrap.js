$(main);
var  mes= 1;
var hj = new Date // limitar até o mês anterior ao mês atual para garantir a existência dos dados
function main(){
    $("#btnMostrar").click(function(){ //valida o mês de procura 
       if($("#mes").val().length > 1 && $("#mes").val().length < 3 ){ 
              if($("#mes").val() <= hj.getMonth() && $("#mes").val() > 0){ 
               mes = $("#mes").val();
               sendReq();
              }else{
                  alert("Digite um valor válido para o mês...")
              }
       }else{
           alert("Digite o mês de 1-12 usando 2 digitos...")
       }
    });
}
  
function tratar(documento){  
   var ministros = documento.querySelectorAll("#ministros_inativos td a");
    if(ministros == null){
                    alert("Mês não encontrado")
                }
    for (var i = 0; i < ministros.length; i++){
         if(ministros[i].innerHTML=="JOAQUIM BENEDITO BARBOSA GOMES"){
             var salarios = $(ministros[i]).parent().siblings(); // Pega o valor das tds irmãs...
             $(".mostra .dados").remove();
             $(".mostra").append("<div class= 'dados'><p> " + ministros[i].innerHTML+ "<br> Mês: <strong>"+mes + "</strong></p><br> <p><strong>Salários</stong><br> -> Bruto: " + salarios[0].innerHTML + "<br> -> Liquido: " + salarios[1].innerHTML + "</p></div>")
               
        }
    }
   
   
}

//vw_m202_image vw_js_responsive_image
//<a href="javascript:void(0);" id="45" class="exibirServidor">JOAQUIM BENEDITO BARBOSA GOMES</a>

function sendReq() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
     
      if (this.readyState == 4 && this.status == 200) {
                var parser = new DOMParser();
                var documento = parser.parseFromString(this.responseText, "text/html");
               tratar(documento);
               $(".lds-pacman").css("display","none");
            }else{
                $(".lds-pacman").css("display","block");
            }
         };
  
  xhttp.open("GET", 
  "https://cors-escape.herokuapp.com/http://www.stf.jus.br/portal/remuneracao/listarRemuneracao.asp?periodo="+mes+"2018&ano=2018&mes=06&folha=1", true);
        // O primeiro endereço burla o CORS
  xhttp.send();
    }

