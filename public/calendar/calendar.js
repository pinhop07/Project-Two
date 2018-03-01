$('#reserveBtn').on('click', function(){
	alert('You have successfully booked this event!');
	$(this).css('background-color', 'green');
});

function tdAddThisClass() {

	// $("td").filter(function(){
	//   return $(this).text() == 10;
	// }).css("background-color", "red");
	//

	$('td').each(function () {
		if ($(this).html() == 14) {
			$(this).css('background-color', 'rgb(209,43,82)');
			$(this).addClass('calDateData');
			// {{#each evt}}
		  //     <li>
		  //       <p>ID : {{this.name}} {{this.date}} {{this.startTime}} {{this.name}} </p>
		  //     </li>
		  // {{/each}}
			// TODO: something cool
		}
	});
}



var CALENDAR = function () {
	var wrap, label,
			months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

		function init(newWrap) {
			wrap  = $(newWrap || "#cal");
			label = wrap.find("#label");

			wrap.find("#prev").bind("click.calender", function () { switchMonth(false); });
			wrap.find("#next").bind("click.calender", function () { switchMonth(true); });
			label.bind("click.calendar", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear() ); });
		}

		function switchMonth(next, month, year) {

			var curr = label.text().trim().split(" "), calendar, tempYear = parseInt(curr[1], 10);

			month = month || ((next) ? ((curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1) );
			year  = year  || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear -1 : tempYear);

			console.profile("createCal");
			calendar = createCal(year, month);
			console.profileEnd("createCal");

			$("#cal-frame", wrap)
				.find(".curr")
					.removeClass("curr")
					.addClass("temp")
				.end()
				.prepend(calendar.calendar())
				.find(".temp")
					.fadeOut("slow", function () { $(this).remove(); });
			label.text(calendar.label);

			tdAddThisClass();
		}

	function createCal(year, month) {
		var day = 1, i, j, haveDays = true,
				startDay = new Date(year, month, day).getDay(),
				daysInMonth = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
				calendar = [];
		if (createCal.cache[year]) {
			if (createCal.cache[year][month]) {
				return createCal.cache[year][month];
			}
		} else {
			createCal.cache[year] = {};
		}
		i = 0;
		while(haveDays) {
			calendar[i] = [];
			for (j = 0; j < 7; j++) {
				if (i === 0) {
					if (j === startDay) {
						calendar[i][j] = day++;
						startDay++;
					}
				} else if ( day <= daysInMonth[month]) {
					calendar[i][j] = day++;
				} else {
					calendar[i][j] = "";
					haveDays = false;
				}
				if (day > daysInMonth[month]) {
					haveDays = false;
				}
			}
			i++;
		}

		if (calendar[5]) {
			for (i = 0; i < calendar[5].length; i++) {
				if (calendar[5][i] !== "") {
					calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
				}
			}
			calendar = calendar.slice(0, 5);
		}

		for (i = 0; i < calendar.length; i++) {
			calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>";
		}

		calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");

		$("td:empty", calendar).addClass("nil");
		if (month === new Date().getMonth()) {
			$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today");
		}

		createCal.cache[year][month] = { calendar : function () { return calendar.clone(); }, label : months[month] + " " + year };

		return createCal.cache[year][month];
	}
	createCal.cache = {};
	tdAddThisClass();

	return {
		init : init,
		switchMonth : switchMonth,
		createCal : createCal
	};

};


tdAddThisClass();
// Get the modal
var modal = document.getElementById('myModal');
$(document).on('click', '.calDateData', function(){
		var modal = document.getElementById('myModal');
		modal.style.display = "block";
});
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function modelPrompt() {

$('.today').click(function(){
		modal.style.display = "block";
});

}
modelPrompt();
