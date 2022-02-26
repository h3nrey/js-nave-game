function placar() {
	
	$("#scoreboard").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
	
}

function moveBackground() {
	
	left = parseInt($("#game-background").css("background-position"));
	$("#game-background").css("background-position",left-1);
	
}