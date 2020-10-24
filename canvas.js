const flock = [];
let uiBoxWidth = 200;
let uiReference;
let sliderWidth = uiBoxWidth/2;
let circleStroke = 8;

let alignmentSlider, cohesionSlider, separationSlider;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    background(51);
    uiReference = windowHeight/16;


    //Sliders:
    alignmentSlider = createSlider(0, 2, 1, .1);
    alignmentSlider.position(uiBoxWidth / 8, uiReference);
    alignmentSlider.style('width', '150px');

    cohesionSlider = createSlider(0, 2, 1, .1);
    cohesionSlider.position(uiBoxWidth / 8, uiReference + 80);
    cohesionSlider.style('width', '150px');

    separationSlider = createSlider(0, 2, 1, .1);
    separationSlider.position(uiBoxWidth / 8, uiReference + 160);
    separationSlider.style('width', '150px');

    edgeAvoidanceSlider = createSlider(0, 2, 1, .1);
    edgeAvoidanceSlider.position(uiBoxWidth / 8, uiReference + 240);
    edgeAvoidanceSlider.style('width', '150px'); 
    
    maxForceSlider = createSlider(0, 2, 1, .1); 
    maxForceSlider.position(uiBoxWidth / 8, uiReference + 320);
    maxForceSlider.style('width', '150px');  

    maxSpeedSlider = createSlider(0, 10, 5, 1); 
    maxSpeedSlider.position(uiBoxWidth / 8, uiReference + 400);
    maxSpeedSlider.style('width', '150px'); 

    perceptionSlider = createSlider(0, 200, 100, 10);
    perceptionSlider.position(uiBoxWidth / 8, uiReference + 480);
    perceptionSlider.style('width', '150px');

    numBoidSlider = createSlider(0, 200, 100, 10); 
    numBoidSlider.position(uiBoxWidth / 8, uiReference + 560);
    numBoidSlider.style('width', '150px'); 


    for (let i=0; i<numBoidSlider.value(); i++)
    {
        flock.push(new Boid());       
    }
    
    
}

function draw()
{
    uiReference = windowHeight/16;
    background(51);
    
    fill('#e65a5a');
    noStroke();
    
    rect(0, 0, uiBoxWidth, windowHeight);

    for (let i=flock.length; i<numBoidSlider.value(); i++)
    {
        flock.push(new Boid());
    }

    for (let i=numBoidSlider.value(); i<flock.length; i++)
    {
        flock.pop();
    }
    
    //Text Labels
    textSize(20);
    textAlign(CENTER);
    fill('white');
    textFont('Oswald');
    text('Alignment: ' + alignmentSlider.value(), uiBoxWidth/2, uiReference-10);
    text('Cohesion: ' + cohesionSlider.value(), uiBoxWidth/2, uiReference+70);
    text('Separation: ' + separationSlider.value(), uiBoxWidth/2, uiReference+150);
    text('Edge Avoidance: ' + edgeAvoidanceSlider.value(), uiBoxWidth/2, uiReference+230);
    text('Max Force: ' + maxForceSlider.value(), uiBoxWidth/2, uiReference+310);
    text('Max Velocity: ' + maxSpeedSlider.value(), uiBoxWidth/2, uiReference+390);
    text('Perception: ' + perceptionSlider.value(), uiBoxWidth/2, uiReference+470);
    text('# of Boids: ' + numBoidSlider.value(), uiBoxWidth/2, uiReference+550);
    

    for (let boid of flock)
    {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}


