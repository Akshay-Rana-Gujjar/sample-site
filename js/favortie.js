
//open advanced search
function openAdvancedSearch() {
    $("#divSearchAdvanced").slideToggle();
    //$("#arrowCantwtFind").hide();
    //$("#linkCantwtFind").hide();
    $("#divSearchStandard").slideToggle();
}

//Favorites
//open advanced search
function openFavorites() {
    if ($(".divAllHomPageFavorites").position().top == "0") {
        $(".divAllHomPageFavorites").animate({ top: "-200px" }).click(function () {});
    }
    else {
        if (($(".divAllHomPageFavorites").position().top) == ($('body').scrollTop()))
            $(".divAllHomPageFavorites").animate({ top: "-200px" }).click(function () { });
        else
            $(".divAllHomPageFavorites").animate({ top: "0px" }).click(function () { });
    }
}

//close advanced search
function closeFavorites() {
    if (($(".divAllHomPageFavorites").position().top) == ($('body').scrollTop()))
        $(".divAllHomPageFavorites").animate({ top: "-200px" }).click(function () { });
}

function moveFavoritesLeft() {
    $("#divFavoriteItams").animate({ left: '+=288' });
}

function moveFavoritesRight() {
    $("#divFavoriteItams").animate({ left: '-=288' });
}

function addToFavorites(id, name, img, area) {
    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/AddToFavorites",
        data: JSON.stringify({ "id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        if (result.d == true) {
            document.getElementById("profileFavoritesuser_" + id).className = "profileIsFavorites";
            document.getElementById("userFavoritesTotlaList").textContent = (parseInt(document.getElementById("userFavoritesTotlaList").textContent)) + 1;
            document.getElementById("personFavoriteNo_" + id).textContent = (parseInt(document.getElementById("personFavoriteNo_" + id).textContent)) + 1;


            //if is the first add Favorites
            var divFavoriteContiner = document.getElementById("divFavoriteItams");
            if (divFavoriteContiner.getElementsByTagName("div").length == 0) {
                $(".divAllHomPageFavorites").animate({ top: "0px" }).click(function () { });
            }

            //Add element to Favorites
            addChildElements(id, name, img, area);

        }
        else {
            removeToFavorites(id);
        }
    }
}

function removeToFavorites(id) {
    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/removeToFavorites",
        data: JSON.stringify({ "id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        if (result.d == true) {
            if (document.getElementById("profileFavoritesuser_" + id) != null)
                document.getElementById("profileFavoritesuser_" + id).className = "profileFavorites";
            if (document.getElementById("userFavoritesTotlaList") != null)
                document.getElementById("userFavoritesTotlaList").textContent = (parseInt(document.getElementById("userFavoritesTotlaList").textContent)) - 1;
            if (document.getElementById("personFavoriteNo_" + id) != null)
                document.getElementById("personFavoriteNo_" + id).textContent = (parseInt(document.getElementById("personFavoriteNo_" + id).textContent)) - 1;

            //remove element to Favorites
            removeChildElements(id);

            //if remove the last Favorites
            var divFavoriteContiner = document.getElementById("divFavoriteItams");
            if (divFavoriteContiner.getElementsByTagName("div").length == 0) {
                $(".divAllHomPageFavorites").hide();
                $(".divAllHomPageFavorites").css('top', '-220px');
            }
        }
    }
}

function addToFavoritesToSession(id, name, img, area) {
    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/addToFavoritesToSession",
        data: JSON.stringify({ "id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        //alert(result.d + " :: " + img);
        if (result.d == true) {
            
            var sPath = window.location.pathname;
            var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
            if(sPage != "Profile.aspx")
                document.getElementById("profileFavoritesuser_" + id).className = "profileIsFavorites";
            //document.getElementById("userFavoritesTotlaList").textContent = (parseInt(document.getElementById("userFavoritesTotlaList").textContent)) + 1;
            document.getElementById("personFavoriteNo_" + id).textContent = (parseInt(document.getElementById("personFavoriteNo_" + id).textContent)) + 1;
            
            //if is the first add Favorites
            var divFavoriteContiner = document.getElementById("divFavoriteItams");
            if (divFavoriteContiner.getElementsByTagName("div").length == 0) {
                $(".divAllHomPageFavorites").animate({ top: "0px" }).click(function () {});
            }

            //Add element to Favorites
            addChildElementsToSession(id, name, img, area);
        }
        else
        {
            removeToFavoritesToSession(id);
        }
    }
}

function removeToFavoritesToSession(id) {
    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/removeToFavoritesToSession",
        data: JSON.stringify({ "id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {

        if (result.d == true) {
            var sPath = window.location.pathname;
            var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

            if (sPage != "Profile.aspx") {
                if (document.getElementById("profileFavoritesuser_" + id) != null)
                    document.getElementById("profileFavoritesuser_" + id).className = "profileFavorites";
            }
            if (document.getElementById("userFavoritesTotlaList") != null)
                document.getElementById("userFavoritesTotlaList").textContent = (parseInt(document.getElementById("userFavoritesTotlaList").textContent)) - 1;
            if (document.getElementById("personFavoriteNo_" + id) != null)
                document.getElementById("personFavoriteNo_" + id).textContent = (parseInt(document.getElementById("personFavoriteNo_" + id).textContent)) - 1;

            //remove element to Favorites
            removeChildElements(id);

            //if remove the last Favorites
            var divFavoriteContiner = document.getElementById("divFavoriteItams");
            if (divFavoriteContiner.getElementsByTagName("div").length == 0)
                $(".divAllHomPageFavorites").animate({ top: "-220px" }).click(function () {
                    qc_open = true;
                });
        }
    }
}

function addChildElements(id, name, img, area) {

    var htmlString = "";  //  Content to be added to new div
    //  GENERATE LITTLE SPARK BOX
    htmlString += "<div class='divFavoriteItameClose' onclick=\"javascript:removeToFavorites('" + id + "');\" title='Remove form favorite' /></div>" +
                   "<table cellspacing='0' cellpadding='0' border='0' style='width: 100%;'>" +
                   "<tr><td><a title='" + name + "' href='Profile.aspx?id=" + id + "&name=" + name + "'>" +
                   "<div class='divUserImg'><img class='userImg' ";

    if (img.length > 0) {
        if (img.toLowerCase().indexOf("http://graph.facebook.com/") !== -1)
            htmlString += " src='" + img + "'";
        else
            htmlString += " src='admin/App_Upload/_thumbs/" + img + "'";
    }
    else
        htmlString += " src='images/avatar.png'";

    htmlString += " /></div></a></td></tr>" +
                  "<tr><td style='text-align:left;'><a href='Profile.aspx?id= " + id + "&name=" + name + "'>" + name + "</a></td></tr><tr><td style='text-align:left;'><b style='font-size:9px;'>" + area + "</b></td></tr></table>";
    //alert(htmlString);
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "divFavorite_" + id);
    newdiv.setAttribute("class", "divFavoriteItame");
    //alert("0");
    newdiv.innerHTML = htmlString;  //append text to new div
    //add itame to continner
    document.getElementById("divFavoriteItams").appendChild(newdiv); //append new div to another 
}

function addChildElementsToSession(id, name, img, area) {
    var htmlString = "";  //  Content to be added to new div
    //  GENERATE LITTLE SPARK BOX
    htmlString += "<div class='divFavoriteItameClose' onclick=\"javascript:removeToFavoritesToSession('" + id + "');\" title='Remove form favorite' /></div>" +
                  "<table cellspacing='0' cellpadding='0' border='0' style='width: 100%;'>" +
                  "<tr><td><a title='" + name + "' href='Profile.aspx?id=" + id + "&name=" + name + "'>" +
                  "<div class='divUserImg'><img class='userImg' ";
    
    if (img.length > 0) {
        if (img.toLowerCase().indexOf("http://graph.facebook.com/") !== -1)
            htmlString += " src='" + img + "'";
        else
            htmlString += " src='admin/App_Upload/_thumbs/" + img + "'";
    }
    else
        htmlString += " src='images/avatar.png'";
   
    htmlString += " /></div></a></td></tr>" +
                  "<tr><td style='text-align:left;'><a href='Profile.aspx?id= " + id + "&name=" + name + "'>" + name + "</a></td></tr><tr><td style='text-align:left;'><b style='font-size:9px;'>" + area + "</b></td></tr></table>";
    
    //alert(htmlString);
    var newdiv = document.createElement("div");
    newdiv.setAttribute("id", "divFavorite_" + id);
    newdiv.setAttribute("class", "divFavoriteItame");
    //alert("0");
    newdiv.innerHTML = htmlString;  //append text to new div
    //add itame to continner
    document.getElementById("divFavoriteItams").appendChild(newdiv); //append new div to another 
}

function removeChildElements(id) {
   
    var olddiv = document.getElementById("divFavorite_" + id);
    //remove itame to continner
    document.getElementById("divFavoriteItams").removeChild(olddiv); //append new div to another 

    //if is Favorites page
    if ($('#divLoginFavorites') != null) {
        $('#divFavorite_' + id).remove();
    }
}

//Banners
function openBanner(id, url) {

    if (url.toLowerCase().indexOf("http://") != 0)
        url = "http://" + url;

    //alert(id + "," + url);

    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/addClickCountToBanner",
        data: JSON.stringify({ "id": id }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        
        if (result.d == true) {
            return true;
        }
        else
            return false;
    }
}

//Banners
function GetCompletionAreaList(prefixText) {

    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/GetCompletionAreaList",
        data: JSON.stringify({ "prefixText": prefixText }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        var htmlString = "";
        var split = "";
        if (result.d.length > 0) {
            for (var i = 0; i < result.d.length; i++) {
                split = result.d[i].split("#");
                htmlString += "<div class='pac-item' onclick='javascript:selectedAreaClick($(this));' >" +
                          "<span class='pac-icon pac-icon-marker'></span>" +
                          "<span class='pac-item-query' data-areaId='" + split[0] + "'>" + split[1] + "</span>" +
                          "</div>";
            }
            $(".pac-container").empty();
            $(".pac-container").append(htmlString);   //append new div to another
            $(".pac-container").show(); 
        }
        else {
            $(".pac-container").empty();

        }

    }
}

function GetCompletionAreaListAdvanced(prefixText) {

    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/GetCompletionAreaList",
        data: JSON.stringify({ "prefixText": prefixText }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        var htmlString = "";
        var split = "";
        if (result.d.length > 0) {
            for (var i = 0; i < result.d.length; i++) {
                split = result.d[i].split("#");
                htmlString += "<div class='pac-item' onclick='javascript:selectedAreaClickAdvanced($(this));' >" +
                          "<span class='pac-icon pac-icon-marker'></span>" +
                          "<span class='pac-item-query' data-areaId='" + split[0] + "' >" + split[1] + "</span>" +
                          "</div>";
            }
            $(".pac-container").empty();
            $(".pac-container").append(htmlString);   //append new div to another
            $(".pac-container").show();
        }
        else {
            $(".pac-container").empty();

        }

    }
}


function sendEmailToAdminOfSpamer(fid, tid) {

    $.ajax({
        type: "POST",
        url: "WebServiceFavorites.asmx/sendEmailToAdminOfSpamer",
        data: JSON.stringify({ "fid": fid, "tid": tid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AjaxSucceeded
    });
    //success
    function AjaxSucceeded(result) {
        if (result.d) {
            alert("Reported Spam");
        }
    }
}
