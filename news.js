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
	recherches.splice(recherches.indexOf($(e).parent().first().text()));
	$(e).parent().remove();
	$.cookie("recherches", JSON.stringify({recherches}), { expires: 1000 });
}


function selectionner_recherche(e)
{
	var text = $(e).parent().first().text();
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
	$('#resultats').empty();
	$('#wait').css("display", "block");
	$.ajax({
		url : 'search.php',
		type : 'GET',
		data : {data: $("#zone_saisie").val()},
		async : 'false',
		success : maj_resultats
	});

}


function maj_resultats(res)
{
	$('#wait').css("display", "none");
	var t = JSON.parse(res);
	for (var i = 0, len = t.length; i < len; i++) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(t[i].url) + "\" target=\"_blank\">" + decodeEntities(t[i].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(t[i].date)) + "</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img onclick=\"sauver_nouvelle(this)\" src=\"horloge15.jpg\"/></span></p>")
	}

}


function sauver_nouvelle(e)
{
	alert(e);
	$(e).attr('src', 'disk15.jpg');
	$(e).parent().attr('onclick', 'supprimer_nouvelle(this)');
}


function supprimer_nouvelle(e)
{

}
