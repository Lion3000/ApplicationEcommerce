/*==============================================================
Author : Alex Zarzitski
Date : 13/01/2018
==============================================================*/
function validateMdp2() {  
	var mdp1 = document.getElementById('mdp1');  
	var mdp2 = document.getElementById('mdp2');  
	var validityState = mdp1.validity;
	if (validityState.valid && mdp1.value == mdp2.value) { 
		console.log("OK");  
		// ici on supprime le message d'erreur personnalisé, et du coup mdp2 devient valide.  
		document.getElementById('mdp2').setCustomValidity('');  
	} else {  
		console.log("NOT OK");
		// ici on ajoute un message d'erreur personnalisé, et du coup mdp2 devient invalide.  
		document.getElementById('mdp2').setCustomValidity('Les mots de passes doivent être égaux.');  
	}  
}  