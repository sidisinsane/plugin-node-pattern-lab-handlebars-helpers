'use strict';

function registerHelpers(patternlab, Handlebars) {
    /**
     * @example
     * {{ slugify 'I am a title' }}
     *
     * @returns {string} 'i-am-a-title'
     */
    Handlebars.registerHelper('slugify', function(str) {
        /*
         * Copyright (c) 2014 Jon Schlinkert
         * Licensed under the MIT license.
         *
         * The code for slugifying was sourced from underscore.string:
         * https://github.com/epeli/underscore.string
         */

        var nativeTrim = String.prototype.trim;

        var escapeRegExp = function (str) {
            if (str == null) {
                return '';
            }
            return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
        };

        var defaultToWhiteSpace = function (characters) {
            if (characters == null) {
                return '\\s';
            } else if (characters.source) {
                return characters.source;
            } else {
                return '[' + escapeRegExp(characters) + ']';
            }
        };

        var trim = function (str, characters) {
            if (str == null) {return ''; }
            if (!characters && nativeTrim) {
                return nativeTrim.call(str);
            }
            characters = defaultToWhiteSpace(characters);
            return String(str).replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
        };

        var dasherize = function(str){
            return trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
        };

        if (str == null) {
            return '';
        }

        var from = 'ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź';
        var to = 'aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz';
        var regex = new RegExp(defaultToWhiteSpace(from), 'g');
        str = String(str).toLowerCase().replace(regex, function (c) {
            var index = from.indexOf(c);
            return to.charAt(index) || '-';
        });

        return dasherize(str.replace(/[^\w\s-]/g, '')).replace(/^\W|\W$/g, '');
    });

    /**
     * @example
     * {{ bemModifier 'block' [ 'modifier-1', 'modifier-2' ] }}
     *
     * @returns {string} 'block block--modifier-1 block--modifier-2'
     */
    Handlebars.registerHelper('bemModifier', function(block, modifier) {
        var classes = block;

        if (typeof modifier !== 'undefined') {
            if (Array.isArray(modifier)) {
                for (var i = 0; i < modifier.length; i++) {
                    classes += ' ' + block + '--' + modifier[i];
                }
            } else {
                classes += ' ' + block + '--' + modifier;
            }
        }

        return classes;
    });

    /**
     * @example
     * {{ bemElementOf 'block' 'element' }}
     *
     * @returns {string} 'block__element'
     */
    Handlebars.registerHelper('bemElementOf', function(block, element) {
        if (block || typeof block !== 'undefined' && typeof element !== 'undefined') {
            return block + '__' + element;
        }
    });

    // Stolen from https://github.com/hellokatili/plugin-node-pattern-lab-handlebars-helpers
    /**
     * The compare helper takes 3 arguments: value1 operator value2
     *
     * @example
     * {{#compare unicorns '!=' ponies}}
     *   I knew it, unicorns are NOT ponies!
     * {{/compare}}
     */
    Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
        'use strict';
        var operators = {
            '==': v1 == v2 ? true : false,
            '===': v1 === v2 ? true : false,
            '!=': v1 != v2 ? true : false,
            '!==': v1 !== v2 ? true : false,
            '>': v1 > v2 ? true : false,
            '>=': v1 >= v2 ? true : false,
            '<': v1 < v2 ? true : false,
            '<=': v1 <= v2 ? true : false,
            '||': v1 || v2 ? true : false,
            '&&': v1 && v2 ? true : false,
            'typeof': typeof v1 == v2 ? true : false
        };
        if (operators.hasOwnProperty(operator)) {
            if (operators[operator]) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
        return console.error('Error: Expression "' + operator + '" not found');
    });

    /**
     * The math helper takes 3 arguments: value1 operator value2
     *
     * @example
     * {{math 5 '+' 37}}
     */
    Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);

        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });
}

module.exports = registerHelpers;
