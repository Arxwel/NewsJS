var view ={};

view.ajouter_recherche = function(saisie)
{
  $("#recherches-stockees").html($("#recherches-stockees").html() + '<p class=\"titre-recherche\"><label onclick=\"controller.selectionner_recherche(this)\">' + saisie + '</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"controller.supprimer_recherche(this)\"/> </p>');
}

view.supprimer_nouvelle = function(element)
{
  $(element).find("img").attr("src","horloge15.jpg");
  $(element).attr("onclick", "controller.sauver_nouvelle(this)");
}

view.supprimer_recherche = function(element)
{
  $(element).parent().remove();
}

view.selectionner_recherche = function (recherche)
{
  $("#zone_saisie").val(recherche);
  $("#resultats").empty();
}

view.get_text_label = function(e) {
    return $(e).siblings("label").html();
}

view.rechercher_nouvelles = function() {
	$("#resultats").empty();
	$("#wait").css("display", "block");
}

view.maj_resultats = function(res) {
  $('#wait').css("display", "none");
	var tableau = JSON.parse(res);

	$.each(tableau, function(index, value) {
		if(indexOf(model.get_recherches_courantes_news(),{titre:decodeEntities(tableau[index].titre), date:format(decodeEntities(tableau[index].date))}) == -1) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
		} else {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
		}
	});
}

view.get_saisie = function() {
  return $("#zone_saisie").val();
}

view.afficher_nouvelles_sauvegardees = function() {
  var recherches_courantes = model.get_recherches_courantes_news();

  for (var index in recherches_courantes) {
      //console.log(recherches_courantes[index]);
      $('#resultats').html($('#resultats').html() + '<p class=\"titre_result\"><a class=\"titre_news\" href=\"' + decodeEntities(recherches_courantes[index].url) + '\" target=\"_blank\">' + decodeEntities(recherches_courantes[index].titre) +'</a><span class=\"date_news\">' + decodeEntities(recherches_courantes[index].date) + '</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>');
  }

}

view.init = function() {
  var recherches = model.get_cookie_recherche();
  //console.log(recherches);
  for (var index in recherches) {
    view.ajouter_recherche(recherches[index]);
  }
}

view.rechercher_nouvelles = function() {
  $('#resultats').empty();
	$('#wait').css("display", "block");
}

view.maj_resultats = function(res) {
  $('#wait').css("display", "none");
	var tableau = JSON.parse(res);
	$.each(tableau, function(index, value) {
		if(indexOf(model.get_recherches_courantes_news(),{titre:decodeEntities(tableau[index].titre), date:format(decodeEntities(tableau[index].date))}) == -1) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.sauver_nouvelle(this)\"><img src=\"horloge15.jpg\"/></span></p>");
		} else {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"disk15.jpg\"/></span></p>");
		}
	});
}

view.sauver_nouvelle = function(e) {
  var parent = $(e).parent();
	$(e).children(":first").attr("src", "disk15.jpg");
	$(e).attr("onclick", "controller.supprimer_nouvelle(this)");
}

view.creerNouvelle = function(e) {
  var url = $(e).parent().find("a");
	var date = $(e).parent().find(".date_news").html();
	return {titre : url.html(), url : url.attr("href"), date : date};
}
