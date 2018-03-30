var view ={};

view.ajouter_recherche = function(saisie)
{
  $("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + $("#zone_saisie").val() + "</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"controller.supprimer_recherche(this)\"/> </p>");
}

view.supprimer_element = function(element)
{
  $(e).parent().remove();
}

view.selectionner_recherche = function selectionner_recherche(recherche)
{
  $("#zone_saisie").val(recherche);
  $("#resultats").empty();
}

view.rechercher_nouvelles = function() {
	$("#resultats").empty();
	$("#wait").css("display", "block");
}

view.maj_resultats = function(res) {
  $('#wait').css("display", "none");
	var tableau = JSON.parse(res);

	$.each(tableau, function(index, value) {
		if(indexOf(model.get_recherches_courantes_news,{titre:decodeEntities(tableau[index].titre), date:format(decodeEntities(tableau[index].date))}) == -1) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
		} else {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
		}
	});
}
