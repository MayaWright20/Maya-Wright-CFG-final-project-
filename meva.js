/*confetti*/

let canvas = document.getElementById('meva', 'divbs2tos3');
canvas.width = 2000; 
canvas.height = 7400
let ctx = canvas.getContext('2d');
let pieces = [];
let numberOfPieces =350;
let lastUpdateTime = Date.now();


function randomColor () {
    let colors = ['#f00', '#0f0', '#00f', '#0ff', '#f0f', '#ff0'];
    return colors[Math.floor(Math.random()* colors.length)];
}

function update () {
    let now = Date.now(),
    dt = now - lastUpdateTime;
    for (let i = pieces.length - 1; i >= 0 ; i --){
        let p = pieces[i];

        if (p.y > canvas.height) {
            pieces.splice(i,1);
            continue;
        }
        p.y += p.gravity * dt;
        p.rotation += p.rotationSpeed *dt;
    }

    while (pieces.length < numberOfPieces) {
        pieces.push(new Piece(Math.random()* canvas.width, Math.random() * -20));
    }

    lastUpdateTime = now;
setTimeout(update,1);
}

function draw () {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    pieces.forEach(function(p){
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

        ctx.restore();

    });
    requestAnimationFrame(draw);
}

function Piece (x,y){
    this.x= x;
    this.y = y;
    this.size = (Math.random()*0.5 + 0.75)*15;
    this.gravity = (Math.random()*0.5 + 0.75)* 0.041;
    this.rotation = (Math.PI *2) * Math.random();
    this.rotationSpeed = (Math.PI * 2) * Math.random() *0.0003;
    this.color = randomColor();
}

while (pieces.length < numberOfPieces) {
    pieces.push(new Piece(Math.random()* canvas.width, Math.random() * canvas.height));
}

update();
draw();

/*sticky header*/

window.onscroll = function() {myFunction()};
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;
function myFunction() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  } 



  /*parallax scrolling*/

  function splitScroll(){
      const controller = new ScrollMagic.Controller();

      new ScrollMagic.Scene({
          duration:'500%',
          triggerElement:'.about-title',
          triggerHook:0
      })
      .setPin('.about-title')
     // .addIndicators()
      .addTo(controller)
  }

  splitScroll();


/*golf ball animation*/

const flightPath = {
    curviness:1.25,
    autoRotate:true,
    values: [
        {x: 0, y: -50},{x: 10, y: -45},{x: 30, y: -10},{x: 40, y: -1},{x: 45, y: 10},
        {x: 55, y: 12},{x: 75, y: 15},{x: 85, y: 18},
        {x: 165, y: 20},{x: 175, y: 25},{x: 205, y: 30},
        {x: 365, y: 60},{x: 475, y: 70},{x: 585, y: 80},
        {x: 765, y: 100},{x: 875, y: 140},{x: 985, y: 170},
        {x: 1065, y: 200},{x: 1075, y: 240},{x: 1185, y: 260},
        {x: 1185, y: 270},{x: 1285, y: 370},{x: 1385, y: 470},{x: 1485, y: 570},{x: 1585, y: 570},{x: 1585, y: 570},
    ]
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to(".golfball", 1,{
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration:800,
})
.setTween(tween)
//.addIndicators()
.addTo(controller);


