
/*
 Global Variables
 */
var lstDkSalaries = null;
var lstFfaRankings = null;
var lstQb = null;
var lstRb = null;
var lstWr = null;
var lstTe = null;
var lstFlex = null;
var lstDst = null;
var salaryCap = 50000;
var spentSalary = 0;
var remainingSalary = 50000;
var lineup = [];

/*
 Get JSON Lists
 */
(function() {
    //alert('Draft Kings Projections');
    var dkSalaries = 'data/dkSalaries.json';
    var ffaRankings = "data/ffaRankings.json"
    //var xhr = createCORSRequest('GET', url);
    //xhr.send();
    //var players = "http://api.fantasyomatic.com/v0/players/";
    //var players  = "http://api.fantasy.nfl.com/v1/players/advanced?season=2016";
    $.getJSON( dkSalaries, {
        tags: "name",
        tagmode: "any",
        format: "json"
    })
        .done(function( data ) {
            lstDkSalaries = data;
        });
    $.getJSON( ffaRankings, {
        tags: "name",
        tagmode: "any",
        format: "json"
    })
        .done(function( data ) {
            lstFfaRankings = data;
            removeDups(lstFfaRankings);
        });
    ///////////////////////////////////////////////////////////
    // Create the XHR object.
//    function createCORSRequest(method, url) {
//        var xhr = new XMLHttpRequest();
//        if ("withCredentials" in xhr) {
//            // XHR for Chrome/Firefox/Opera/Safari.
//            xhr.open(method, url, true);
//        } else if (typeof XDomainRequest != "undefined") {
//            // XDomainRequest for IE.
//            xhr = new XDomainRequest();
//            xhr.open(method, url);
//        } else {
//            // CORS not supported.
//            xhr = null;
//        }
//        return xhr;
//    }
////////////////////////////////
//
//        $.ajax({
//            type: 'GET',
//            url:'http://api.fantasyomatic.com/v0/players/',
//            dataType: "jsonp",
//            success: function(arr){
//                var out = "";
//                for(i = 0; i<arr.length; i++) {
//                    mp[arr[i].key] = arr[i].value;
//                }
//            }
//        });
    ///////////////////////////////////////////////////////
    //

})();

/*
 Get Draft Kings Salaries
 */
function getDkSalaries() {
    if(lstDkSalaries != null) {
        $.each( lstDkSalaries, function( index, player ) {
            //$("<div>" + player.Name + "</div>").appendTo("#tdName");
        });
    }
}

/*
 Filter and Display Fantasy Football Analytics Projections with Draft Kings salaries
 */
function displayFfaRankings() {
    if(lstFfaRankings != null) {
        $.each( lstFfaRankings, function( index, player ) {
            if(player.salary == null) {
                player.salary = 0;
            }
            $("<div><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "</div>").appendTo("#tdName");
            $("<div>" + player.salary + "</div>").appendTo("#tdSalary");
            $("<div>" + player.position + "</div>").appendTo("#tdPosition");
            $("<div>" + player.points + "</div>").appendTo("#tdPoints");
            // filter positions
            if(player.playerposition == "QB") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdQbName");
                $("<div>" + player.salary + "</div>").appendTo("#tdQbSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdQbValue");
                $("<div>" + player.position + "</div>").appendTo("#tdQbPosition");
                $("<div>" + player.points + "</div>").appendTo("#tdQbPoints");
                $("<div>" + player.upper + "</div>").appendTo("#tdQbUpper");
                $("<div>" + player.lower + "</div>").appendTo("#tdQbLower");
                $("<div>" + player.risk + "</div>").appendTo("#tdQbRisk");
                $("<div>" + player.dropoff + "</div>").appendTo("#tdQbDropoff");

            }
            if(player.playerposition == "RB") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdRbName");
                $("<div>" + player.salary + "</div>").appendTo("#tdRbSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdRbValue");
                $("<div>" + player.position + "</div>").appendTo("#tdRbPosition");
                $("<div>" + player.points + "</div>").appendTo("#tdRbPoints");
            }
            if(player.playerposition == "WR") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdWrName");
                $("<div>" + player.salary + "</div>").appendTo("#tdWrSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdWrValue");
                $("<div>" + player.position + "</div>").appendTo("#tdWrPosition");
                $("<div>" + player.points + "</div>").appendTo("#tdWrPoints");
            }
            if(player.playerposition == "TE") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdTeName");
                $("<div>" + player.salary + "</div>").appendTo("#tdTeSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdTeValue");
                $("<div>" + player.position + "</div>").appendTo("#tdTePosition");
                $("<div>" + player.points + "</div>").appendTo("#tdTePoints");
            }
            if(player.playerposition == "DST") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playerId + "' value='" + player.playerId + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdDstName");
                $("<div>" + player.salary + "</div>").appendTo("#tdDstSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdDstValue");
                $("<div>" + player.position + "</div>").appendTo("#tdDstPosition");
                $("<div>" + player.points + "</div>").appendTo("#tdDstPoints");
            }
            if(player.playerposition == "K") {
                $("<div title='" + player.gameinfo + "' class='divName'><input type='checkbox' id='" + player.playername + "' value='" + player.playername + "' />" + player.playername + "(" + player.team + ")" + "</div>").appendTo("#tdKName");
                $("<div>" + player.salary + "</div>").appendTo("#tdKSalary");
                $("<div>" + player.playervalue + "</div>").appendTo("#tdKValue");
                $("<div>" + player.position + "</div>").appendTo("#tdKPosition");
                $("<div>" + player.points + "</div>").appendTo("#tdKPoints");
            }
        });
    }
}

/*
 Import DK Salaries into  FFA Projection JSON List
 */
function mergeData() {
    if(lstDkSalaries != null) {
        $.each( lstDkSalaries, function( index, dkPlayer ) {
            if(lstFfaRankings != null) {
                $.each( lstFfaRankings, function( index, ffaPlayer ) {
                    if(ffaPlayer.playername.trim() == dkPlayer.Name.trim() &&
                        ffaPlayer.position == dkPlayer.Position) {
                        ffaPlayer.salary = dkPlayer.Salary;
                        ffaPlayer.gameinfo = dkPlayer.GameInfo;
                    }
                    if (ffaPlayer.playername.toLowerCase().indexOf("terrelle") >= 0 &&
                        dkPlayer.Name.toLowerCase().indexOf("terrelle") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                    if (ffaPlayer.playername.indexOf("Odell") >= 0 &&
                        dkPlayer.Name.indexOf("Odell") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                    if (ffaPlayer.playername.toLowerCase().indexOf("marvin jones") >= 0 &&
                        dkPlayer.Name.toLowerCase().indexOf("marvin jones") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                    if (ffaPlayer.playername.toLowerCase().indexOf("steve smith") >= 0 &&
                        dkPlayer.Name.toLowerCase().indexOf("steve smith") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                    if (ffaPlayer.playername.toLowerCase().indexOf("ted ginn") >= 0 &&
                        dkPlayer.Name.toLowerCase().indexOf("ted ginn") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                    if (ffaPlayer.playername.indexOf("LeVeon Bell") >= 0 &&
                        dkPlayer.Name.indexOf("Le'Veon Bell") >= 0) {
                        ffaPlayer.salary = dkPlayer.Salary;
                    }
                });
            }
        });
    }
    addPlayerValues();
    displayFfaRankings();
    cbStatus();
}

/*
 Event for Checkbox click
 */
function cbStatus() {
    $(":checkbox").change(function() {
        if(this.id == "cbQbUpper") {
            if(this.checked) {
                toggleShow("QbUpper");
            }else if(!this.checked){
                toggleHide("QbUpper");
            }
        }
        if(this.id == "cbQbLower") {
            if(this.checked) {
                toggleShow("QbLower");
            }else if(!this.checked){
                toggleHide("QbLower");
            }
        }
        if(this.id == "cbQbRisk") {
            if(this.checked) {
                toggleShow("QbRisk");
            }else if(!this.checked){
                toggleHide("QbRisk");
            }
        }
        if(this.id == "cbQbDropoff") {
            if(this.checked) {
                toggleShow("QbDropoff");
            }else if(!this.checked){
                toggleHide("QbDropoff");
            }
        }

        if(this.checked) {
            getRemainingSalary(this.valueOf().id, "add");
            //alert(this.valueOf().id);
        }else if(!this.checked){
            getRemainingSalary(this.valueOf().id, "minus");
        }
    });
}

/*
 Add Player Values
 */
// TODO: Calculate undervalued players by subtracting the salary of the next highest projected player of each row.
function addPlayerValues() {
    if(lstFfaRankings != null) {
        var nextPlayer = null;
        var nextSalary = 0;
        var nextIndex;
        var previousIndex;
        $.each( lstFfaRankings, function( indexA, ffaPlayerPrevious ) {
            nextIndex = indexA + 1;
            $.each( lstFfaRankings, function( indexB, ffaPlayerNext ) {
                if(indexB == nextIndex) {
                    ffaPlayerPrevious.playervalue = ffaPlayerPrevious.salary - ffaPlayerNext.salary;
                }
            });
        });
    }
}

/*
 Calculate running total salary
 */
function getRemainingSalary(id, operator) {
    if(lstFfaRankings != null) {
        $.each( lstFfaRankings, function( index, ffaPlayer ) {
            if(operator == "add") {
                if(id == ffaPlayer.playerId) {
                    spentSalary = spentSalary + ffaPlayer.salary;
                    remainingSalary = salaryCap - spentSalary;
                    //alert("Spent Salary:  " + spentSalary + ", Remaining: " + remainingSalary);
                    $("#spnRemainingSalary").html('').append(remainingSalary);
                    // add player to lineup
                    JSON.stringify(addToLineup(ffaPlayer));
                    //$("#spnPlayers").append(ffaPlayer.playername + ", " );
                    $("#spnPlayers").html('');
                    $.each(lineup, function (index, player) {
                        if(index == 0) {
                            $("#spnPlayers").append(player.name);
                        } else {
                            $("#spnPlayers").append(", " + player.name);
                        }
                    })

                }
            } else if(operator == "minus") {
                if(id == ffaPlayer.playerId) {
                    spentSalary = spentSalary - ffaPlayer.salary;
                    remainingSalary = salaryCap - spentSalary;
                    //alert("TotalSalary: " + spentSalary + ", " + "Remaining: " + remainingSalary);
                    $("#spnRemainingSalary").html('').append(remainingSalary);
                    // remove player from lineup
                    $.each(lineup, function (index, player) {
                        if(typeof player === "undefined") {
                            return;
                        }
                        if(player.name == ffaPlayer.playername) {
                            removeFromLineup(index);
                        }
                    })
                    $("#spnPlayers").html('');
                    $.each(lineup, function (index, player) {
                        if(index == 0) {
                            $("#spnPlayers").append(player.name);
                        } else {
                            $("#spnPlayers").append(", " + player.name);
                        }
                    })

                }
            }
        });
    }
}

/*
 Remove duplicate json objects
 */
function removeDups(data) {
    var temp = {};
    for(var i = 0; i < data.length ; i++ ){
        var obj = data[i];
        if(temp[obj.playerId] >= 0){
            data.splice(i, 1);
            i--;
        }
        temp[obj.playerId] = i;
    }
}

/*
 Add player to lineup
 */
function addToLineup(player) {
    var objPlayer = new Object();
    objPlayer.name = player.playername;
    objPlayer.team = player.playerteam;
    lineup.push(objPlayer);
    return lineup;
}

/*
 Remove player from lineup
 */
function removeFromLineup(index) {
    lineup.splice(index,1);
    return lineup;
}

/*
    Hide Column
 */
function toggleHide(id) {
    $('#th' + id).hide();
    $('#td' + id).hide();
}
/*
    Show Column
 */
function toggleShow(id) {
    $('#th' + id).show();
    $('#td' + id).show();
}
