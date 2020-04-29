//Narrative: Initializes all triangles that make up partial sierpinski triangle in barycentric coords
//Preconditions: A level of the partial triangle must be input, level must be at least 1 and no more than ~8 or it will lag hard
//Postconditions: Triangles are initialized in an array, in barycentric coords
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

//Narrative: Initializes all cartesian coords that make up triangles
//Preconditions: Three original points for the big triangle in cartesian coordinates must exist as well as a list of triangles in barycentric coordinates
//Postconditions: A list of all small triangles described in cartesian coords now exists
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

//Narrative: Chooses a random position
//Preconditions: A length two choose any pos from
//Postconditions: A pos is returned
function RandomPos(length) {
    
    let i = Math.floor(Math.random() * length)
    
	return i;
}


//Narrative: Chooses a triangle from a list based on Pos and rearranges its coords so that top is index 0, left 1, and right 2.
//Preconditions: Three original points for the big triangle in cartesian coordinates must exist as well the three points of the small triangle in barycentric coords.
//Postconditions: A small triangle described in cartesian coords is returned
function InitShadedTri(coords, i) {

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

//Narrative: Choose one of three starting locations for a point
//Preconditions: The coords of the original TRIANGLE
//Postconditions: One of the three coords from TRIANGLE
function InitPoint(pos) {

    let temp = triangle.slice();
    return temp[pos];
}


//Narrative: Converts a triangle described in barycentric coords to a triangle described in cartesian coords
//Preconditions: Three original points for the big triangle in cartesian coordinates must exist as well the three points of the small triangle in barycentric coords.
//Postconditions: A small triangle described in cartesian coords is returned
function BaryToCart(a,b,c,p) {
    
    let x = a[0]*p[0]+b[0]*p[1]+c[0]*p[2];
    let y = a[1]*p[0]+b[1]*p[1]+c[1]*p[2];
    
    return [x,y];
}


//Narrative: Draw all triangles and point to screen
//Preconditions: A canvas and it’s context must be defined as well as the objects to be drawn
//Postconditions: All objects are drawn
function Draw() {
    
    Clear();
    
    DrawTriangles(ctx,coords);
    ShadeTriangle(ctx,shaded);
    DrawPoint(ctx, point);

}


//Narrative: Draws all triangles 
//Preconditions: A context must be defined and triangle coords
//Postconditions: All objects are drawn
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

//Narrative: Shades a selected triangle
//Preconditions: A context must be defined and triangle coords
//Postconditions: Triangle is shaded
function ShadeTriangle(ctx,tri) {
    
    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.moveTo(tri[0][0],tri[0][1]);
    ctx.lineTo(tri[1][0],tri[1][1]);
    ctx.lineTo(tri[2][0],tri[2][1]);
    ctx.lineTo(tri[0][0],tri[0][1]);
    ctx.fill();
    
}

//Narrative: Draws the point
//Preconditions: A context must be defined as well as the point
//Postconditions: The point is drawn
function DrawPoint(ctx, point) {
    
    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(point[0],point[1],4,0, Math.PI*2);
    ctx.fill();
}

//Narrative: Moves a point around the screen
//Preconditions: An input a which is either 1,2,3
//Postconditions: The point is moved half it’s distance from the selected point
function MovePoint(a) {
    
	turnCount = turnCount + 1;
    point = [(point[0] + triangle[a][0])/2,(point[1] + triangle[a][1])/2];

    Draw();
    CheckWin();
}


//Narrative: Checks if the point has been guided to the shaded triangle, if so, the player wins. To check if the point is in the region, the formula ‘n = b*(1-h/a)’  is used
//Preconditions: The shaded triangle as well as a point must exist
//Postconditions: Either the player wins or doesn't win
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
			
			OpenWinScreen();
			
		}
		
    }
	
}

function Clear(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
}


var canvas = document.getElementById('Canvas');
var ctx = canvas.getContext('2d');

var container = document.getElementById("CanvasCol");
canvas.height = container.offsetHeight;
canvas.width = container.offsetWidth;

canvas.tabIndex = 0;
ctx.translate(0,canvas.height);
ctx.scale(1,-1);

var PAD = 5;
var triangle = [[PAD,PAD],[canvas.width-PAD,PAD],[canvas.width/2,canvas.height-PAD]];

var level = 3;

var tris = InitTris(level);
var coords = InitCoords(triangle[0],triangle[1],triangle[2],tris);
var shadePos = RandomPos(coords.length);
var shaded = InitShadedTri(coords, shadePos);
var pointPos =  RandomPos(3);
var point = InitPoint(pointPos);
var turnCount = 0;
var optimal = level+2;

window.addEventListener("resize", ResizeCanvas);

function ResizeCanvas(){
    Clear();
    var cSize = ContainerSize();
    canvas.width = cSize[0];
    canvas.height = cSize[1];
    triangle = [[PAD,PAD],[canvas.width-PAD,PAD],[canvas.width/2,canvas.height-PAD]];
   
    coords = InitCoords(triangle[0],triangle[1],triangle[2],tris);
    ctx.translate(0,canvas.height);
    ctx.scale(1,-1);
    shaded = InitShadedTri(coords, shadePos);
    point = InitPoint(pointPos);
    Draw();
}

function ContainerSize(){
    var sizeArr = new Array(2);
    // Get width and height of the window excluding scrollbars
    var container = document.getElementById("CanvasCol");
    var w = container.offsetWidth;
    var h = container.offsetWidth;
    
    sizeArr[0] = w;
    sizeArr[1] = h;

    // Display result inside a div element
//    document.getElementById("result").innerHTML = " Col Width: " + w + ", " + " Col Height: " + h;
    
    return sizeArr;
}

ResizeCanvas();

function OpenWinScreen(){
     $("#winModal").modal("show");
}

$("#winModal").on('shown.bs.modal',function(){
    
     // Hide the Modal
  $("#myBtn").click(function(){
    $("#winModal").modal("hide");
  });
  
});
    




