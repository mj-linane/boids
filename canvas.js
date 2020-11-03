const flock = []
const obstacles = []
const obstaclePositionX = []
const obstaclePositionY = []
const obstaclePosition = []
const obstacleDiameter = []

let uiBoxWidth = 200
let circleStroke = 10
let alignmentSlider,
  cohesionSlider,
  separationSlider,
  obstacleAvoidanceSlider,
  edgeAvoidanceSlider,
  mouseAvoidanceSlider,
  maxForceSlider,
  maxSpeedSlider,
  numObstacleSlider,
  perceptionSlider,
  numBoidSlider

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(51)

  //Get Slider Elements
  alignmentSlider = select('#alignment-slider')
  cohesionSlider = select('#cohesion-slider')
  separationSlider = select('#separation-slider')
  obstacleAvoidanceSlider = select('#obstacle-avoidance-slider')
  edgeAvoidanceSlider = select('#edge-avoidance-slider')
  mouseAvoidanceSlider = select('#mouse-avoidance-slider')
  maxForceSlider = select('#max-force-slider')
  maxSpeedSlider = select('#max-speed-slider')
  numObstacleSlider = select('#number-obstacles-slider')
  perceptionSlider = select('#perception-slider')
  numBoidSlider = select('#number-boid-slider')
}

function draw() {
  // Update UI Displays With Slider Values
  select('#alignment-slider-display').html(alignmentSlider.value())
  select('#cohesion-slider-display').html(cohesionSlider.value())
  select('#separation-slider-display').html(separationSlider.value())
  select('#obstacle-avoidance-slider-display').html(
    obstacleAvoidanceSlider.value(),
  )
  select('#edge-avoidance-slider-display').html(edgeAvoidanceSlider.value())
  select('#mouse-avoidance-slider-display').html(mouseAvoidanceSlider.value())
  select('#max-force-slider-display').html(maxForceSlider.value())
  select('#max-speed-slider-display').html(maxSpeedSlider.value())
  select('#number-obstacles-slider-display').html(numObstacleSlider.value())
  select('#perception-slider-display').html(perceptionSlider.value())
  select('#number-boid-slider-display').html(numBoidSlider.value())

  background(51)
  noStroke()

  for (let i = flock.length; i < numBoidSlider.value(); i++) {
    flock.push(new Boid())
  }

  for (let i = numBoidSlider.value(); i < flock.length; i++) {
    flock.pop()
  }

  for (let i = obstacles.length; i < numObstacleSlider.value(); i++) {
    obstacles.push(new Obstacle())
  }

  for (let i = numObstacleSlider.value(); i < obstacles.length; i++) {
    obstacles.pop()
    obstacleDiameter.pop()
    obstaclePositionX.pop()
    obstaclePositionY.pop()
    obstaclePosition.pop()
  }

  for (let boid of flock) {
    boid.edges()
    boid.flock(flock)
    boid.update()
    boid.show()
  }

  for (let obstacle of obstacles) {
    obstacle.show()
  }
}
