/*=====================================================================================================*/
/* Giving credit where credit is due, The JS is all built off of my original mod of Twily's homepage. */
/* If there are any similarities left, it's probably because it's based on his code.                 */
/*==================================================================================================*/

var $ = function(id) {
  return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY", "SATURDAY"];

/*==============*/
/*== Options ==*/
/*============*/

var CookiePrefix = "taco_stpg_"; //prefix for cookies.
var cmdPrefix = ":"; //prefix for commands.
var ssi = 1; //set default search provider. Use array index of the array below. (Starting with 0)
// Format: [Keyword, Search URL (Search query replaces "{Q}"), "Input placeholder text"]
var searchSources = [
  ["g",        "https://www.google.com/#q={Q}",                          "Google"],
  ["g",        "https://www.google.com/#q={Q}",                          "Google"],
  ["so",       "https://stackoverflow.com/search?q={Q}",                 "Stack Overflow"],
  ["wp",       "http://en.wikipedia.org/w/index.php?search={Q}",         "Wikipedia"],
  ["yt",       "https://www.youtube.com/results?search_query={Q}",       "YouTube"]
];

// Because I care about readability in my JS. kthx.
var svgClover  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m19.9 8.78c1.05-0.611 2.01-1.51 2.42-2.68 0.503-1.41 0.089-3.08-0.98-4.11-0.425-0.381-0.987-0.729-1.58-0.6-0.433 0.083-0.737 0.43-0.942 0.797-0.349-0.648-0.699-1.32-1.29-1.79-0.755-0.616-2-0.446-2.57 0.336-0.911 1.13-1.16 2.65-1.17 4.06 0.039 1.93 0.514 3.88 1.4 5.59 1.7-0.4 3.4-0.76 4.8-1.62z\"/><path d=\"m10.8 8.75c-0.275-1.71-0.664-3.44-1.54-4.94-0.536-0.929-1.29-1.77-2.28-2.23-1.25-0.62-2.86-0.42-3.98 0.43-0.55 0.41-1.04 1.01-1.05 1.72 0.009 0.507 0.366 0.908 0.787 1.14-0.842 0.422-1.77 0.9-2.17 1.8-0.302 0.64-0.05 1.39 0.42 1.86 0.75 0.77 1.81 1.13 2.84 1.32 2.37 0.35 4.81-0.14 6.97-1.1z\"/><path d=\"m9.12 13.5c-1.58 0.447-3.14 1.09-4.46 2.08-0.913 0.694-1.72 1.6-2.04 2.73-0.442 1.45 0.102 3.12 1.26 4.08 0.495 0.399 1.17 0.737 1.81 0.504 0.418-0.127 0.61-0.552 0.833-0.888 0.463 0.773 1.07 1.55 1.95 1.86 0.635 0.238 1.36-0.032 1.78-0.541 0.658-0.787 0.89-1.83 0.968-2.83 0.128-2.48-0.738-4.9-2.02-6.99l-0.06-0.1z\"/><path d=\"m22.8 15.2c-0.885-0.733-2.02-1.1-3.14-1.27-2.14-0.318-4.3 0.091-6.32 0.784 0.158 1.72 0.477 3.46 1.25 5.01 0.549 1.09 1.39 2.1 2.55 2.56 1.45 0.584 3.25 0.204 4.29-0.973 0.329-0.374 0.572-0.896 0.443-1.4-0.092-0.388-0.413-0.646-0.695-0.897 0.922-0.318 1.91-0.825 2.31-1.77 0.3-0.7-0.2-1.5-0.7-2z\"/></svg>";
var svgCode    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z\" /></svg>";
var svgGamepad = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z\" /></svg>";
var svgMore    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z\" /></svg>";
var svgSocial  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgBiliBili   = "<svg style=\"width:24px;height:24px;\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1024 1024\"><path d=\"M988.672 199.36c-40.32-52.608-106.816-77.696-172.928-66.304-57.472 10.176-102.4 46.464-126.08 97.28C585.28 187.52 458.56 186.56 333.504 228.032c-24.96-51.648-71.744-87.552-130.688-96C136.384 122.752 70.72 150.08 32.192 203.968c-39.168 56.256-41.344 128.512-6.016 188.8C52.992 438.4 96.384 467.584 145.216 476.672 144.576 478.656 143.936 480.64 143.36 482.688 141.696 488.576 140.16 494.528 138.752 500.48s-2.688 12.032-3.84 18.112S132.8 530.88 131.968 537.088C131.072 543.232 130.368 549.504 129.792 555.776S128.768 568.384 128.448 574.784C128.128 581.12 128 587.584 128 593.984c0 27.648 2.688 54.592 7.808 80.64 5.12 25.984 12.672 51.136 22.4 75.072 9.664 23.936 21.568 46.656 35.392 67.968 13.824 21.248 29.504 41.152 46.912 59.2 17.344 18.048 36.352 34.432 56.832 48.896 20.416 14.4 42.24 26.752 65.216 36.864s47.104 17.984 72.064 23.296S485.504 993.984 512 993.984s52.416-2.816 77.44-8.128c25.024-5.312 49.088-13.184 72.064-23.296s44.8-22.528 65.28-36.864c20.352-14.464 39.424-30.784 56.832-48.896 17.344-18.048 33.088-37.952 46.784-59.2 13.824-21.312 25.728-44.032 35.456-67.968s17.28-49.088 22.4-75.072C893.312 648.576 896 621.632 896 593.984c0-6.464-0.128-12.864-0.448-19.2-0.32-6.4-0.832-12.736-1.344-19.008s-1.344-12.544-2.176-18.688-1.856-12.352-3.008-18.432-2.368-12.096-3.84-18.112c-1.344-6.016-2.944-11.968-4.544-17.856-0.576-2.112-1.28-4.096-1.856-6.144 50.88-9.408 95.808-40.256 122.112-88.576C1034.24 326.464 1029.696 254.336 988.672 199.36zM944.64 357.312c-16.768 30.784-38.784 55.872-86.72 58.368-17.344 0.896-36.864 13.312-39.872 35.328-1.344 10.048 1.856 27.712 3.072 31.232 1.92 5.824 3.84 11.712 5.504 17.664s3.2 12.032 4.608 18.112 2.624 12.288 3.712 18.496 1.984 12.48 2.688 18.816 1.28 12.736 1.6 19.136 0.576 12.928 0.576 19.52c0 23.68-2.304 46.784-6.656 69.184s-10.816 43.968-19.136 64.512-18.432 40.128-30.272 58.368c-11.84 18.304-25.216 35.328-40.064 50.88-14.784 15.552-31.04 29.632-48.512 41.984s-36.096 23.04-55.68 31.744-40.192 15.488-61.44 20.032C556.672 935.36 534.592 937.728 512 937.728s-44.672-2.368-65.984-6.976c-21.312-4.544-41.92-11.392-61.504-20.032s-38.208-19.392-55.68-31.744S295.168 852.48 280.32 836.928s-28.224-32.576-40-50.88c-11.84-18.24-21.952-37.824-30.272-58.368-8.256-20.544-14.72-42.112-19.136-64.512-4.352-22.4-6.656-45.504-6.656-69.184 0-6.592 0.192-13.056 0.576-19.52s0.96-12.8 1.664-19.136S188.096 542.72 189.184 536.512s2.304-12.416 3.648-18.496 2.944-12.16 4.608-18.112 5.12-24.064 9.408-36.224C215.36 439.488 201.024 416 174.016 416.64 123.264 417.792 99.136 390.656 81.408 360.384c-17.664-30.208-26.24-77.44 3.008-119.552 24.448-34.048 66.688-51.84 109.376-45.44 41.728 5.952 74.56 32.896 88.512 71.68 9.664 26.88 47.04 16.384 49.728 14.272 126.592-46.336 255.744-45.184 356.672 3.136C704 292.032 732.992 294.016 740.736 270.656c12.992-39.168 44.544-67.264 86.144-74.56 42.496-7.744 85.248 8.64 110.784 41.856C968.32 279.04 961.344 326.592 944.64 357.312z\" /></svg>"

/* Header Format: ["(Label)", "(Accent Color)", "-HEAD-"],
*   - The labels are setup for 24px SVGs. by default they are separated from the linkMenu for readability.
*   - Accent color can be: black, white, blue, green, cyan, red, magenta, and yellow. by default, the accent color is white.
*   - ALL categories need a header to start them. Headers are signified by the -HEAD- in the 3rd position.
* Link Format: ["Name", "URL",""],
*   - Name and URL are pretty self explanitory.
*   - 3rd position may be used in the future, but right now it's not used and can be left blank.
*/
// Also yes I could totally use a json object to represent the menus, but I didn't feel like reprogramming the whole script. Probably doing that next site, though.
var linkMenu = [
  [svgBiliBili,                   "blue",                                        "-HEAD-"], // Anime
  ["BiliBili",                 "https://www.bilibili.com/",""],
  ["Pixiv",                    "https://www.pixiv.net",""],
  ["Nicovideo",                "https://www.nicovideo.jp/",""],
  ["Anime1",                   "https://anime1.me/",""],

  [svgSocial,                  "green",                                       "-HEAD-"], // Media
  ["YouTube",                  "https://www.youtube.com/",""],
  ["Facebook",                 "https://www.facebook.com/",""],
  ["Reddit",                   "https://www.reddit.com/",""],
  ["Twitch",                   "https://www.twitch.tv/",""],
  ["DeviantArt",               "https://www.deviantart.com/",""],

  [svgClover,                  "cyan",                                        "-HEAD-"], // 4chan
  ["/a/ Anime & Manga",        "https://boards.4channel.org/a/",""],
  ["/g/ Technology",           "https://boards.4channel.org/g/",""],
  ["/w/ Anime/Wallpapers",     "https://boards.4channel.org/w/",""],
  ["/wg/ Wallpaper/General",   "https://boards.4channel.org/wg/",""],

  [svgCode,                    "red",                                         "-HEAD-"], // Code Stuff
  ["GitHub",                   "https://github.com",""],
  ["Gist",                     "https://gist.github.com/",""],
  ["JSFiddle",                 "https://jsfiddle.net/",""],
  ["Stack Overflow",           "https://stackoverflow.com/",""],

  [svgGamepad,                 "magenta",                                     "-HEAD-"], // Gaming
  ["Steam",                    "https://store.steampowered.com/",""],
  ["Humble Bundle",            "https://www.humblebundle.com/",""],
  ["GOG.com",                  "https://www.gog.com/",""],
  ["/r/gaming",                "",""],

  [svgMore,                    "yellow",                                      "-HEAD-"], // Other
  ["Gmail",                    "https://www.google.com/gmail/",""],
  ["Amazon",                   "https://www.amazon.com/",""],
  ["Dropbox",                  "https://www.dropbox.com/",""],
  ["Netflix",                  "https://www.netflix.com/",""],
  ["Weather",                  "https://weather.com/",""],
];
// DID I FORGET TO MENTION?! THE DEMO LINKS DO NOTHING!

/*==================*/
/*== Main Script ==*/
/*================*/

//core element vars
var searchInput = $('searchBar');
var rootSearchHelp = $('searchHelpMenu');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
  initSearchBar();
  buildDate();
  buildHelp();
  buildMenu();
  $('body').style.opacity = 1;
  $('mainContainer').style.opacity = 1;
  $('dateContainer').style.opacity = 1;
  $('notesWidget').style.opacity = 1;
}

function initSearchBar() {
  if (searchSources[ssi] !== undefined)
    searchInput.placeholder = searchSources[ssi][2];
  else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }

  document.addEventListener('keydown', function(event) { handleKeydown(event); });

  searchInput.value = "";
}

function buildDate() {
  var today = new Date();
  dateDiv.innerHTML = "<font class=\"font-3em\">" +
                      monthNames[today.getMonth()] +
                      " " +
                      today.getDate() +
                      "</font><br><font>" +
                      dayNames[today.getDay()] +
                      ", " +
                      today.getFullYear() +
                      "</font>";
}

function buildHelp() {
  var newHelp = "";

  console.log(searchSources[0][0]);
  console.log(searchSources[0][2]);

  for (var i = 1; i < searchSources.length; i++) {
    console.log(searchSources[i][0]);
    console.log(searchSources[i][2]);

    //Will add google logo support when I'm not lazy
    newHelp+= "<li><span>" + searchSources[i][0] + "</span> "+ searchSources[i][2] + "</li>";
  }

  rootSearchHelp.innerHTML = newHelp;
}

function buildMenu() {
  var newMenu = "";

  if(linkMenu[0][2] === "-HEAD-")
    newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[0][1] !== "" ? linkMenu[0][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
  else {
    alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
    return;
  }

  for (var i = 1; i < linkMenu.length; i++)
    if (linkMenu[i][2] === "-HEAD-")
      newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + (linkMenu[i][1] !== "" ? linkMenu[i][1].toLowerCase() : "white") + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    else
      newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
  newMenu += "</ul></div></div></li>";

  rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if(query !== "") {
    var qlist;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            break;
          }
        }
        if (qList.length > 1) {
          window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
        } else {
          searchInput.placeholder = searchSources[ssi][2];
          searchInput.value = "";
        }
      } else {
        window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
      }
    }
  }
  if (key === 27) {
    searchInput.blur();
  }
}

function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) notesTextarea.blur();
}

var noteText = null;
function handleNotes(event, focus){
  if (focus) {
    if(!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if(noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}

var ignoredKeys = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
function handleKeydown(event) {
  if (notesInput === document.activeElement ||
     searchInput === document.activeElement ||
     ignoredKeys.includes(event.keyCode))
    return;

  searchInput.focus();
}

function addClass(elementID, className) {
  $(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
      console.log(e);
    }
    return null;
}
function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}
function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}
function DelCookie(name) {
    document.cookie = CookiePrefix + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}