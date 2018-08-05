/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

    The MIT License (MIT)

    Copyright (c) 2007-2018 Einar Lielmanis, Liam Newman, and contributors.

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/


function Directives(start_block_pattern, end_block_pattern) {
  start_block_pattern = typeof start_block_pattern === 'string' ? start_block_pattern : start_block_pattern.source;
  end_block_pattern = typeof end_block_pattern === 'string' ? end_block_pattern : end_block_pattern.source;
  var directives_block_pattern = new RegExp(start_block_pattern + / beautify( \w+[:]\w+)+ /.source + end_block_pattern, 'g');
  var directive_pattern = / (\w+)[:](\w+)/g;

  var directives_end_ignore_pattern = new RegExp('(?:[\\s\\S]*?)((?:' + start_block_pattern + /\sbeautify\signore:end\s/.source + end_block_pattern + ')|$)', 'g');

  this.get_directives = function(text) {
    if (!text.match(directives_block_pattern)) {
      return null;
    }

    var directives = {};
    directive_pattern.lastIndex = 0;
    var directive_match = directive_pattern.exec(text);

    while (directive_match) {
      directives[directive_match[1]] = directive_match[2];
      directive_match = directive_pattern.exec(text);
    }

    return directives;
  };

  this.readIgnored = function(input) {
    return input.readWhile(directives_end_ignore_pattern);

  };
}


module.exports.Directives = Directives;