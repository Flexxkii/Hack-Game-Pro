// ==UserScript==
// @name         Hack Game Pro
// @namespace    http://tampermonkey.net/
// @version      0.4.2
// @updateURL    https://github.com/Flexxkii/Hack-Game-Pro/raw/main/Hack%20Game%20-%20Medal%20of%20Honor%20progress%20bar.user.js
// @description  Displays a progress bar in your profile to see how far you are until unlocking the medal of honor award.
// @author       Goku @ https://hackforums.net/member.php?action=profile&uid=2451258
// @match        https://hackforums.net/gamecp.php*
// @require      http://code.jquery.com/jquery-3.x-git.min.js
// @resource     customCSS   https://raw.githubusercontent.com/Flexxkii/Hack-Game-Pro/main/style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

// Adding External CSS Stylesheet
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);


$(document).ready(function(){
    // This is the block it's going too append
    var obj_block =
        `<div style="border-top: 1px solid #212121; padding: 4px;">
          <div id="progress-bar-honor" class="all-rounded game-progress-bar-1" title="Level Progress: 18.83%">
           <div id="progress-bar-percentage_t" class="all-rounded">
           </div>
          </div>
          <div style="margin-left: 5px;">
           <span class="tinytext tinytext_t"></span>
          </div>
         </div>`;
    // Where it's going to append too
    var obj = $(".game-profile-player:not('.gdark')");
    // Appending
    $(obj).append(obj_block);

    // Selecting cloned tinytext
    var tinytext = $('.tinytext_t');
    // Selecting original tinytext
    var tinytext_text = $('.tinytext').text();
    // Selecting earned xp splitting it by '/'
    var currentxp = tinytext_text.split("/");

    // Calculates the percentage of the total for the 250.000 xp milestone
    var width_calc = 100/250000 * parseFloat(currentxp[0].replace(/,/g, ''));
    // Rounds it by two decimals.
    var width_calc_round = width_calc.toFixed(2);

    // alculates the percentage of the total for the next level milestone
    var width_calc_nl = 100 / parseFloat(currentxp[1].replace(/,/g, '')) * parseFloat(currentxp[0].replace(/,/g, ''));
    // Rounds it by two decimals.
    var width_calc_nl_round = width_calc_nl.toFixed(2);
    // Selects the cloned progressbar
    var progress_bar = $('#progress-bar-percentage_t');

    // Correct width cloned progressbar
    progress_bar.width(width_calc_round+"%");
    // Displays current xp / milestone | percentage for 250.000 xp
    $(tinytext).text(currentxp[0]+' / 250,000 xp | '+width_calc_round+"%");
    // Displays current xp / milestone | percentage for the next level milestone
    $(".tinytext:not('.tinytext_t')").text(currentxp[0]+' / '+currentxp[1]+ ' | '+width_calc_nl_round+"%");

    // Get battery percentage
    var battery = $(".hficon-battery-100").parent();
    var battery_title = $(".hficon-battery-100").parent().attr('title');
    // Add percentage text before the battery icoon
    $(battery).prepend(`<span style='font-size: .5em; padding-right: 1em;'> ${battery_title} </span>`);
});