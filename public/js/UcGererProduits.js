/*==============================================================
Author : Alex Zarzitski
Date : 17/01/2018
==============================================================*/
function loadProfilePic(img, id) {
	var canvas  = document.getElementById("preview"+id);
	var context = canvas.getContext("2d");
	var MAX_WIDTH = 96;
	var MAX_HEIGHT = 96;

	if (img.files && img.files[0]) {
		var width = img.width;
		var height = img.width;

		var fr= new FileReader();
		fr.onload = (e) => {
			var img = new Image();
			img.addEventListener("load", () => {

				var h = 0;
				var w = 0;

				if(img.width>img.height){
					w = MAX_WIDTH;
					h = MAX_HEIGHT / img.width * img.height;
				} else {
					w = MAX_WIDTH / img.height * img.width;
					h = MAX_HEIGHT;
				}
				canvas.width = w;
				canvas.height = h;
				context.drawImage(img, 0, 0, w, h);

				// on exporte le contenu du canvas (l'image redimensionnée) sous la forme d'une data url
				var dataurl = canvas.toDataURL("image/png");
				// on donne finalement cette dataurl comme valeur au champs profilepic
				document.getElementById("profilepic"+id).value = dataurl;
			});
			img.src = e.target.result;
		};
		fr.readAsDataURL(img.files[0]);
	}
}
