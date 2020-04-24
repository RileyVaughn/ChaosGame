
class Triangle {
    
	//Narrative: Creates a Triangle object 
	//Preconditions: Three points must be known, the vertices of the triangle. Intended to work with Barycentric coordinates.
	//Postconditions: A triangle object is created
    constructor(a,b,c) {
        
        this.a = a;
        this.b = b;
        this.c = c;
        
    }
    
	
	//Narrative: A triangle object splits itself and returns 3 triangles that make a sierpinski triangle, the middle one is left out
	//Preconditions: A triangle must exist that can be split
	//Postconditions: Three smaller triangles that can make up the original triangle are returned
    Split() {
        
        let a = this.a;
        let b = this.b;
        let c = this.c;
        
        
        let newTris= [new Triangle(a,this.FindMid(a,b),this.FindMid(a,c)),
                  new Triangle(b,this.FindMid(b,a),this.FindMid(b,c)),
                  new Triangle(c,this.FindMid(c,a),this.FindMid(c,b))]
                  //new Triangle(this.FindMid(a,b),this.FindMid(b,c),this.FindMid(c,a))];
        
        return newTris;
    }
    
    
	//Narrative: A private function that finds the middle of an edge of a triangle
	//Preconditions: x and y are length 3 arrays that represent the points of the triangle in Barycentric coordinates.
	//Postconditions: The midpoint is returned
    FindMid(x,y) {
        return [(x[0]+y[0])/2,(x[1]+y[1])/2,(x[2]+y[2])/2]
    }
    
}