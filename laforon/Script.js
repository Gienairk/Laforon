window.onload = Onload

function Onload() {
    $('#Start').prop("disabled", true);
    setTimeout(Del, 3000)
    var clButton = document.getElementById("Start");
    clButton.onclick = stClick;
    var insButton = document.getElementById("instructors");
    insButton.onclick = inClick;
    $("body").keydown(record);
    fl1 = true;
}

var tp = "url(\"PersonT.png\")"
var lf = "url(\"PersonLeft.png\")"
var rt = "url(\"PersonRight.png\")"
var bt = "url(\"PersonL.png\")"

var fl = true;
var fl1 = true;
var fl2 = true;

function record(keydown) {
    if (fl == false) {
        console.log("ахахаха")
        document.getElementById('tabl').setAttribute('style', 'display:');
        fl = true;
        return;
    }
    if (keydown.keyCode == 82) {

        if (fl1 == false) {
            document.getElementById('tabl').setAttribute('style', 'display:block');
            fl = false;
            return;
        }
        fl = false;
        fl1 = false;
        var dob = $("<table>");
        var head = $("<tr>")
        head.append($("<td>").text("Высота"));
        head.append($("<td>").text("ширина"));
        head.append($("<td>").text("игрок"));
        head.append($("<td>").text("счет"));
        dob.append(head);
        for (i = 0; i < 5; i++) {
            var st = JSON.parse(localStorage.getItem(i))
            if (st == null)
                break
            else {
                var tr = $("<tr>");
                tr.append($("<td>").text(st.wid));
                tr.append($("<td>").text(st.hat));
                tr.append($("<td>").text(st.name));
                tr.append($("<td>").text(st.ans));
                dob.append(tr);
            }
        }
        $("#tabl").append(dob)
        document.getElementById('tabl').setAttribute('style', 'display:block');
        console.log("флаг=" + fl)
    }
    if (keydown.keyCode == 67) {
        $("#move").css("background-image", "url('start.jpg')")
        if (fl2 == true) {
            fl2 = false
            tp = "url(\"skelt.png\")"
            lf = "url(\"skelleft.png\")"
            rt = "url(\"skelright.png\")"
            bt = "url(\"skell.png\")"
        } else {
            fl2 = true
            tp = "url(\"PersonT.png\")"
            lf = "url(\"PersonLeft.png\")"
            rt = "url(\"PersonRight.png\")"
            bt = "url(\"PersonL.png\")"
        }
    }
}

function inClick() {
    alert("ходьба осуществляется стрелками,взрывы 'w ,a , s , d', таблица рекордов на клавише 'r',смена персонажа на 'с' ")
}

function Del() {
    document.getElementById('logo').setAttribute('style', 'display:none');
    document.getElementById('name').setAttribute('style', 'display:block');
    $('#Start').prop("disabled", false);

}

var razm = 20;
var pf = -1
var Bombcol = 0
currentPosition = [0, 0]

function stClick() {

    fl = true
    fl1 = true
    $("#tabl").empty();
    $("#coin").html(0)
    var hate = parseInt(document.getElementById("hate").value);
    var width = parseInt(document.getElementById("width").value);
    if (hate <= 0 || width <= 0 || document.getElementById("hate").value == '' || document.getElementById("width").value == '')
        return
    document.getElementById('insert').setAttribute('style', 'display:block');
    document.getElementById('name').setAttribute('style', 'display:none');

    var ts = new Date()
    document.getElementById('complete').setAttribute('style', 'display:');
    document.getElementById('tabl').setAttribute('style', 'display:');
    document.getElementById("maze").innerHTML = "";
    $("#maze").append("<div id=\"move\"></div>")
    var maze = [];
    var walls = [];

    var kod1 = parseInt(Math.random() * hate);
    var kod2 = parseInt(Math.random() * width);
    if (kod1 % 2 == 0)
        kod1 = kod1;
    else kod1 = kod1 + 1;
    if (kod2 % 2 == 0)
        kod2 = kod2;
    else kod2 = kod2 + 1;
    currentPosition = [kod1, kod2];
    if (hate % 2 == 0)
        hate = hate + 1;
    else hate = hate;
    if (width % 2 == 0)
        width = width + 1;
    else width = width;
    Bombcol = parseInt(hate * width / 100) + 1;
    $("#bomb").html(Bombcol)
    document.getElementById('maze').setAttribute('style', 'height:' + hate * razm + 'px; width:' + width * razm + 'px');
    for (var y = 0; y < hate; y++) {
        maze[y] = [];
        for (var x = 0; x < width; maze[y][x++] = 'wall') {
            var el = document.getElementById('maze').appendChild(document.createElement("div"));
            el.className = 'block wall';
            el.setAttribute('id', y + '-' + x);
        }
    }

    function Valid(a, b) {
        return (a < hate && a >= 0 && b < width && b >= 0) ? true : false;
    }

    function Amaze(y, x, addBlockWalls) {
        maze[y][x] = 'maze';
        document.getElementById(y + '-' + x).className = 'block ';
        if (addBlockWalls && Valid(y + 1, x) && (maze[y + 1][x] == 'wall')) walls.push([y + 1, x, [y, x]]);
        if (addBlockWalls && Valid(y - 1, x) && (maze[y - 1][x] == 'wall')) walls.push([y - 1, x, [y, x]]);
        if (addBlockWalls && Valid(y, x + 1) && (maze[y][x + 1] == 'wall')) walls.push([y, x + 1, [y, x]]);
        if (addBlockWalls && Valid(y, x - 1) && (maze[y][x - 1] == 'wall')) walls.push([y, x - 1, [y, x]]);
    }

    $("#maze").css("border", "solid")
    Amaze(currentPosition[0], currentPosition[1], true);
    while (walls.length != 0) {
        var randomWall = walls[Math.floor(Math.random() * walls.length)], host = randomWall[2],
            opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
        if (Valid(opposite[0], opposite[1])) {
            if (maze[opposite[0]][opposite[1]] == 'maze') walls.splice(walls.indexOf(randomWall), 1);
            else Amaze(randomWall[0], randomWall[1], false), Amaze(opposite[0], opposite[1], true);
        }
        else walls.splice(walls.indexOf(randomWall), 1);
    }

    var y1 = Math.random() * hate;
    var x1 = Math.random() * width;
    var y2 = Math.random() * hate;
    var x2 = Math.random() * width;
    y1 = parseInt(y1);
    x1 = parseInt(x1);
    y2 = parseInt(y2);
    x2 = parseInt(x2);
    document.getElementById(y1 + "-" + x1).className = 'block me';
    document.getElementById(y2 + '-' + x2).className = 'block finish';
    for (var i = 0; i < parseInt(hate * width / 100) + 2; i++) {
        do {
            var y3 = parseInt(Math.random() * hate);
            var x3 = parseInt(Math.random() * width);
        }
        while (y3 == y1 && x3 == x1 || y3 == y2 && x3 == x2)
        $("#" + y3 + "-" + x3).removeClass();
        $("#" + y3 + "-" + x3).addClass("block coin")
        $("#" + y3 + "-" + x3).maze = ""
    }
    currentPosition[0] = parseInt(y1);
    currentPosition[1] = parseInt(x1);
    $("#move").css("visibility", "visible");
    $("#move").css("top", parseInt(y1) * razm);
    $("#move").css("left", parseInt(x1) * razm)

    document.body.onkeydown = function (tab) {
        if (tab.keyCode == 38) {
            MoveTop(currentPosition[0], currentPosition[1]);
            tab.preventDefault();
        }
        if (tab.keyCode == 40) {
            MoveBroad(currentPosition[0], currentPosition[1])
            tab.preventDefault();
        }
        if (tab.keyCode == 39) {
            MoveRight(currentPosition[0], currentPosition[1])
            tab.preventDefault();
        }
        if (tab.keyCode == 37) {
            MoveLeft(currentPosition[0], currentPosition[1])
            tab.preventDefault();
        }
        if (tab.keyCode == 87)
            BoomTop(currentPosition[0], currentPosition[1]);
        if (tab.keyCode == 83)
            BoomBroad(currentPosition[0], currentPosition[1])
        if (tab.keyCode == 68)
            BoomRight(currentPosition[0], currentPosition[1])
        if (tab.keyCode == 65)
            BoomLeft(currentPosition[0], currentPosition[1])


        function Row(xl, yl) {
            $("#" + xl + "-" + yl).removeClass();
            $("#" + xl + "-" + yl).addClass("block hod");
        }

//setTimer
        function BoomTop(x, y) {
            var newp = [x - 1, y];
            if ($("#" + newp[0] + "-" + newp[1]).hasClass("wall") && Bombcol > 0) {
                $("#" + newp[0] + "-" + newp[1]).addClass("boom");
                setTimeout(Row, 1000, newp[0], newp[1])
                Bombcol--;
                $("#bomb").html(Bombcol)
                console.log("бомб=" + Bombcol)
                $("#move").css("background-image", tp)
            }
        }

        function BoomBroad(x, y) {
            var newp = [x + 1, y];
            if ($("#" + newp[0] + "-" + newp[1]).hasClass("wall") && Bombcol > 0) {
                $("#" + newp[0] + "-" + newp[1]).addClass("boom");
                setTimeout(Row, 1000, newp[0], newp[1])
                Bombcol--;
                $("#bomb").html(Bombcol)
                console.log("бомб=" + Bombcol)
                $("#move").css("background-image", bt)
            }
        }

        function BoomRight(x, y) {
            var newp = [x, y + 1];
            if ($("#" + newp[0] + "-" + newp[1]).hasClass("wall") && Bombcol > 0) {
                $("#" + newp[0] + "-" + newp[1]).addClass("boom");
                setTimeout(Row, 1000, newp[0], newp[1])
                Bombcol--;
                $("#bomb").html(Bombcol)
                console.log("бомб=" + Bombcol)
                $("#move").css("background-image", rt)
            }
        }

        function BoomLeft(x, y) {
            var newp = [x, y - 1];
            if ($("#" + newp[0] + "-" + newp[1]).hasClass("wall") && Bombcol > 0) {
                $("#" + newp[0] + "-" + newp[1]).addClass("boom");
                setTimeout(Row, 1000, newp[0], newp[1])
                Bombcol--;
                $("#bomb").html(Bombcol)
                console.log("бомб=" + Bombcol)
                $("#move").css("background-image", lf)
            }
        }


        function MoveTop(x, y) {

            currentPosition[0] = x;
            currentPosition[1] = y;
            var newPosition = [currentPosition[0] - 1, currentPosition[1]];
            if ((Valid(newPosition[0], newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') || ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                || (newPosition[0] == parseInt(y2) && newPosition[1] == parseInt(x2)) || (($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("hod")))) {
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block hod';
                if ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                    TaceCoin();
                currentPosition = newPosition;
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block me';
                $("#move").css("background-image", tp)
                $("#move").animate({top: "-=" + razm}, 200);
                if (currentPosition[0] == parseInt(y2) && currentPosition[1] == parseInt(x2)) End();
            }
        }

        function MoveBroad(x, y) {
            currentPosition[0] = x;
            currentPosition[1] = y;
            var newPosition = [currentPosition[0] + 1, currentPosition[1]];
            if ((Valid(newPosition[0], newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') || ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                || (newPosition[0] == parseInt(y2) && newPosition[1] == parseInt(x2)) || (($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("hod")))) {
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block hod';
                if ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                    TaceCoin();
                currentPosition = newPosition;
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block me';
                $("#move").css("background-image", bt)
                $("#move").animate({top: "+=" + razm}, 200);
                if (currentPosition[0] == parseInt(y2) && currentPosition[1] == parseInt(x2)) End();
            }
        }

        function MoveRight(x, y) {
            currentPosition[0] = x;
            currentPosition[1] = y;
            var newPosition = [currentPosition[0], currentPosition[1] + 1];
            if ((Valid(newPosition[0], newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') || ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                || (newPosition[0] == parseInt(y2) && newPosition[1] == parseInt(x2)) || (($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("hod")))) {
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block hod';
                if ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                    TaceCoin();
                currentPosition = newPosition;
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block me';
                $("#move").css("background-image", rt)
                $("#move").animate({left: "+=" + razm}, 200);
                if (currentPosition[0] == parseInt(y2) && currentPosition[1] == parseInt(x2)) End();
            }
        }

        function MoveLeft(x, y) {
            currentPosition[0] = x;
            currentPosition[1] = y;
            var newPosition = [currentPosition[0], currentPosition[1] - 1];
            if ((Valid(newPosition[0], newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') || ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                || (newPosition[0] == parseInt(y2) && newPosition[1] == parseInt(x2)) || (($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("hod")))) {
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block hod';
                if ($("#" + newPosition[0] + "-" + newPosition[1]).hasClass("coin"))
                    TaceCoin();
                currentPosition = newPosition;
                document.getElementById(currentPosition[0] + '-' + currentPosition[1]).className = 'block me';
                $("#move").css("background-image", lf)
                $("#move").animate({left: "-=" + razm}, 200);
                if (currentPosition[0] == parseInt(y2) && currentPosition[1] == parseInt(x2)) End();
            }
        }
    }

    var coinget = 0

    function TaceCoin() {
        coinget++;
        console.log(coinget)
        $("#coin").html(coinget)
    }

    function End() {
        document.getElementById('complete').setAttribute('style', 'display:block');
        document.getElementById('tabl').setAttribute('style', 'display:block');
        var tf = new Date
        Count(ts, tf)
        document.getElementById('maze').setAttribute('style', 'display:none');
        document.getElementById('insert').setAttribute('style', 'display:none');
    }

    function Stor(ans) {
        fl = false
        fl1 = false
        $("#tabl").empty();
        pf++
        if (pf >= 5)
            pf = 0;
        result = prompt("Введите имя игрока", "player")
        var str = {};
        str.wid = width;
        str.hat = hate;
        str.name = result;
        str.ans = ans;
        localStorage.setItem(pf, JSON.stringify(str))
        var dob = $("<table>");
        var head = $("<tr>")
        head.append($("<td>").text("Высота"));
        head.append($("<td>").text("ширина"));
        head.append($("<td>").text("игрок"));
        head.append($("<td>").text("счет"));
        dob.append(head);
        for (i = 0; i < 5; i++) {
            var st = JSON.parse(localStorage.getItem(i))

            if (st == null)
                break
            else {
                var tr = $("<tr>");
                tr.append($("<td>").text(st.wid));
                tr.append($("<td>").text(st.hat));
                tr.append($("<td>").text(st.name));
                tr.append($("<td>").text(st.ans));
                dob.append(tr);
            }
        }

        $("#tabl").append(dob)
    }

    function Count(ts, tf) {
        var answertime = tf - ts;
        var ans = 10 * hate * width - parseInt(answertime / 1000) + coinget * 10 + Bombcol * 15
        Stor(ans)
        alert("ваш результат= " + ans)
    }
}
