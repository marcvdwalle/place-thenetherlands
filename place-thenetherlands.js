const modhash = window.reddit.modhash;
var sec = 0;
setInterval(() => console.log("Drawing in " + (sec--) + " seconds"), 1e3);
const draw = seconds => {
    sec = seconds = Math.ceil(seconds)
    setTimeout(() => {
        const x = Math.floor(Math.random() * 118);
        const y = Math.floor(Math.random() * 3);
		const r = 5;
		const w = 0;
		const b = 13;
        const flagColor =
        [[ r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r, r],
        [ w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
        [ b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b, b]][y][x];
		//[[ r ]][y][x];
        const ax = x + 442;
        const ay = y + 50;
        $.get("https://www.reddit.com/api/place/pixel.json?x=" + ax + "&y=" + ay)
        .then(res => {
            if (res.color == flagColor) {
                console.log("Skipping " + (ax + ", " + ay) + " because it's already correct");
                return draw(1);
            }
            console.log("Drawing at " + ax + ", " + ay + " (https://www.reddit.com/r/place/#x=" + ax + "&y=" + ay + ")");
            $.ajax({ url: "https://www.reddit.com/api/place/draw.json", type: "POST",
                headers: { "x-modhash": modhash }, data: { x: ax, y: ay, color: flagColor }
            })
            .done(data => draw(data.wait_seconds))
            .error(data => draw(data.responseJSON.wait_seconds));
        }, function(reason) {
		  console.error('ERROR'); // Error!
		  console.error(reason); // Error!
		  draw(0);
		});	
    }, seconds * 1000);
}
draw(0);