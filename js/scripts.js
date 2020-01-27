console.log("hello world");

$(document).ready(function(){
  let enemyhp = 0
  let enemyname = "no enemy yet"
  const status = $('.game-ui__status');
  let userHp = 100
  let userMp = 50
  let userhpUI = $('.user-hp')
  let enemyhpUI = $('.enemy-hp')


  var options = [
    {
      name: "Attack",
      damage: [6,7,8,9,20]
    },
    {
      name: "Magic",
      damage: [10,15,16,20],
      cost: 10
    }
  ];

  var enemies = [
    {
      name: "Econ Professor",
      hp: 80,
      moves: "pop quiz",
      responds: "You realized how little you know!",
      damage: [2,5,6,15,35,20,30]
    },
    {
      name: "Insecurity",
      hp: 20,
      moves: "shows you pictures of someone with a 6 pack!",
      responds: "You feel super insecure!",
      damage: [0,5, 10, 35,30, 2,4,6,1]
    },
    {
      name: "Unhealthy lifestyle",
      hp: 130,
      moves: "junk food throw",
      responds: "You started eating processed food!",
      damage: [10, 1,5, 2,20,40]
    }
  ]

  // Append moves onto UI
  for(j=0; j<options.length; j++){
    $(".game-ui__controls").append("<button>" + options[j].name + "</button>");
  }

   $('.game-ui__start').on("click", function() {
     $('.game-ui__enemy-name').text("")
     status.text("")
     // Get Random Enemy
       var randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
       enemyhp = randomEnemy.hp
       enemyname = randomEnemy.name
       $('.game-ui__enemy-name').append("Enemy: "+ enemyname );
       status.append(`<br> ${enemyname} appeared!`);
       updateHP()
      $(".game-ui__controls").attr('id', 'show');
      $('.game-ui__start').text('Find Another Enemy')
   })



// On click of attack buttons
   $( ".game-ui__controls button " ).on( "click", function() {
     let attackopt = $(this).text()
     status.append(`<br> You used ${attackopt} on ${enemyname}`);

//deal random damage
     for(i=0; i<options.length; i++){
       if(attackopt === options[i].name){
          let userAttack = options[i].damage
          let randomUserDamage = userAttack[Math.floor(Math.random() * userAttack.length)];
          enemyhp =  enemyhp - randomUserDamage
          status.append(`<br> You afflicted  ${randomUserDamage} hp on ${enemyname}.`);
          updateHP()
          $(".game-ui__controls").attr('id', 'hide');

          setTimeout( function(){
             enemyAttack()
           }, 2000 );
       }
     }
   })

   function updateHP(response){
     enemyhpUI.text(enemyhp)
     userhpUI.text(userHp)
     if(userHp <= 0){
       status.append("Your hp ran out! You lose")
       $(".game-ui__controls").attr('id', 'hide');
     } if (enemyhp <= 0){
       status.append(`You defeated ${enemyname}!`)
       $(".game-ui__controls").attr('id', 'hide');
     }
   }

  function enemyAttack(){
    for(i=0; i<enemies.length; i++){
      if (userHp <= 0){
        console.log("user dies")
        return
      } if (enemyhp <= 0){
        console.log("enemy dies")
        return
      } if( enemyname === enemies[i].name){
         console.log("we found a match!!" + enemyname +enemies[i].name)
         let enemyDamage = enemies[i].damage
         let enemyAtkRespond = enemies[i].responds
         let enemyMove = enemies[i].moves
         let randomDamage = enemyDamage[Math.floor(Math.random() * enemyDamage.length)];
         userHp =  userHp - randomDamage
         updateHP()
         $(".game-ui__controls").attr('id', 'show');
         status.append(`<br>${enemyname} attacks with '${enemyMove}'! ${enemyAtkRespond}! Your HP took a hit of ${randomDamage}!`)
      }
    }
  }


});
