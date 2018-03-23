var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
	if(recherches.indexOf($("#zone_saisie").val()) == -1) {
		recherches.push($("#zone_saisie").val());
		$("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + $("#zone_saisie").val() + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
		$.cookie("recherches", JSON.stringify({recherches}), { expires: 1000 });
	}

}

function supprimer_recherche(e)
{
	var parent = e.parentNode;
	recherches.splice(recherches.indexOf(parent.firstChild.innerHTML));
	e.parentNode.remove();
	$.cookie("recherches", JSON.stringify(recherches), { expires: 1000 });
}


function selectionner_recherche(e)
{
	var text = e.parentNode.firstChild.innerHTML;
	$("#zone_saisie").val(text);
	recherche_courante = text;
}


function init()
{
	if (!!$.cookie('recherches')) {
			alert($.cookie('recherches'));
			recherches = JSON.parse($.cookie('recherches')).recherches;
			for (var i = 0, len = recherches.length; i < len; i++) {
  				$("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + recherches[i] + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
			}
	}
}


function rechercher_nouvelles()
{


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
