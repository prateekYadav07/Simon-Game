var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$(".btn").on('click', function (e) {
    userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.indexOf(userChosenColor));
})

function checkAnswer(currentLvl){
    if(gamePattern[currentLvl] == userClickedPattern[currentLvl]){
        if(gamePattern.toString() == userClickedPattern.toString()){
            console.log('inside if block- success');
            setTimeout(function(){
                nextSequence();
                userClickedPattern = [];
            },1000)
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },100);
        $('h1').text('Game Over, Press Any Key to Restart');
        $('.yourScore').text('Your Score: '+level);
        $('.highScore').text('High Score: '+highScore);
        startOver();
        setTimeout(function(){
            $('.yourScore').text('Your Score: '+level);
        },3000);
    }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function nextSequence() {
    level++;
    if(highScore < level){
        highScore += 1;
    }
    $('h1').text('Level '+level);

    var randomChosenColor;
    var randomNum = Math.floor(Math.random() * 4);

    randomChosenColor = buttonColours[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    var myAudio = new Audio('sounds/' + name + '.mp3');
    myAudio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    var delayInMilliSec = 100;
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    }, delayInMilliSec);
}