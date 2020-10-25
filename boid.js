class Boid
{
    constructor()
    {
        this.position = createVector(random(uiBoxWidth, width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4))
        this.acceleration = createVector();

    }
    
    flock(boids) {
        this.maxForce = maxForceSlider.value();
        this.maxSpeed = maxSpeedSlider.value();

        this.acceleration.set(0, 0);
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
        let edgeAvoidance = this.edgeAvoidance(boids);
        let obstacleAvoidance = this.obstacleAvoidance(boids);

        alignment.mult(alignmentSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value()).mult(1.2);
        edgeAvoidance.mult(edgeAvoidanceSlider.value());
        obstacleAvoidance.mult(obstacleAvoidanceSlider.value());

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
        this.acceleration.add(edgeAvoidance);
        this.acceleration.add(obstacleAvoidance);
    
    }
    
    update()
    {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }
    
    show()
    {
        strokeWeight(circleStroke);
        stroke('white');
        point(this.position.x, this.position.y);
    }

    edges() {
        if (this.position.x > width)
        {
            this.position.x = uiBoxWidth + circleStroke + 1;
        }
        else if (this.position.x < uiBoxWidth + circleStroke)
        {
            this.position.x = width;
        }
        if (this.position.y > height)
        {
            this.position.y = 0;
        }
        else if (this.position.y < 0)
        {
            this.position.y = height;
        }

    }

    align(boids)
    {

        let perceptionRadius = perceptionSlider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && d < perceptionRadius)
            {
                steering.add(other.velocity);
                total++;

            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        return steering;
    }

    cohesion(boids)
    {

        let perceptionRadius = perceptionSlider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && d < perceptionRadius)
            {
                steering.add(other.position);
                total++;

            }
        }

        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        return steering;
    }

    
    separation(boids)
    {

        let perceptionRadius = perceptionSlider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids)
        {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && d < perceptionRadius)
            {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;

            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        return steering;
    }

    obstacleAvoidance(boids)
    {

        let perceptionRadius = perceptionSlider.value();
        let steering = createVector();
        let total = 0;
        for (let other of boids)
        {
            for (let i=0; i<numObstacleSlider.value(); i++)
            {
                let d = dist(this.position.x, this.position.y, obstaclePositionX[i], obstaclePositionY[i]);
    
                if (other != this && d < perceptionRadius)
                {
                    let diff = p5.Vector.sub(this.position, obstaclePosition[i]);
                    diff.div(d);
                    steering.add(diff);
                    total++;
    
                }

            }
        }

        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        return steering;
    }

    edgeAvoidance(boids)
    {

        let perceptionRadius = perceptionSlider.value();
        let steering = createVector();
        let total = 0;

        for (let i = 0; i<boids.length; i++)
        {
            
            let dLeft = this.position.x - uiBoxWidth;
            let dRight = width - this.position.x;
            
            let dTop = this.position.y;
            let dBottom = height - this.position.y;

            if (dLeft < perceptionRadius)
            {
                let diffLeft = createVector(-dLeft, 0);
                diffLeft = p5.Vector.sub(this.position, diffLeft);
                //diffLeft.div(dLeft);
                steering.add(diffLeft);
                total++;
            }
            if (dRight < perceptionRadius)
            {
                let diffRight = createVector(dRight, 0);
                diffRight = p5.Vector.sub(this.position, diffRight);
                // diffRight.div(dRight);
                steering.sub(diffRight);
                total++;
            }
            if (dTop < perceptionRadius)
            {
                let diffTop = createVector(0, -dTop);
                diffTop = p5.Vector.sub(this.position, diffTop);
                // diffTop.div(dTop);
                steering.add(diffTop);
                total++;
            }
            if (dBottom < perceptionRadius)
            {
                let diffBottom = createVector(0, dBottom);
                diffBottom = p5.Vector.sub(this.position, dBottom);
                // diffBottom.div(dBottom);
                steering.sub(diffBottom);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            
        }
        return steering;
    }

}