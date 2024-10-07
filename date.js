function startdate(){
    var newdate = new Date("1980-09-08T00:00:00");
    var dateElement = document.getElementById("date");
     
    function updateDate(){
        var now = new Date();
        var hours = String(now.getHours()).padStart(2,'0');
        var minutes = String(now.getMinutes()).padStart(2,'0');
        var seconds = String(now.getSeconds()).padStart(2,'0');

        var elapsedDays = Math.floor((now - new Date('2024-09-08T00:00:00')) / (1000 * 60 * 60 * 24));
        var currentDate = new Date(newdate.getTime() + elapsedDays * 24 * 60 * 60 * 1000);
        var day = String(currentDate.getDate()).padStart(2, '0');
        var monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        var month = monthNames[currentDate.getMonth()];
        var years = currentDate.getFullYear();

        dateElement.textContent = `${day} ${month} ${years} ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateDate, 1000);
}

startdate();