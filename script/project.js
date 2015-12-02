window.onload = function() {

  var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    W = 600;
    H = 700;

  canvas.width = W;
  canvas.height = H;

  var score = [0,0];
  //var 10 = 10;
  var winner = false;

  var startB;

  var keys = {
    p1: {
      up: false,
      down: false
    },
    p2: {
      up: false,
      down: false
    },
    restart: {
      spacebar: false
    }
  }
  var reset = function () {
    isGameStarted = false;

    ball.x = (canvas.width - ball.size) / 2;
    ball.y = (canvas.height - ball.size) / 2;

    ball.speedX = randomize(); // randomly start going left or right
    ball.speedY = 0;
}

  var players = [
    new Player("left"),
    new Player("right")
  ];
  var ball = new Ball();

  var keysDown = [];

  setInterval(draw, 33);

  function Ball()
  {
    this.x = W / 2;
    this.y = H / 2;
    this.style = "white";
    this.size = 10;
    this.velx = ranInt(0,1) == 0 ? -5 : 5;
    this.vely = ranInt(0,1) == 0 ? -5 : 5;

    this.draw = function()
    {
      ctx.beginPath();
      ctx.fillStyle = this.style;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    this.update = function()
    {
      if(this.x < 0)
      {
        //this.velx *= -1;
        if(score[1] == 6){
          winner = true;
          winner = 2
        };
        score[1]++;// =+ 1;
        reset();

      }
      else if(this.x > W - this.size)
      {
        //this.velx *= -1;
        if(score[0] == 6){
          console.log('hi')
          winner = true;
          winner = 1
        };
        score[0]++;// =+ 1;
        reset();
      }
      else
      {
        if(this.y < 0)
        {
          this.y = 0;
          this.vely *= -1;
        }
        if(this.y > H - this.size)
        {
          this.y = H - this.size;
          this.vely *= -1;
        }

        var p1 = players[0];
        var p2 = players[1];

        if(this.x > p1.x && this.x < p1.x + p1.sizeWidth)
          if(this.y > p1.y && this.y < p1.y + p1.sizeLength)
          {
            this.velx *= -1;
            //score[0] += 1;
          }
        if(this.x > p2.x && this.x < p2.x + p2.sizeWidth)
          if(this.y > p2.y && this.y < p2.y + p2.sizeLength)
          {
            this.velx *= -1;
            //score[1] += 1;
          }

        this.x += this.velx;
        this.y += this.vely;
      }
    }
  }
  function Player(side)
  {
    this.side = side;
    this.style = "white";
    this.sizeWidth = 20;
    this.sizeLength = 100;

    this.x = side == "left" ? 100 : W-100;
    this.y = (H / 2) - (this.sizeLength / 2);
    //this.y += y;
    this.speed = 10;

    this.draw = function()
    {
      ctx.fillStyle = this.style;
      ctx.fillRect(this.x, this.y, this.sizeWidth, this.sizeLength);
    }

    this.update = function()
    {
      if(this.side == "left")
      {
        if((keys.p1.down) && (this.y+this.sizeLength < H))
        {
          this.y += this.speed;
        }
        if((keys.p1.up) && (this.y > 0))
        {
          this.y -= this.speed;
        }
      }
      else
      {
        if((keys.p2.down) && (this.y+this.sizeLength < H))
        {
          this.y += this.speed;
        }
        if((keys.p2.up) && (this.y > 0))

        {
          this.y -= this.speed;
        }
        if(keys.restart.spacebar){

        }
      }
    }
    //this.y = Math.max(Math.min(H- this.sizeLength), 0);
  }
  function draw()
  {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,W,H);

    if(winner != false)
    {
      var text = winner == 1 ? "Player 1 Wins!" : "Player 2 Wins!";
      var color = winner == 1 ? "white" : "white";
      var score2 = winner == 1 ? score[0]: score[1];

      ctx.font = "40px Comic";
      ctx.fillStyle = color;
      ctx.fillText(text, 30, H / 2);
      ctx.font = "16px Comic";
      ctx.fillStyle = "white;"
      ctx.fillText("Scored "+score2, 30, 40 + H / 2) ;
    }
    else
    {
      for(var i = 0; i < players.length; i++)
      {
        players[i].draw();
        players[i].update();
      }

      ball.draw();
      ball.update();

      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Player 1: "+score[0], 15, 35);
      ctx.fillText("Player 2: "+score[1], 15, 55);
    }
    // Reset the game
  if (!isGameStarted) {
    //ctx.fillText("Press spacebar to start", 200, canvas.height / 2);
  }
  }

  function keyUp(event)
  {
    switch(event.which)
    {
      //player 1
      case 81:
        keys.p1.up = false;
      break;

      case 65:
        keys.p1.down = false;
      break;

      //player 2
      case 80:
        keys.p2.up = false;
      break;

      case 76:
        keys.p2.down = false;
      break;

      case 32:
        keys.restart.spacebar  = false;
      break;
    }
  }
  function keyDown(event)
  {
    console.log(event.which);

    switch(event.which)
    {
      //player1
      case 81:
        keys.p1.up = true;
      break;

      case 65:
        keys.p1.down = true;
      break;

      //player2
      case 80:
        keys.p2.up = true;
      break;

      case 76:
        keys.p2.down = true;
      break;

      case 32:
        keys.restart.spacebar = true;
      break;
    }

  }

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);
}

function ranInt(Min, Max)
{
  return Math.floor(Math.random() * (Max-Min+1) + Min);
}

Array.prototype.contains = function(item) {
  return (this.indexOf(item) != -1);
}
