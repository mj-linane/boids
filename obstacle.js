class Obstacle 
{
    constructor()
    {
        this.diameter = random(50, 120);
        let r = this.diameter/2
        this.position = createVector(random(uiBoxWidth+r, width-r),
                                     random(r, height-r));
        

        obstacleDiameter.push(this.diameter);                   
        obstaclePositionX.push(this.position.x);
        obstaclePositionY.push(this.position.y)
        obstaclePosition.push(this.position);
    }
    
    show()
    {
        fill('#e65a5a');
        noStroke();
        circle(this.position.x, this.position.y, this.diameter);
        noStroke();
    }
}