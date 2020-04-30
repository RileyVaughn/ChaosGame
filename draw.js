

//Narrative: Draw all triangles and point to screen
//Preconditions: A canvas and it’s context must be defined as well as the objects to be drawn
//Postconditions: All objects are drawn
function Draw() {

    Clear();

    DrawTriangles(ctx, coords);
    ShadeTriangle(ctx, shaded);
    DrawPoint(ctx, point);

}



//Narrative: Draws all triangles 
//Preconditions: A context must be defined and triangle coords
//Postconditions: All objects are drawn
function DrawTriangles(ctx, coords) {
    ctx.strokeStyle = "black";
    for (let i = 0; i < coords.length; i++) {
        ctx.beginPath();
        ctx.moveTo(coords[i][0][0], coords[i][0][1]);
        ctx.lineTo(coords[i][1][0], coords[i][1][1]);
        ctx.lineTo(coords[i][2][0], coords[i][2][1]);
        ctx.lineTo(coords[i][0][0], coords[i][0][1]);
        ctx.stroke();
    }
}



//Narrative: Shades a selected triangle
//Preconditions: A context must be defined and triangle coords
//Postconditions: Triangle is shaded
function ShadeTriangle(ctx, tri) {

    ctx.fillStyle = "black"
    ctx.beginPath();
    ctx.moveTo(tri[0][0], tri[0][1]);
    ctx.lineTo(tri[1][0], tri[1][1]);
    ctx.lineTo(tri[2][0], tri[2][1]);
    ctx.lineTo(tri[0][0], tri[0][1]);
    ctx.fill();

}



//Narrative: Draws the point
//Preconditions: A context must be defined as well as the point
//Postconditions: The point is drawn
function DrawPoint(ctx, point) {

    ctx.fillStyle = "red"
    ctx.beginPath();
    ctx.arc(point[0], point[1], 6, 0, Math.PI * 2);
    ctx.fill();
}
