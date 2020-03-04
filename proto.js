// Lopez just did stuff

const TRIANGLE = [[0,0],[800,0],[400,8*86.6]];


class Triangle {
    
    constructor(a,b,c) {
        
        this.a = a;
        this.b = b;
        this.c = c;
        
    }
    
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
    
    
    FindMid(x,y) {
        return [(x[0]+y[0])/2,(x[1]+y[1])/2,(x[2]+y[2])/2]
    }
    
}


function InitTris(level) {
    
    let tris = [new Triangle([1,0,0],[0,1,0],[0,0,1])];
    
    
    for (let i = 0; i < level; i++){
        
        let tristemp = tris;
        tris = [];
        
        for (let k = 0; k < tristemp.length; k++){
            
            tris = tris.concat(tristemp[k].Split());
            
        }
        
    }
    
    return tris;
}

function InitCoords(a,b,c,tris) {
	
	let coords = [];
	
	for (let i = 0; i < tris.length; i++){
		let cTri = [];
		cTri.push(BaryToCart(a,b,c,tris[i].a));
		cTri.push(BaryToCart(a,b,c,tris[i].b));
		cTri.push(BaryToCart(a,b,c,tris[i].c));
		coords.push(cTri);
	}

	return coords;
}

function InitRandTri(coords) {
    
    let i = Math.floor(Math.random() * coords.length)
    
	let tri = coords[i];
	
	//Make top [0], left [1], right [2]
	if (tri[0][1] < tri[1][1]){
		[tri[0],tri[1]] = [tri[1],tri[0]]
	}
	else if (tri[0][1] < tri[2][1]){
		[tri[0],tri[2]] = [tri[2],tri[0]]
	}
	
	if (tri[1][0] > tri[2][0]) {
		[tri[1],tri[2]] = [tri[2],tri[1]]
	}
	
    return tri;
}

function InitPoint() {

    let temp = TRIANGLE.slice();
    return temp[Math.floor(Math.random() * 3)];
}

function BaryToCart(a,b,c,p) {
    
    let x = a[0]*p[0]+b[0]*p[1]+c[0]*p[2];
    let y = a[1]*p[0]+b[1]*p[1]+c[1]*p[2];
    
    return [x,y];
}

function Draw() {
    
    this.ctx.clearRect(-20,-10, this.canvas.height+25, this.canvas.width+10);
    
    DrawTriangles(ctx,coords);
    ShadeTriangle(ctx,shaded);
    DrawPoint(ctx, point);

}

function DrawTriangles(ctx, coords) {
	ctx.strokeStyle = "black";
    for (let i = 0; i <coords.length; i++){
        ctx.beginPath();
        ctx.moveTo(coords[i][0][0],coords[i][0][1]);
        ctx.lineTo(coords[i][1][0],coords[i][1][1]);
        ctx.lineTo(coords[i][2][0],coords[i][2][1]);
        ctx.lineTo(coords[i][0][0],coords[i][0][1]);
        ctx.stroke();
    }
	
    
    
    
    
	
}

function ShadeTriangle(ctx,tri) {
    
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.moveTo(tri[0][0],tri[0][1]);
    ctx.lineTo(tri[1][0],tri[1][1]);
    ctx.lineTo(tri[2][0],tri[2][1]);
    ctx.lineTo(tri[0][0],tri[0][1]);
    ctx.fill();
    
}

function DrawPoint(ctx, point) {
    
    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(point[0],point[1],4,0, Math.PI*2);
    ctx.fill();
}

function MovePoint(a) {
    
    point = [(point[0] + TRIANGLE[a][0])/2,(point[1] + TRIANGLE[a][1])/2];

    Draw();
    CheckWin();
}

function CheckWin() {
	//console.log(point[0],point[1],shaded[0][1],shaded[1][1] )
	if (point[1] < shaded[0][1] && point[1] > shaded[1][1]) {
		// n = b*(1-h/a) 
        
		let b = .5*(shaded[2][0] - shaded[1][0]);
		let h = point[1];
		let a = shaded[0][1]-shaded[1][1];
		let n = Math.abs(b*(1-h/a));
		let mid = Math.abs(shaded[0][0]);
		
		if (point[0] < mid+n && point[0] > mid-n){
			
			alert("winner")
		}
		
    }
	
}


var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');
    canvas.tabIndex = 0;
    ctx.translate(20,canvas.height-10);
    ctx.scale(1,-1);


var tris = InitTris(4);
var coords = InitCoords(TRIANGLE[0],TRIANGLE[1],TRIANGLE[2],tris);
var shaded = InitRandTri(coords);
var point = InitPoint();


Draw();




