$(function () {
    const body = $('body');
    const html = $('html');
    const terminal_body = $('.terminal-body');

    if(terminal_body.length){
        newLine();
    }

    html.on('keyup', 'body', function (e) {
        const terminal_line = getLastCommandLine();
        switch (e.which) {
            case 8:
                var terminal_line_text = terminal_line.text();
                terminal_line.text(terminal_line_text.slice(0,-1));
                break;

            case 13:
                terminal_line.find('.typed-cursor').remove();
                var command = terminal_line.text();
                terminal_line.append(loadCommand(command));
                newLine();
                break;

            default:
                var s = String.fromCharCode(e.which);
                console.log(s);
                if (s.match(/[a-zA-Z\.]/)){
                    terminal_line.find('.typed-cursor').remove();
                    terminal_line.append(s.toLowerCase() + '<span class="typed-cursor">▋</span>');
                }
                break;
        }
    });

    function getLastCommandLine() {
        var terminal_lines = $('.terminal-line');
        var last_terminal_line = null;
        $.each(terminal_lines, function (i, terminal_line) {
            var last_element = i === terminal_lines.length -1;
            if(last_element)
                last_terminal_line = $(terminal_line);
        });
        return last_terminal_line;
    }

    function loadCommand(command){
        var result = '';
        switch (command.trim()) {
            case 'clear':
                terminal_body.html('');
                result = '<div class="terminal-prompt"><span class="prompt">guest@robsaurus:~$ </span><span class="terminal-line"></span></div>';
                break;

            case 'contact':
                result = '<pre><strong>Email:</strong>\tdev[dot]rcc[at]gmail[dot]com\n' +
                        '<strong>Github:</strong>\tgithub.com/dev.rcc\n' +
                        '<strong>Twitter:</strong>\trobstack_</pre>';
                break;

            case 'cv':
                terminal_body.html('');
                var typed = new Typed('.terminal-body', {
                    strings: ['<pre>total 101^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-terminal">FULL STACK DEVELOPER</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-php">DefaultController.php</span>^1000\n-rwxrwxrwx 1 guest robsaurus <span class="text-php">PHP + MVC con Laravel y un [mini]mvc propio con Eloquent</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-php">+4 años de experiencia en diferentes proyectos</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-html">Index.html</span>^1000\n-rwxrwxrwx 1 guest robsaurus <span class="text-html">Obviamente CSS + Javascript (JQuery, Vue)</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-xamarin">MainPage.xaml.cs</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-xamarin">También he desarrollo apps con Xamarin (Android, iOS)</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-script">script.sh^1000</span>\n-rwxrwxrwx 1 guest robsaurus <span class="text-script">Instalación y administración de servidores LAMP</span>^1000\ndrwxrwxrwx 1 guest robsaurus <span class="text-git">.gitignore</span>^1000\n-rwxrwxrwx 1 guest robsaurus <span class="text-git">Hay algo nuevo? Sin miedo 🕶^1000</span><pre>'],
                    typeSpeed: 5,
                    onStart: function(pos, self) {
                        $('span.typed-cursor').remove();
                    },
                    onTypingResumed: function(pos, self) {
                        $('span.typed-cursor').remove();
                    },
                    onComplete: function(self) {
                        newLine();
                    }
                });
                break;

            case 'location':
                result = '<br><strong>Current location: </strong> Puebla, Puebla, MX.';
                break;

            case 'help':
                result = '<pre>A continuación se muestran los comandos disponibles para la consola virtual\n\n' +
                    '<strong>clear</strong>\tLimpiar la pantalla\n' +
                    '<strong>contact</strong>\tMostrar información de contacto\n' +
                    '<strong>cv</strong>\tMostrar información y experiencia profesional\n' +
                    '<strong>location</strong>\tUbicación actual</pre>';
                break;

            default:
                result = '<br/>Command "' + command + '" not found';
                break;
        }
        return result;
    }

    function newLine() {
        terminal_body.append('<div class="terminal-prompt"><span class="prompt">guest@robsaurus:~$ </span><span class="terminal-line"><span class="typed-cursor">▋</span></span></div>');
    }
});