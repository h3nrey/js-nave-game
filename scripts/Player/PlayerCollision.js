function OnCollisionEnter2D() {
	var colisao1 = ($("#player").collision($("#enemy1")));
	var colisao2 = ($("#player").collision($("#enemy2")));
    var colisao3 = ($("#disparo").collision($("#enemy1")));
    var colisao4 = ($("#disparo").collision($("#enemy2")));
    var colisao5 = ($("#player").collision($("#player-friend")));
    var colisao6 = ($("#enemy2").collision($("#player-friend")));

	if (colisao1.length>0) {
        inimigo1X = parseInt($("#enemy1").css("left"));
        inimigo1Y = parseInt($("#enemy1").css("top"));
        explosion1(inimigo1X,inimigo1Y);
        energiaAtual--;
        posicaoY = parseInt(Math.random() * 334);
        $("#enemy1").css("left",694);
        $("#enemy1").css("top",posicaoY);
    }

    // jogador com o inimigo2 
    if (colisao2.length>0) {
	
        inimigo2X = parseInt($("#enemy2").css("left"));
        inimigo2Y = parseInt($("#enemy2").css("top"));
        explosion1(inimigo2X,inimigo2Y);
        energiaAtual--;       
        $("#enemy2").remove();
            
        reposicionaInimigo2();
            
    }	

    // Disparo com o inimigo1
    if (colisao3.length>0) {
		
		
        inimigo1X = parseInt($("#enemy1").css("left"));
        inimigo1Y = parseInt($("#enemy1").css("top"));
        pontos=pontos+100;
            
        explosion1(inimigo1X,inimigo1Y);
        $("#disparo").css("left",950);
    }

    // Disparo com o inimigo2
    if (colisao4.length>0) {
		
        inimigo2X = parseInt($("#enemy2").css("left"));
        inimigo2Y = parseInt($("#enemy2").css("top"));
        pontos=pontos+50;
        $("#enemy2").remove();
    
        explosion1(inimigo2X,inimigo2Y);
        $("#disparo").css("left",950);
        
        reposicionaInimigo2();
            
    }

    // jogador com o amigo
		
	if (colisao5.length>0) {		
        reposicionaAmigo();
        somResgate.play();
        salvos++;
        $("#player-friend").remove();
    }

    //Inimigo2 com o amigo
		
    if (colisao6.length>0) {
            
        amigoX = parseInt($("#player-friend").css("left"));
        amigoY = parseInt($("#player-friend").css("top"));
        explosao3(amigoX,amigoY);
        perdidos++;
        somPerdido.play();
        $("#player-friend").remove();
                
        reposicionaAmigo();
                
    }
}