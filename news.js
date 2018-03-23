var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	if(recherches.indexOf($("#zone_saisie").val()) == -1) {
		recherches.push($("#zone_saisie").val());
		$("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + $("#zone_saisie").val() + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
	}

}

function supprimer_recherche(e)
{
	var parent = e.parentNode;
	recherches.splice(recherches.indexOf(parent.firstChild.innerHTML));
	e.parentNode.remove();
}


function selectionner_recherche(e)
{
	var text = e.parentNode.firstChild.innerHTML;
	$("#zone_saisie").val(text);
	recherche_courante = text;
}


function init()
{

}


function rechercher_nouvelles()
{
	$('#resultats').empty();
	$('#wait').css("display", "block");
	$.ajax({
		url : ,
		type : 'GET',
		data :
	});

}


function maj_resultats(res)
{


}


function sauver_nouvelle(e)
{

}


function supprimer_nouvelle(e)
{

}
