// tabler-0.0.1
// property of Evgenii Ermolaev. But u can use it as u want except sell ;)


(function ($) {

    var methods = {
        init : function(options) { 
            var editor = $(this)

            ,settings = $.extend({
                'table' : '<table border="1" cellpadding="0" cellspacing="0" ></table>',
                'rows'  : 10,
                'cols'  : 4
            }, options),

            table = methods.generateTable(editor, settings.rows, settings.cols, settings.table);

            // bind toolbar actions to method
            $(this.find('[class*="tblr-action__"]')).bind('click.tblrToolbar', {'table' : table} ,methods.toolbar);

            editor.addClass('tblr-contianer');
        },

        generateTable : function(editor, rows, cols, table) {

            editor.append(table);   
            var table = $(editor.find('table')), content;
            table.data('tblr-settings', {'rows' : rows, 'cols' : cols}).addClass('tblr-table');

            for (var i = 0 ; i < rows; i++) {
                content += '<tr>';
                for (var k = 0; k < cols; k++) {
                    content += '<td colspan="1" rowspan="1" data-position="' + k + '"></td>';
                }
                content += '</tr>';
            }

            table.append(content);

            return table;
        },

        toolbar : function(e) {
            var self    =   $(this),
            table       =   e.data.table;
            
            if (self.hasClass('tblr-action__add-row')) {
                table.data('tblr-settings').rows++;

                var cloneRow = table.find('tr:last').clone();
                cloneRow.find('td').each(function(){
                    $(this).html('');
                });
                table.append(cloneRow);

                return;
            }

            if (self.hasClass('tblr-action__add-col')) {
                table.data('tblr-settings').cols++;

                table.find('tr').each(function(){
                    var colCount = $(this).find('td').length;
                    $(this).append('<td colspan="1" rowspan="1" data-position="' + colCount + '"></td>');

                });
            }
        }
    }



    $.fn.tabler = function (method, options) {

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Undefined method: ' +  method + 'for jQuery.tabler' );
        } 
    }
}(jQuery));