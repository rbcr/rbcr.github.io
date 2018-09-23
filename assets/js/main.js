$(function () {
    const body = $('body');
    const terminal_body = $('.terminal-body');

    if(terminal_body.length)
        newLine();

    body.on('click', '.terminal-line', function(){
        $(this).attr('contentEditable', true);
    });

    body.on('keypress', '.terminal-line', function (e) {
        $(this).find('.typed-cursor').remove();
        if(e.which === 13){
            var terminal_line = $(this);
            terminal_line.removeClass('terminal-line').removeAttr('contenteditable');
            var command = $(this).text();
            terminal_line.append(loadCommand(command));
            newLine();
        }
    });

    body.on('keyup', '.terminal-line', function (e) {
        var content = $(this).html();
        var cursors = $('.typed-cursor');
        if(content.length > 0 && cursors.length < 1)
            $(this).append('<span class="typed-cursor">▋</span>');
    });

    function loadCommand(command){
        var result = '';
        switch (command.trim()) {
            case 'showcv':
                break;

            case 'clear':
                terminal_body.html('');
                result = '<div class="terminal-prompt"><span class="prompt">user@local:~$ </span><span class="terminal-line"></span></div>';
                break;

            case 'help':
                result = 'A continuación se muestran los comandos disponibles para la consola virtual';
                break;

            default:
                result = '<br/>Command "' + command + '" not found';
                break;
        }
        return result;
    }

    function newLine() {
        terminal_body.append('<div class="terminal-prompt"><span class="prompt">user@local:~$ </span><span class="terminal-line"><span class="typed-cursor">▋</span></span></div>');
    }
});