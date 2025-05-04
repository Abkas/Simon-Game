var gamePattern = []
var userClickPattern = []
var buttonColour = ['red', 'blue','yellow', 'green']
var started = false;
var level = 0

$('.btn').on('click',function(){
    var userChoiceColor = $(this).attr('id')
    userClickPattern.push(userChoiceColor)

    animatePressed(userChoiceColor)
    playSound(userChoiceColor)
    checkAnswer(userClickPattern.length-1)
})


$(document).on('keypress',function(){
    if(!started){
        $('h1').text('level '+ level)
        nextSequence()
        started = true
    }
})

function nextSequence(){
    userClickPattern = [];
    level += 1
    $('h1').text('level ' + level);

    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColor = buttonColour[randomNumber]
    gamePattern.push(randomChosenColor)
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    animatePressed(randomChosenColor)
    playSound(randomChosenColor)
   

}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3')
    audio.play()
}


function animatePressed(currentColor){
    $('#' + currentColor).addClass('pressed')
    setTimeout(() => {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentlevel){
    if (gamePattern[currentlevel] === userClickPattern[currentlevel]) {
        if (userClickPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
        console.log('fail')
        playSound("wrong")
        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart');

        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
    
}

function startOver() {
    level = 0
    gamePattern = []
    userClickPattern = []
    started = false
}