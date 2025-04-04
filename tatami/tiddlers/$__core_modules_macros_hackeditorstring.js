(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Export name and synchronous status
exports.name = "hackeditstring";
exports.after = ["load-modules"];
exports.synchronous = true;

exports.startup = function() {
    if ($tw.browser) {

        var isMobile = (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera)) 

        var fileTypes = [

          "$:/config/EditorTypeMappings/application/javascript",
          "$:/config/EditorTypeMappings/application/json",
          "$:/config/EditorTypeMappings/application/x-tiddler-dictionary",
          "$:/config/EditorTypeMappings/text/css",
          "$:/config/EditorTypeMappings/text/asciidoc",
          "$:/config/EditorTypeMappings/text/html",
          "$:/config/EditorTypeMappings/text/plain",
          "$:/config/EditorTypeMappings/text/vnd.tiddlywiki",
          "$:/config/EditorTypeMappings/text/x-fountain",
          "$:/config/EditorTypeMappings/text/x-markdown",
          "$:/config/EditorTypeMappings/text/x-tiddlywiki"

        ]

        fileTypes.forEach(
          function(fileType) {
            console.log('type', fileType)
            $tw.wiki.setText(fileType, "text", null, 
              isMobile ? 
              "text" : "codemirror"
            );
          }
        )
    }
}

})()
