// ==UserScript==
// @name         Hack Game Pro
// @namespace    http://tampermonkey.net/
// @version      0.4.4.1
// @updateURL    https://github.com/Flexxkii/Hack-Game-Pro/raw/main/Hack%20Game%20-%20Medal%20of%20Honor%20progress%20bar.user.js
// @description  Adds a ton of features to the Hacking game on HF
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

    function milestone() {
        // This is the block it's going too append
        var obj_block =
            `<div style="border-top: 1px solid #212121; padding: 4px;">
              <div id="progress-bar-honor" class="all-rounded game-progress-bar-1" title="">
               <div id="progress-bar-percentage_t" class="all-rounded">
               </div>
              </div>
              <div style="margin-left: 5px;">
               <span class="tinytext tinytext_t"></span>
              </div>
             </div>`;
        // Appending location
        var obj = $(".game-profile-player:not('.gdark')");
        // Appending
        $(obj).append(obj_block);
        // Selecting cloned progressbar
        var clonedprogressbar = $('#progress-bar-honor');
        // Selecting cloned progressbar title
        var clonedprogressbar_title = clonedprogressbar.attr('title');
        // Selecting cloned tinytext
        var tinytext = $('.tinytext_t');
        // Selecting original tinytext
        var tinytext_text = $('.game-profile-player > div > div > .tinytext').text();
        // Selecting earned xp splitting it by '/'
        var currentxp = tinytext_text.split("/");
        // selects current xp
        var currentxp_arr = currentxp[0];
        // Current xp formatted
        var currentxp_arr_format = currentxp_arr.replace(/,/g, '');
        // Selecting current level
        var currentlevel = $('#game_content_currentpage > tr:nth-child(2) > td > .gtable > .gtr:nth-child(2) > .tcenter');
        // Splitting level string
        var currentlevel_lvl = $(currentlevel[0]).text().split(":");
        // Selects current level
        var currentlevel_lvl_arr = currentlevel_lvl[1];
        // calculates total xp earned
        var totalxpcalc = Math.pow(currentlevel_lvl_arr, 2) * 100;
        // Calculates total xp earned plus current xp
        var totalxplevel = Number(totalxpcalc)+Number(currentxp_arr_format);
        // Total xp formatted
        var totalxplevel_format = Intl.NumberFormat().format(totalxplevel);
        // Calculates the percentage of the total for the 250.000 xp milestone
        var width_calc = 100/250000 * parseFloat(totalxplevel);
        // Rounds it by two decimals.
        var width_calc_round = width_calc.toFixed(2);
        // Calculates the percentage of the total for the next level milestone
        var width_calc_nl = 100 / parseFloat(currentxp[1].replace(/,/g, '')) * parseFloat(currentxp_arr.replace(/,/g, ''));
        // Rounds it by two decimals.
        var width_calc_nl_round = width_calc_nl.toFixed(2);
        // Selects the cloned progressbar
        var progress_bar = $('#progress-bar-percentage_t');
        console.log(totalxplevel_format);

        // Correct width cloned progressbar
        progress_bar.width(width_calc_round+"%");
        // Displays level progress percentage
        clonedprogressbar.attr('title', `Level Progress: ${width_calc_round}%`);
        // Displays current xp / milestone | percentage for 250.000 xp
        $(tinytext).text(`${totalxplevel_format} / 250,000 xp | ${width_calc_round}%`);
        // Displays current xp / milestone | percentage for the next level milestone
        $(".tinytext:not('.tinytext_t')").text(`${currentxp_arr} / ${currentxp[1]} | ${width_calc_nl_round}%`);
    }

    function batterypercentage() {
        // Get battery percentage
        var battery = $(".game-top-right-icons > a:last-of-type i").parent();
        // Get title
        var battery_title = $(".game-top-right-icons > a:last-of-type").attr('title');
        // Add percentage text before the battery icoon
        $(battery).prepend(`<span style='font-size: .5em; padding-right: 1em;'> ${battery_title} </span>`);
    }

    // Keyboard events listenera
    document.addEventListener('keypress', logKey);

    // Button presses function
    function logKey(e) {
        // if 'z' is pressed
        if (e.code === "KeyZ") {
            $('#job_id_22').click();
        }
        // If 'x' is pressed
        if (e.code === "KeyX") {
            // clicks 'attempt hacking'
            $('button.button.game-button-smallhacks').click();
            // clicks 'new contract'
            $('button.contract_button.game-button-missions').click();
        }
        // if 'a' is pressed
        if (e.code === "KeyA") {
            // clicks your profile
            $('.hficon-user').click();
        }
        // if 's' is pressed
        if (e.code === "KeyS") {
            // clicks the store
            $('.hficon-store').click();
        }
        // if '1' is pressed
        if (e.code === "Digit1") {
            // Goes to Opsec
            $('.game_nav_content_system_container').children()[0].click();
        }
        // if '2' is pressed
        if (e.code === "Digit2") {
            // Goes to Cloud drive
            $('.game_nav_content_system_container').children()[1].click();
        }
        // if '3' is pressed
        if (e.code === "Digit3") {
            // Goes to Small hacks jobs
            $('.game_nav_content_system_container').children()[2].click();
        }
        // if '4' is pressed
        if (e.code === "Digit4") {
            // Goes to PC hack
            $('.game_nav_content_system_container').children()[3].click();
        }
        // if '5' is pressed
        if (e.code === "Digit5") {
            // Goes to Server hack
            $('.game_nav_content_system_container').children()[4].click();
        }
        // if '6' is pressed
        if (e.code === "Digit6") {
            // Goes to Missions
            $('.game_nav_content_system_container').children()[5].click();
        }
    }

    batterypercentage();
    milestone();

});