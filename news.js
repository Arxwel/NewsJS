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
			console.log("init : " + $.cookie('recherches'));
			recherches = JSON.parse($.cookie('recherches')).recherches;
			$.each(recherches, function(index, value) {
				$("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + recherches[index] + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
			});
	}
}


function rechercher_nouvelles()
{
	if(!!recherche_courante) {
		recherche_courante = $("#zone_saisie").val();
	}
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
	var tableau = JSON.parse(res);
	$.each(tableau, function(index, value) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img onclick=\"sauver_nouvelle(this)\" src=\"horloge15.jpg\"/></span></p>")
	});

}


function sauver_nouvelle(e)
{
// 	Fonctionne mais à revoir je pense
	var parent = $(e).parents(".titre_result");
	$(e).attr('src', 'disk15.jpg');
	$(e).attr('onclick', 'supprimer_nouvelle(this)');
	$(e).parent().attr('onclick', 'supprimer_nouvelle(this)');
	var nouvelle = {titre: $(parent).children(".titre_news").html(),date: $(parent).children(".date_news").html(), url: $(parent).children(".titre_news").attr("href")};
	//console.log("Sauver nouvelle : " + nouvelle.titre + " " + nouvelle.date + " " + nouvelle.url);
	if(recherche_courante_news.indexOf(nouvelle) == -1) {
		recherche_courante_news.push(nouvelle);
		$.cookie(recherche_courante, JSON.stringify({recherche_courante_news}), { expires: 1000 });
	}
}


function supprimer_nouvelle(e)
{
	// Ne fonctionne pas
	alert(recherche_courante_news.indexOf(nouvelle));
	var parent = $(e).parents(".titre_result");
	$(e).attr('src', 'horloge15.jpg');
	$(e).parent().attr('onclick', 'sauver_nouvelle(this)');
	$(e).attr('onclick', 'sauver_nouvelle(this)');
	var nouvelle = {titre: $(parent).children(".titre_news").html(),date: $(parent).children(".date_news").html(), url: $(parent).children(".titre_news").attr("href")};
	if(recherche_courante_news.indexOf(nouvelle) != -1) {
		recherche_courante_news.splice(recherche_courante_news.indexOf(nouvelle));
		$.cookie(recherche_courante, JSON.stringify({recherche_courante_news}), { expires: 1000 });
	}
}
