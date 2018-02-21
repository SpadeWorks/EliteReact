var UI = (function () {
    var color = {
        teal2: '#00ffc3',
        teal: '#59b29e',
        darK: '#0c0614',
        red: '#f63b4c',
        light: '#afe3d7'
    };

    var ease = {
        power: Power4.easeOut,
        elastic: Elastic.easeOut.config(1, 1),
        none: Power0.easeNone,
        rough: RoughEase.ease.config({
            points: 100,
            strength: 4,
            clamp: true,
            randomize: true,
        }),
        back: Back.easeOut.config(1)
    };

    var $window = $(window);
    var header = $('#header');
    var uiHud = $('.ui-hud');
    var hudBox = $('.hud-box');
    var hudBoxBorder = hudBox.find('.hud-box-border');
    var h1Title = header.find('h1.title');
    var h2Title = $('#essay .header-title .title');
    var paragraph = $('#essay p');
    var borderTB = uiHud.find('.border.b, .border.t');
    var borderLR = hudBox.find('.border.l, .border.r');
    var tics = hudBox.find('.tics');
    var tic = tics.find('.tic');
    var borderV = uiHud.find('.border-v');
    var borderH = uiHud.find('.border-h');
    var borderEnds = $('.cap, .x-hair, .batt');
    var graph = hudBox.find('.ui-graph');
    var logoBox = uiHud.find('.ui-logo');
    var logo = logoBox.find('.logo-mark');
    var logoRing = logoBox.find('.ring');
    var logoCorners = logoBox.find('.corners');
    var borderX = uiHud.find('.border-x');
    var borderV2 = uiHud.find('.ui-border-v2');
    var circles = uiHud.find('.circle');
    var textBoxH5 = uiHud.find('.ui-text-box').find('h5');
    var textBoxP = uiHud.find('.ui-text-box').find('.text');
    var button = $('.ui-button');
    var figure = $('.wrap figure');

    function animate() {
        $window.scrollTop(0);
        var introTL = new TimelineMax();
        var h1Letters = new SplitText(h1Title, {
            type: 'words chars',
            wordsclassName: 'word word++'
        });
        var h1Chars = h1Letters.chars;
        // var audioText 	= new Audio('assets/sound/digital-text-02.mp4');
        // audioText.volume = 0.3;
        var borderDur = 6;
        introTL
            .fromTo(borderV, borderDur, {
                scaleY: 0,
            }, {
                ease: ease.elastic,
                scaleY: 1,
            }, 'borders')
            .fromTo(borderH, borderDur, {
                scaleX: 0,
            }, {
                ease: ease.elastic,
                scaleX: 1,
            }, 'borders')
            .fromTo(borderEnds, borderDur, {
                opacity: 0,
            }, {
                opacity: 1,
                ease: ease.rough,
            }, 'borders')
            .fromTo(borderX, borderDur, {
                scale: 0,
            }, {
                scale: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderTB, borderDur, {
                scaleX: 0,
            }, {
                scaleX: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderLR, borderDur, {
                scaleY: 0,
            }, {
                scaleY: 1,
                ease: ease.elastic,
            }, 'borders')
            .fromTo(borderV2, borderDur, {
                y: '-100%',
            }, {
                y: '0%',
                ease: ease.elastic,
            }, 'borders')
            .from(tic, borderDur / 2, {
                ease: ease.elastic,
                scaleY: 0
            }, 'borders+=0.5')
            .staggerFromTo(circles, borderDur, {
                autoAlpha: 0,
                scale: 0,
                y: '-50%'
            }, {
                scale: 1,
                ease: ease.elastic,
                autoAlpha: 1,
                repeat: -1,
                repeatDelay: 30,
                y: '0%'
            }, 0.1, 'borders+=0.5')
            .fromTo(logoBox, 1, {
                scale: 0
            }, {
                scale: 1,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logoRing, 2.5, {
                scale: 0,
                autoAlpha: 0,
            }, {
                delay: 2.5,
                scale: 1,
                autoAlpha: 1,
                rotation: 360,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logoCorners, 2.5, {
                scale: 2,
                autoAlpha: 0
            }, {
                scale: 1,
                delay: 2.5,
                autoAlpha: 1,
                ease: ease.elastic
            }, 'borders')
            .fromTo(logo, 1, {
                autoAlpha: 0,
                fill: '#fff',
            }, {
                autoAlpha: 1,
                fill: '#00ffc3',
                ease: ease.rough,
                repeat: -1,
                repeatDelay: 30,
            }, 'borders+=1')
            //- Text Box
            .add('textBox', 5)
            .fromTo(textBoxP, 5, {
                height: 0
            }, {
                height: 140,
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: ease.none,
            }, 'textBox')
            .fromTo(textBoxH5, 1, {
                visibility: 'hidden',
            }, {
                visibility: 'visible',
                ease: ease.none,
            }, 'textBox')
            .to(textBoxH5, 1, {
                text: 'Status: Ready',
                repeat: -1,
                repeatDelay: 3,
                yoyo: true,
                ease: ease.none,
            }, 'textBox')

            //- HUD Box
            .add('hudBox', 0)
            .fromTo(hudBoxBorder, borderDur / 2, {
                scale: 0
            }, {
                scale: 1,
                ease: ease.elastic
            }, 'hudBox')
            .fromTo(button, 1, {
                autoAlpha: 0,
                scale: 0
            }, {
                ease: ease.elastic,
                autoAlpha: 1,
                scale: 1,
            }, 'hudBox+=1.2')
            .fromTo(graph, 1, {
                scale: 0,
                autoAlpha: 0
            }, {
                ease: ease.elastic,
                scale: 1,
                autoAlpha: 1,
            }, 'hudBox+=0')
            .staggerFromTo(h1Chars, 1, {
                visibility: 'hidden',
                y: Math.random() * 10,
                background: 'rgba(0, 255, 195, 0.3)',
                ease: ease.power,
            }, {
                visibility: 'visible',
                background: 'none',
                onStart: function () {
                    // audioText.play();
                },
                ease: ease.power,
            }, 0.05, 'hudBox+=1')
            .staggerFromTo('h1.title .word2', 3, {
                color: color.light,
                // background  : 'rgba(0, 255, 195, 0.3)',
                ease: ease.rough
            }, {
                color: color.teal2,
                background: 'rgba(0, 255, 195, 0)',
                ease: ease.rough
            }, 0.5, 'hudBox+=2');
    }

    var transform_number = function(selector, speed, mode) {
        selector.addClass('counter');
        var number_array = selector.html().replace(/ /g, '').split('');
        var new_html = "";
        number_array.forEach(function(current, index) {
            if(parseInt(current) === parseInt(current, 10)) { }
            else {
                number_array.splice(index, 1);
            }
        });
        number_array.forEach(function(current, index) {
            new_html = new_html + "<span class='dig' data-dig='"+(index + 1)+"'>"+current+"</span>";
        });   
        selector.html(new_html);
        counter(selector, speed, mode);
    }
    
    var counter = function(counter, speed, mode) {
        var dig_count = 0;
        counter.find('.dig').each(function() {
            if(mode == 'fixed_width') {
                $(this).css('opacity', 0);    
            }
            if(mode == 'flex') {
                $(this).hide();   
            }
            dig_count += 1;
        });
    
        var i = dig_count;
        function f() {
            var $current_dig = counter.find('.dig[data-dig='+i+']');
            if(mode == 'fixed_width') {
                $current_dig.animate({'opacity': 1}, speed);    
            }
            if(mode == 'flex') {
                $current_dig.fadeIn(speed);  
            }
            var current_dig_val = $current_dig.html();
            $current_dig.html(0);
    
            var k = 0;
            function g() {
                $current_dig.html(parseInt($current_dig.html()) + 1);
                k++;
                if( k < 9 ){
                    setTimeout( g, speed/5 );
                }  
                if( k == 9 ){
                    $current_dig.html(parseInt(current_dig_val));
                }
            }
            g();
    
            i--;
            if( i >= 1 ){
                setTimeout( f, speed );
            }
        }
        f();
    }
    //-----------------------------------------------------------
    return {
        transform_number: transform_number,
        animate: animate,
        counter: counter
    };

}());
$(window).on('load', function () {
    $('body').css('opacity', 1);
    UI.animate();
    
})



$(document).ready(function () {
    setTimeout(
        function activebtn() {
            $("button.type1").css("opacity", "1").fadeIn();
        },1200);
        var counterDiv = $('.counter');
        if(counterDiv.length > 0){
            UI.transform_number(counterDiv, 200, 'fixed_width');
        }

});


