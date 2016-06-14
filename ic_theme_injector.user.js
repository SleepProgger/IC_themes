// ==UserScript==
// @name         Imgur Community Theme Injector
// @namespace    IC Change
// @version      0.9a
// @description  Changes theme on Discourse IC
// @author       MartynMage, SleepProgger
// @include      http://community.imgur.com/*
// @include      https://community.imgur.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

var default_css = "https://rawgit.com/SleepProgger/IC_themes/master/dark_theme.css";

if (typeof GM_getValue == 'undefined') {
  GM_getValue = function(name, defaultValue) {
    var value = localStorage[name];
    return value == null ? defaultValue : JSON.parse(value);
  }
}
if (typeof GM_setValue == 'undefined') {
  GM_setValue = function(name, value) {
    localStorage[name] = JSON.stringify(value);
  }
}

var css_file = GM_getValue('custom_css_url') || default_css;
var fileref=document.createElement("link");
fileref.setAttribute("rel", "stylesheet");
fileref.setAttribute("type", "text/css");
fileref.setAttribute("href", css_file);
document.getElementsByTagName("head")[0].appendChild(fileref);

// inject the theme selection into the settings page.
// This event is deprecated but i am to lazy to figure out how to do this properly.
// Someone ?
Discourse.PageTracker.current().on('change', function(url){
  if( ! url.match(/\/users\/[^\/]+\/preferences/) ) return;
  var txt_theme = $('.pref-theme');
  if(txt_theme.length == 0){
   // Ugly chunk, but who cares ?
   txt_theme = $('<div class="control-group pref-theme"><label class="control-label">Custom theme </label><div class="controls"><input class="ember-text-field" type="text" /><span class="btn">Update</span></div></div>').insertAfter($('.pref-avatar'));
   txt_theme.find('.btn').click(function(){
     GM_setValue('custom_css_url', txt_theme.find('input').val());
     window.location.reload();
   });
  }
  txt_theme.find('input').val(GM_getValue('custom_css_url') || default_css);
});
