let helicopterVelocity=5;

function HelicopterEnemyMovement() {

	posX = parseInt($("#enemy1").css("left"));
	let helposY = parseInt($("#enemy1").css("top"));
	$("#enemy1").css("left",posX-helicopterVelocity);
	$("#enemy1").css("top",helposY);

    if (posX<=-10) {
        resetHelPosition(helposY)
        
    }
}

function resetHelPosition(pos) {
	pos = parseInt(Math.random() * gameCanvasHeight / 1.4);
	$("#enemy1").css("left",694);
	$("#enemy1").css("top",pos);
}

function TruckEnemyMovement() {
    posX = parseInt($("#enemy2").css("left"));
    $("#enemy2").css("left",posX-3);
            
    if (posX<=0) {        
        $("#enemy2").css("left",775);                
    }
}
