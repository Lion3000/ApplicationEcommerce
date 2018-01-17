/*==============================================================
Author : Alex Zarzitski
Date : 17/01/2018
==============================================================*/
function loadProfilePic(e, id) {
	// on récupère le canvas où on affichera l'image
	console.log("preview"+id);
	var canvas = document.getElementById("preview"+id);
	var ctx = canvas.getContext("2d");
	// on réinitialise le canvas: on l'efface, et déclare sa largeur et hauteur à 0
	ctx.setFillColor = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	canvas.width=0;
	canvas.height=0;
	// on récupérer le fichier: le premier (et seul dans ce cas là) de la liste
	var file = document.getElementById("profilepicfile"+id).files[0];
	// l'élément img va servir à stocker l'image temporairement
	var img = document.createElement("img");
	// l'objet de type FileReader nous permet de lire les données du fichier.
	var reader = new FileReader();
	// on prépare la fonction callback qui sera appelée lorsque l'image sera chargée
	reader.onload = function(e) {
		//on vérifie qu'on a bien téléchargé une image, grâce au mime type
		if (!file.type.match(/image.*/)) {
			// le fichier choisi n'est pas une image: le champs profilepicfile est invalide, et on supprime sa valeur
			document.getElementById("profilepicfile"+id).setCustomValidity("Il faut télécharger une image.");
			document.getElementById("profilepicfile"+id).value = "";
		}
		else {
			// le callback sera appelé par la méthode getAsDataURL, donc le paramètre de callback e est une url qui contient
			// les données de l'image. On modifie donc la source de l'image pour qu'elle soit égale à cette url
			// on aurait fait différemment si on appelait une autre méthode que getAsDataURL.
			img.src = e.target.result;
			// le champs profilepicfile est valide
			document.getElementById("profilepicfile"+id).setCustomValidity("");
			var MAX_WIDTH = 96;
			var MAX_HEIGHT = 96;
			var width = img.width;
			var height = img.height;

			var width = MAX_WIDTH;
			var height = MAX_HEIGHT;

			canvas.width = width;
			canvas.height = height * (img.height / img.width);
			// on dessine l'image dans le canvas à la position 0,0 (en haut à gauche)
			// et avec une largeur de width et une hauteur de height
			ctx.drawImage(img, 0, 0, width, height * (img.height / img.width));
			// on exporte le contenu du canvas (l'image redimensionnée) sous la forme d'une data url
			var dataurl = canvas.toDataURL("image/png");
			// on donne finalement cette dataurl comme valeur au champs profilepic
			document.getElementById("profilepic"+id).value = dataurl;
		};
	}
	// on charge l'image pour de vrai, lorsque ce sera terminé le callback loadProfilePic sera appelé.
	reader.readAsDataURL(file);
}
