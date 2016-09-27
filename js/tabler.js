// tabler-0.0.1
// property of Evgenii Ermolaev. But u can use it as u want except sell ;)


(function ($) {

    var methods = {
        init : function(options) { 
            var editor = $(this)
            ,settings = $.extend({
                'table' : null,
                'rows'  : 40,
                'cols'  : 4,
                'width' : 600
            }, options),
            actions = { // default actions
                'addRowDown'    : 'Add row down', 
                'addRowUp'      : 'Add row up',
                'addColLeft'    : 'Add column left',
                'addColRight'   : 'Add column right'
            },
            table = methods._generateTable(editor, settings);

            var tableWrapper = editor.wrapInner('<div class="tabler-wrapper"></div>');
            tableWrapper.prepend(
                    $('<input>', {
                        'class' : 'tabler-change tabler-primary-width',
                        'data-tabler-update' : 'width',
                        'data-tabler-target' : '.tabler-table',
                        'data-has-label' : 'true'
                    })
            );


            methods._toolbarInit(editor, table, actions);
            $(editor.find('.tabler-change')).bind('keyup.tablerSettings', {'table' : table} , methods.toolbarChangeSettings);

            editor.addClass('tabler-contianer');

            return editor;
        },

        _generateTable : function(editor, settings) {
            if (settings.table != null) {
                editor.append(settings.table);
                return settings.table;
            } else {
                editor.append('<table border="1" cellpadding="0" cellspacing="0" ></table>');   
                var table = $(editor.find('table')), content;
                table.data('tabler-settings', {'rows' : settings.rows, 'cols' : settings.cols}).addClass('tabler-table');
                table.width(settings.width);

                for (var i = 0 ; i < settings.rows; i++) {
                    content += '<tr>';
                    for (var k = 0; k < settings.cols; k++) {
                        content += '<td colspan="1" rowspan="1" class="tabler-transition" ></td>';
                    }
                    content += '</tr>';
                }

                table.append(content);
                return table;
            }

            
        },

        _toolbarInit : function(editor, table, actions) {

            editor.prepend($('<div>', {
                'class'     : 'tabler-toolbar'
            }));

            var toolbar = editor.find('.tabler-toolbar');

            $.each( actions, function(data, name) {
                toolbar.append(
                    $('<span>', {
                        'class' : 'tabler-toolbar__action tabler-transition tabler-icon__' + name,
                        'data-tabler-toolbar-action' : data,
                        'data-tabler-toolbar-name' : 'name'
                    })
                );
            });


            //bind settings
            $(editor.find('.tabler-toolbar__action')).bind('click.tablerToolbar', {'table' : table} ,methods.toolbarActions);
            return toolbar;

        },

        toolbarActions : function(e) {
            e.preventDefault();
            var self    = $(this),
            action      = self.data('tabler-toolbar-action'),
            table       =   e.data.table;
            
            if (action == "addRowDown" || action == "addRowUp" ) {
                
                table.data('tabler-settings').rows++;

                var cloneRow = action == "addRowDown" ? table.find('tr:last').clone() : table.find('tr:first').clone() ;
                
                cloneRow.find('td').each(function(){
                    $(this).html('');
                });

                if (action == "addRowDown") {
                    table.append(cloneRow);
                } else {
                    table.prepend(cloneRow);
                }

                return;
            }

            if (action == "addColLeft" || action == "addColRight") {
                table.data('tabler-settings').cols++;

                table.find('tr').each(function(){
                    var colCount = $(this).find('td').length,
                    colTemplate = '<td colspan="1" rowspan="1" class="tabler-transition" ></td>';

                    if (action == "addColLeft") {
                        $(this).append(colTemplate);    
                    } else {
                        $(this).prepend(colTemplate);
                    }
                });

                return;
            }
        } ,

        toolbarChangeSettings : function() {
            var self = $(this),
            target = $(self.data('tabler-target'));

            self.addClass('tabler-update__setting');
            setTimeout(function(){
                target.css(self.data('tabler-update'), self.val())
                self.removeClass('tabler-update__setting');
            }, 1000);
            
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