var model = {};
model.recherche_courante=""; // chaine de caracteres correspondant a la recherche courante
model.recherches=[]; //tableau contenant des chaines de caracteres correspondant aux recherches stockees
model.recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

model.ajouter_recherche = function ajouter_recherche(recherche)
{
		model.recherches.push(recherche);
		$.cookie("recherches", JSON.stringify({model.recherches}), { expires: 1000 });
}

}

model.supprimer_recherche = function supprimer_recherche(recherche)
{
	model.recherches.splice(recherches.indexOf(recherche);
	$.cookie("recherches", JSON.stringify({model.recherches}), { expires: 1000 });
}

model.init = function init()
{
	if (!!$.cookie('recherches')) {
			model.recherches = JSON.parse($.cookie('recherches')).recherches;
	}
}

model.selectionner_recherche = function(recherche) {
    model.recherche_courante = recherche;
    if(!!$.cookie(model.recherche_courante)) {
  		model.recherche_courante_news = JSON.parse($.cookie(model.recherche_courante)).recherche_courante_news;
    }
}


model.sauver_nouvelle = function sauver_nouvelle(nouvelle)
{
	if(indexOf(model.recherche_courante_news, nouvelle) == -1) {
		model.recherche_courante_news.push(nouvelle);
		$.cookie(model.recherche_courante, JSON.stringify({model.recherche_courante_news}), { expires: 1000 });
	}
}

model.get_recherches_courantes_news = function() {
  return model.recherche_courante_news;
}

model.supprimer_nouvelle = function supprimer_nouvelle(nouvelle)
{
	if(indexOf(model.recherche_courante_news, nouvelle) != -1) {
		model.recherche_courante_news.splice(indexOf(model.recherche_courante_news, nouvelle));

		$.cookie(model.recherche_courante, JSON.stringify({model.recherche_courante_news}), { expires: 1000 });
	}
}
