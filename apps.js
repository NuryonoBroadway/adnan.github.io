const sounds = document.querySelectorAll(".pads audio");
const pads = document.querySelectorAll(".pads");
const play = document.querySelectorAll(".play button img");
const playbackground = document.querySelectorAll(".play button")
const fill = document.querySelectorAll("section div");
const seekbar = document.querySelectorAll(".control section");
let time = document.querySelectorAll('.time span');

let mouseDown = false;
pads.forEach((pad, index) => {
    pad.addEventListener('click', function () {
        if (sounds[index].paused) {
            sounds[index].play();
            $(play[index]).attr("src", "Pause.png");
            $(playbackground[index]).hover(function () {
                $(this).css("background-color", "#e74c3c");
            }, function () {
                $(this).css("background-color", "#2c3e50");
            });
            playbackground[index].classList.add("played")
        } else {
            sounds[index].pause();
            $(play[index]).attr("src", "Play.png");
            $(playbackground[index]).hover(function () {
                $(this).css("background-color", "#2c3e50");
            }, function () {
                $(this).css("background-color", "#e74c3c");
            });
            playbackground[index].classList.remove("played")
        }
    });
    sounds[index].addEventListener('timeupdate', function () {
        if (mouseDown) return;
        var position = sounds[index].currentTime / sounds[index].duration;
        fill[index].style.width = position * 100 + '%';
        seekbar[index].value = position;
        var curmins = Math.floor(sounds[index].currentTime / 60);
        var cursecs = Math.floor(sounds[index].currentTime - curmins * 60);
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }
        if (curmins < 10) {
            curmins = "0" + curmins;
        }
        time[index].textContent = curmins + ":" + cursecs;
    });
    sounds[index].addEventListener('ended', function () {
        this.currentTime = 0;
        $(play[index]).attr("src", "Play.png");
        $(playbackground[index]).hover(function () {
            $(this).css("background-color", "#2c3e50");
        }, function () {
            $(this).css("background-color", "#e74c3c");
        });
    });

    function clamp(min, val, max) {
        return Math.min(Math.max(min, val), max);
    };

    function getP(e) {
        let p = (e.clientX - seekbar[index].offsetLeft) / seekbar[index].clientWidth;
        return p;
    };
    seekbar[index].addEventListener('mousedown', function (e) {
        mouseDown = true;

        let p = getP(e);
        p = clamp(0, p, 1);

        fill[index].style.width = p * 100 + '%';

    });
    seekbar[index].addEventListener('mouseup', function (e) {
        if (!mouseDown) return;

        mouseDown = false;

        let p = getP(e);
        p = clamp(0, p, 1);

        fill[index].style.width = p * 100 + '%';

        sounds[index].currentTime = p * sounds[index].duration;
    });
    seekbar[index].addEventListener('mousemove', function (e) {
        if (!mouseDown) return;
        let p = getP(e);
        fill[index].style.width = p * 100 + '%';
    });

    seekbar[index].addEventListener('click', function (e) {
        let p = getP(e);
        sounds[index].currentTime = p * sounds[index].duration;
        sounds[index].play();
        $(play[index]).attr("src", "Pause.png");
    });
});