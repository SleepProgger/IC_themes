// ==UserScript==
// @name         Imgur Community Theme Injector
// @namespace    IC Change
// @version      0.7a
// @description  Changes theme on Discourse IC
// @author       MartynMage, SleepProgger
// @include      http://community.imgur.com/*
// @include      https://community.imgur.com/*
// @run-at       document-end
// @grant        Nothing!
// ==/UserScript==

var css_file = "https://rawgit.com/SleepProgger/IC_themes/master/dark_theme.css";

var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", css_file);
document.getElementsByTagName("head")[0].appendChild(fileref);
