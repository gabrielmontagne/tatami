/*\
title: $:/plugins/tobibeer/youtube/macros/yt.js
type: application/javascript
module-type: macro

Embeds a YouTube video with a specified start and end time...
Usage: <<yt id:"video-id" start:"01:23:45" end:"01:24:59" link:full width:300 height:240>>

link:<no> => player only
link:full => only link as video url
link:time => only link as time
\*/

(function(){

"use strict";

exports.name = "yt";

exports.params = [
	{ name: "id" },
	{ name: "start" },
	{ name: "end" },
	{ name: "title" },
	{ name: "link" },
	{ name: "width" },
	{ name: "height" }
];

exports.run = function(id, start, end, title, link, width, height) {
	var aLnk, aVid, href, src, t0, t1,
		video = this.getVariable("yt-video"),
		prefix =  this.getVariable("yt-prefix"),
		ytID = this.getVariable("yt-id") || "",
		time = function(t,hms) {
			var h=0,m=0,s=0,
				out = true;
			if(!t) return "";

			t = t.split(":");
			$tw.utils.each(t, function(v,i) {
				t[i] = parseInt(v);
				out = out && !isNaN(t[i]);
			});

			if(out){
				s = t[0];
				if(3 === t.length) {
					h = t[0];
					m = t[1];
					s = t[2];
				} else
				if(2 === t.length) {
					m = t[0];
					s = t[1];
				}
				if(undefined == hms) {
					out =
						$tw.utils.pad(h) + ':' +
						$tw.utils.pad(m) + ':' +
						$tw.utils.pad(s);
				} else {
					out = true == hms ?
						'' + h + 'h' + m + 'm' + s + 's' :
						h*60*60 + m*60 + s;
				}
			} else {
				out = "";
			}
			return out;
		}
	width = width || "640";
	height = height || "360";

	start = start || this.getVariable("yt-start");
	end = end || this.getVariable("yt-end");

	t0 = time(start, true);
	href = "http://www.youtube.com/watch?v=" + id +
		(t0 ? "&t=" + t0 : "");

	t0 = time(start, id);
	t1 = time(end, id);

	if(!id) {
		if(!video || !start) return "";
		return (prefix ?
				(prefix + " — ") :
				('$:/yt/' + ytID + "/")
			) + start + ( end ? (prefix ? " - " : "-") + end : "");
	}

	src = "http://www.youtube.com/embed/" + id + "?" + 
		(t0 ? "start=" + t0 : "") +
		(t0 && t1 ? "&end=" + t1 : "" );

	aLnk = [
		"<a href='", href, "' target=_blank>",
		title ? title : start + " - " + end,
		"</a>"].join("");
	aVid = [
		"<a href='", href, "' target=_blank>",
		title ? title : href, "</a>"].join("");

	return link && link!="time" && link!="no" ?
		("full" == link ? aVid : aLnk) :
		[
			"<iframe width=",width,
			" height=",height,
			" src='", src,
			"&autoplay=0&rel=0' frameborder=0 allowfullscreen></iframe>",
			("time" === link ? aLnk : "no" === link ? "" : aVid)
		].join("");
};

})();