var controller = {};

controller.ajouter_recherche = function() {
	if (model.recherches.indexOf(view.get_saisie()) == -1) {
		view.ajouter_recherche(view.get_saisie());
    	 model.ajouter_recherche(view.get_saisie());
	}
}

controller.supprimer_recherche = function(recherche) {
  model.supprimer_recherche(view.get_text_label(recherche));
  view.supprimer_recherche(recherche);
}

controller.selectionner_recherche = function(recherche) {
  view.selectionner_recherche($(recherche).html());
  model.selectionner_recherche($(recherche).html());
  view.afficher_nouvelles_sauvegardees();
}

controller.init = function() {
	model.init();
	view.init();
	controller.autocomplete();
	controller.accordeon();
}

controller.maj_resultats = function(res) {
	view.maj_resultats(res);
}

controller.rechercher_nouvelles = function() {
	view.rechercher_nouvelles();
	model.rechercher_nouvelles();
}

controller.supprimer_nouvelle = function(nouvelle) {
	view.supprimer_nouvelle(nouvelle);
	model.supprimer_nouvelle(nouvelle);
}

controller.sauver_nouvelle = function(e) {
	view.sauver_nouvelle(e);
	model.sauver_nouvelle(view.creerNouvelle(e));
}

controller.ecoute_clavier = function(event) {
	if (event.key == "Enter") {
		controller.rechercher_nouvelles();
	} else if (event.ctrlKey || event.metaKey) {
		if(String.fromCharCode(event.which).toLowerCase() == 's') {
			event.preventDefault();
			controller.ajouter_recherche();
		}
	}
}

controller.autocomplete = function() {
	view.autocomplete();
	//controller.rechercher_nouvelles();
}

controller.accordeon = function() {
	$("#accordeon").accordion({
        collapsible: true,
        action :false
    });
}
