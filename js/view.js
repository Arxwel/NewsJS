var view ={};

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

view.ajouter_recherche = function(saisie)
{
  $("#recherches-stockees").html($("#recherches-stockees").html() + '<p class=\"titre-recherche\"><label onclick=\"controller.selectionner_recherche(this)\">' + saisie + '</label><img src=\"images/croix30.jpg\" class=\"icone-croix\" onclick=\"controller.supprimer_recherche(this)\"/> </p>');
}

view.supprimer_nouvelle = function(element)
{
  $(element).find("img").attr("src","images/horloge15.jpg");
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
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.sauver_nouvelle(this)\"><img src=\"images/horloge15.jpg\"/></span></p>");
		} else {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + decodeEntities(tableau[index].url) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + format(decodeEntities(tableau[index].date)) + "</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"images/disk15.jpg\"/></span></p>");
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
      $('#resultats').html($('#resultats').html() + '<p class=\"titre_result\"><a class=\"titre_news\" href=\"' + decodeEntities(recherches_courantes[index].url) + '\" target=\"_blank\">' + decodeEntities(recherches_courantes[index].titre) +'</a><span class=\"date_news\">' + decodeEntities(recherches_courantes[index].date) + '</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"images/disk15.jpg\"/></span></p>');
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
    console.log(decodeEntities(tableau[index].date));
		if(indexOf(model.get_recherches_courantes_news(),{titre:decodeEntities(tableau[index].titre), date:format(decodeEntities(tableau[index].date))}) == -1) {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + format(decodeEntities(tableau[index].url)) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + decodeEntities(tableau[index].date) + "</span><span class=\"action_news\" onclick=\"controller.sauver_nouvelle(this)\"><img src=\"images/horloge15.jpg\"/></span></p>");
		} else {
			$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href=\"" + format(decodeEntities(tableau[index].url)) + "\" target=\"_blank\">" + decodeEntities(tableau[index].titre) +"</a><span class=\"date_news\">" + decodeEntities(tableau[index].date)  + "</span><span class=\"action_news\" onclick=\"controller.supprimer_nouvelle(this)\"><img src=\"images/disk15.jpg\"/></span></p>");
		}
	});
}

view.sauver_nouvelle = function(e) {
  var parent = $(e).parent();
	$(e).children(":first").attr("src", "images/disk15.jpg");
	$(e).attr("onclick", "controller.supprimer_nouvelle(this)");
}

view.creerNouvelle = function(e) {
  var url = $(e).parent().find("a");
	var date = $(e).parent().find(".date_news").html();
	return {titre : url.html(), url : url.attr("href"), date : date};
}

view.autocomplete = function() {
    $("#zone_saisie").autocomplete({
        source: model.get_cookie_recherche(),
        select: function(event,ui) {
            $("#zone_saisie").val($("#zone_saisie").val() + ui.item.value)
        },
        position: {my:"center bottom", at: "center top", within: $("#nouvelle-recherche"), collision:"flip flip"}
    });
}

/*
view.orderDate = function() {
	var res= [];
  $("#resultats p").each( function () {
    console.log($(this).find(".date_news").html());
		res.push({url : $(this).find(".titre_news").attr("href"),
						titre : $(this).find(".titre_news").html(),
						date : $(this).find(".date_news").html()
					});
	});
  console.log(res);
  res.sort(dynamicSort("date"));
	$("#resultats").empty();
	view.maj_resultats(JSON.stringify(res));
}
*/
