// ==UserScript==
// @name         Hack Game - Medal of Honor progress bar
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Displays a progress bar in your profile to see how far you are until unlocking the medal of honor award.
// @author       Goku @ https://hackforums.net/member.php?action=profile&uid=2451258
// @match        https://hackforums.net/gamecp.php?action=profile*
// @require      http://code.jquery.com/jquery-3.x-git.min.js
// @grant        none
// ==/UserScript==

$(document).ready(function(){
    // This is the block it's going too append
    var obj_block =
        `<div style="border-top: 1px solid #212121; padding: 4px;">
          <div id="progress-bar" class="all-rounded game-progress-bar-1" style="width: 100%; box-shadow: inset 0px 0px 3px 1px #9090901c; background: #101010;" title="Level Progress: 18.83%">
           <div id="progress-bar-percentage_t" class="all-rounded" style="background: #f1c40f; padding: 5px 0px; color: #FFF; text-align: center; height: 1px; transition: 0.1s; background-color: #f1c40f; box-shadow: inset 0px 0px 3px 1px #ffffff12; border: 1px solid #292929;">
           </div>
          </div>
          <div style="margin-left: 5px;">
           <span class="tinytext tinytext_t"></span>
          </div>
         </div>`;
    // Where it's going to append too
    var obj = $('.game-profile-player');
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
});