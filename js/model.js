var model = {};
model.recherche_courante=""; // chaine de caracteres correspondant a la recherche courante
model.recherches=[]; //tableau contenant des chaines de caracteres correspondant aux recherches stockees
model.recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

model.ajouter_recherche = function (recherche)
{
		model.recherches.push(recherche);
		//$.cookie("recherches", JSON.stringify(model.recherches), { expires: 1000 });
		localStorage.recherches = JSON.stringify(model.recherches);
}

model.supprimer_recherche = function (recherche)
{
	model.recherches.splice(model.recherches.indexOf(recherche));
	//$.cookie("recherches", JSON.stringify(model.recherches), { expires: 1000 });
	localStorage.recherches = JSON.stringify(model.recherches);
}

model.init = function ()
{
	/*
	if ($.cookie('recherches') !== undefined) {
			//console.log($.cookie('recherches'));
			model.recherches = JSON.parse($.cookie('recherches'));
	}
	*/
	if(localStorage.recherches !== undefined) {
		model.recherches = JSON.parse(localStorage.recherches);
	}
}

model.selectionner_recherche = function(recherche) {
    model.recherche_courante = recherche;
		/*
    if($.cookie(model.recherche_courante) !== undefined) {
  		model.recherche_courante_news = JSON.parse($.cookie(model.recherche_courante));
    }
		*/

		if(localStorage.getItem(model.recherche_courante) != null) {
			model.recherche_courante_news = JSON.parse(localStorage.getItem(model.recherche_courante));
		}
}


model.sauver_nouvelle = function (nouvelle)
{
	if(indexOf(model.recherche_courante_news, nouvelle) == -1) {
		model.recherche_courante_news.push(nouvelle);
		//$.cookie(model.recherche_courante, JSON.stringify(model.recherche_courante_news), { expires: 1000 });
		localStorage.setItem(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
	}
}

model.get_recherches_courantes_news = function() {
  return model.recherche_courante_news;
}

model.get_recherche_courante = function() {
  return model.recherche_courante;
}

model.supprimer_nouvelle = function (nouvelle)
{
		model.recherche_courante_news.splice(indexOf(model.recherche_courante_news, nouvelle));
		//$.cookie(model.recherche_courante, JSON.stringify(model.recherche_courante_news), { expires: 1000 });
		localStorage.setItem(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
}

model.get_cookie_recherche = function() {
	/*
	if($.cookie('recherches') !== undefined) {
		model.recherches = JSON.parse($.cookie('recherches'));
	}
	*/
	if(localStorage.recherches !== undefined) {
		model.recherches = JSON.parse(localStorage.recherches);
	}
		return model.recherches;
}

model.rechercher_nouvelles = function() {
	if(model.recherche_courante == "") {
		model.recherche_courante = $("#zone_saisie").val();
	}
	/*
	if(!$.isEmptyObject($.cookie(model.recherche_courante))) {
		model.recherche_courante_news = JSON.parse($.cookie(model.recherche_courante));
	}
	*/
	if(localStorage.getItem(model.recherches_courantes) != null) {
		model.recherche_courante_news = JSON.parse(localStorage.getItem(model.recherches_courantes));
	}
	$.get("search.php", { data : model.recherche_courante}, function (res) {
	controller.maj_resultats(res);
});
}
