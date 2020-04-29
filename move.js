

//Narrative: Moves a point around the screen
//Preconditions: An input a which is either 1,2,3
//Postconditions: The point is moved half it’s distance from the selected point
function MovePoint(a) {

    turnCount = turnCount + 1;
    point = [(point[0] + triangle[a][0]) / 2, (point[1] + triangle[a][1]) / 2];

    Draw();
    CheckWin();
}



//Narrative: Checks if the point has been guided to the shaded triangle, if so, the player wins. To check if the point is in the region, the formula ‘n = b*(1-h/a)’  is used
//Preconditions: The shaded triangle as well as a point must exist
//Postconditions: Either the player wins or doesn't win
function CheckWin() {
	
    
	let buff = 1;
	
	let px = point[0];
	let py = point[1];
	
	let x1 = shaded[0][0];
	let y1 = shaded[0][1]-buff;
	let x2 = shaded[1][0]+buff;
	let y2 = shaded[1][1]+buff;
	let x3 = shaded[2][0]+buff;
	let y3 = shaded[2][1]+buff;

	
	let areaOrig = Math.abs((x2-x1)*(y3-y1) - (x3-x1)*(y2-y1));
	
	let area1 = Math.abs( (x1-px)*(y2-py) - (x2-px)*(y1-py));
    let area2 = Math.abs( (x2-px)*(y3-py) - (x3-px)*(y2-py));
    let area3 = Math.abs( (x3-px)*(y1-py) - (x1-px)*(y3-py));
	//console.log(area1, area2, area3,area1 + area2 + area3, areaOrig )
	if (area1 + area2 + area3 == areaOrig) {
		OpenWinScreen();
	}

}



//Narrative: A win screen is opened
//Preconditions: The game is won
//Postconditions: The player presses rest and the game resets
function OpenWinScreen() {
    $("#winModal").modal("show");
}



// A function that proddces the win screen
$("#winModal").on('shown.bs.modal', function () {

    // Hide the Modal
    $("#myBtn").click(function () {
        $("#winModal").modal("hide");
    });

});

