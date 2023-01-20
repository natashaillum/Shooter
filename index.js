let healthPoints = 100;
const myGunSound = new Audio('./bang.wav')
const enemyGunSound = new Audio('./bang.wav')
enemyGunSound.volume = 0.6;
const music = new Audio('./music.wav')
music.volume = 0.4;
music.loop = true;

function updateHealthPoints(points){
    healthPoints = points;
    const healthBar = document.querySelector("#healthBar");
    healthBar.style.width = points + "%";
        
    if(healthPoints < 0){
        alert('Game Over');
        window.location.reload();
    }
};

function iShoot(enemy){
    enemy.classList.add('dead');
    if (!livingEnemies().length){
        alert ("Game Over, YOU WIN!");
        window.location.reload();
    }
};

function enemyAttacksMe(enemy){
    enemy.classList.add('showing');
    setTimeout( () =>{
        enemyShootsMe(enemy);
    }, 1000);
    setTimeout (() => {
        enemy.classList.remove('showing');
    }, 3000);
    
};

function enemyShootsMe(enemy){
    enemyGunSound.play();
    if(!enemy.classList.contains('dead')){
        enemy.classList.add('shooting');
        updateHealthPoints (healthPoints - 20);
        setTimeout (() => {
            enemy.classList.remove('shooting');
        }, 200);
    }
  
}

function livingEnemies(){
    return document.querySelectorAll(".enemy:not(.dead)");
}

function randomEnemyAttacks(){

    let randomEnemyNo = Math.random() * livingEnemies().length;
    randomEnemyNo = Math.floor(randomEnemyNo);
    let enemy = livingEnemies()[randomEnemyNo];
    let randomDelay = Math.random() * 2000 + 1000;

    setTimeout( () => {
        enemyAttacksMe(enemy);
        randomEnemyAttacks();
    }, randomDelay);
}

function newGame(){
    randomEnemyAttacks();
    document.querySelector("button").style.display = "none";
    music.play();
}