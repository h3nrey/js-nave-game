var createFriend = () => {
	CreateElementInGame("<div id='player-friend' class='anima3'></div>");
	resetPosition();
}

$("#player-friend").css("left",parseInt( Math.random() * gameCanvasWidth - (gameCanvasWidth/10)))
friendSpeed = 2

//physics
gravityAceleration = 9.8;
mass = 10;
airDensity = 1.29;
projectedArea = 50; //m^2
dragCoefficient = 1.35;
friendSpeed = 2 * mass * gravityAceleration / ( airDensity * projectedArea * dragCoefficient )

function reposicionaAmigo() {
	
	var restartCooldown = window.setInterval(InstantiateFriend, 6000);
	
	function InstantiateFriend() {
		window.clearInterval(restartCooldown);
		restartCooldown=null;
		
		if (fimdejogo==false) {
			CreateElementInGame("<div id='player-friend' class='anima3'></div>");
		}		
	}	
}


function FriendMovement() {	
	let posY = parseInt($("#player-friend").css("top"));

	$("#player-friend").css("top",posY + friendSpeed);
	// $("#player-friend").css("left",posX+1);
	FriendposX = parseInt(Math.random() * 334);

	if (posY> (gameCanvasHeight / 1.3)) {			
		resetPosition();
	}
}

function resetPosition() {
	$("#player-friend").css("left",parseInt( Math.random() * gameCanvasWidth - (gameCanvasWidth/10)))		
	$("#player-friend").css("top",0);	
}