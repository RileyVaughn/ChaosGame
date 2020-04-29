

//Narrative: Initializes global variables for game
//Preconditions: nothing
//Postconditions: The game is reset to the following conditions
function InitGame(lev) {
    level = lev;
    turnCount = 0;
    optimal = level + 2;

    tris = InitTris(level);
    coords = InitCoords(triangle[0], triangle[1], triangle[2], tris);
    shadePos = RandomPos(coords.length);
    shaded = InitShadedTri(coords, shadePos);
    pointPos = RandomPos(3);
    point = InitPoint(pointPos);

}

<<<<<<< HEAD:createboard.js
<<<<<<< HEAD:createboard.js

<<<<<<< HEAD
function CallRestart(){
    RestartGame(level);
}
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js

=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff

//Narrative: Completley Restarts the game
//Preconditions: nothing
//Postconditions: The game is restarted
function RestartGame(lev) {
	
	Clear();
	InitGame(lev);
	ResizeCanvas();
	
	
}



//Narrative: Clears the Canvas
//Preconditions: nothing
//Postconditions: The Canvis cleared
function Clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}



//Narrative: Initializes all triangles that make up partial sierpinski triangle in barycentric coords
//Preconditions: A level of the partial triangle must be input, level must be at least 1 and no more than ~8 or it will lag hard
//Postconditions: Triangles are initialized in an array, in barycentric coords
function InitTris(level) {

    let tris = [new Triangle([1, 0, 0], [0, 1, 0], [0, 0, 1])];


    for (let i = 0; i < level; i++) {

        let tristemp = tris;
        tris = [];

        for (let k = 0; k < tristemp.length; k++) {

            tris = tris.concat(tristemp[k].Split());

        }

    }

    return tris;
}



//Narrative: Initializes all cartesian coords that make up triangles
//Preconditions: Three original points for the big triangle in cartesian coordinates must exist as well as a list of triangles in barycentric coordinates
//Postconditions: A list of all small triangles described in cartesian coords now exists
function InitCoords(a, b, c, tris) {

    let coords = [];

    for (let i = 0; i < tris.length; i++) {
        let cTri = [];
        cTri.push(BaryToCart(a, b, c, tris[i].a));
        cTri.push(BaryToCart(a, b, c, tris[i].b));
        cTri.push(BaryToCart(a, b, c, tris[i].c));
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
    if (tri[0][1] < tri[1][1]) {
		[tri[0], tri[1]] = [tri[1], tri[0]]
    } else if (tri[0][1] < tri[2][1]) {
		[tri[0], tri[2]] = [tri[2], tri[0]]
    }

    if (tri[1][0] > tri[2][0]) {
		[tri[1], tri[2]] = [tri[2], tri[1]]
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
function BaryToCart(a, b, c, p) {

    let x = a[0] * p[0] + b[0] * p[1] + c[0] * p[2];
    let y = a[1] * p[0] + b[1] * p[1] + c[1] * p[2];

    return [x, y];
}



//Narrative: Allows for dynamic resizing of screen when browser is resized
//Preconditions: Teh canvas must exist
//Postconditions: The canvas is resized
function ResizeCanvas() {
    Clear();
    var cSize = ContainerSize();
    canvas.width = cSize[0];
    canvas.height = cSize[1];
    triangle = [[PAD, PAD], [canvas.width - PAD, PAD], [canvas.width / 2, canvas.height - PAD]];

    coords = InitCoords(triangle[0], triangle[1], triangle[2], tris);
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    shaded = InitShadedTri(coords, shadePos);
    point = InitPoint(pointPos);
    Draw();
}


//Narrative: Checks the size of the contianer holding the canvas
//Preconditions: The canvas must exist
//Postconditions: The size is checked
function ContainerSize() {
    var sizeArr = new Array(2);
    // Get width and height of the window excluding scrollbars
    var container = document.getElementById("CanvasCol");
    var w = container.offsetWidth;
    var h = container.offsetWidth;

    sizeArr[0] = w;
    sizeArr[1] = h;


    return sizeArr;
}

<<<<<<< HEAD:createboard.js
<<<<<<< HEAD:createboard.js

<<<<<<< HEAD
<<<<<<< HEAD:proto.js
$('input[type="range"]').on('mousemove touchmove', function() {

  $val = $(this).val();
  $thumb = $(this).siblings('.thumb');
 
  $thumb.css('background-position-x', $val + '%');
});

const input = document.querySelector("input");
=======
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff
=======

>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js
=======

>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js
//Narrative: Sets the level to what the level slider is at
//Preconditions: The canvas must exist
//Postconditions: The level is reset
function SetLevel(){
<<<<<<< HEAD:createboard.js
<<<<<<< HEAD:createboard.js
<<<<<<< HEAD
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:createboard.js
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js
=======
>>>>>>> a6f9458d8586798a485048128d493bc5d5e405ff:proto.js

    var newLevel = document.getElementById("myRange").value;

    level = parseInt(newLevel)+1;
    
    RestartGame(level);
}




window.addEventListener("resize", ResizeCanvas);


window.addEventListener("input", SetLevel);
const input = document.querySelector("input");
input.addEventListener("input",SetLevel);

