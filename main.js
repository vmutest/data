window.addEventListener('load', function () {
    const listQuestion = document.getElementsByClassName('question-container');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    function showQuestion(qsNum) {
        for (let i = 0; i < listQuestion.length; i++) {
            if (i !== qsNum) {
                hideQuestion(i);
            } else {
                listQuestion[qsNum].classList.add('active');
            }
        }

        btnPrev.disabled = qsNum === 0;

        btnNext.disabled = qsNum === listQuestion.length - 1;
    }

    function hideQuestion(qsNum) {
        listQuestion[qsNum].classList.remove('active');
    }

    let currentQuestion = 0;

    let nextTimeOut = null;
    function nextQuestion() {
        currentQuestion++;
        showQuestion(currentQuestion);
        clearTimeout(nextTimeOut);
    }

    function prevQuestion() {
        currentQuestion--;
        showQuestion(currentQuestion);
        clearTimeout(nextTimeOut);
    }

    btnNext.addEventListener('click', nextQuestion);
    btnPrev.addEventListener('click', prevQuestion);

    showQuestion(currentQuestion);

    var q = $('.question'),
        w = [
            'A+',
            'A',
            'B+',
            'B',
            'C+',
            'C',
            'D+',
            'D',
            'F',
        ];

    $(q).each(function (n) {
        var ul = $(q[n]).find('ul'),
            mes = $(q[n]).parent().find('.message');
        console.log(mes);
        $(ul).each(function (i, v) {
            var li = $(ul[i]).find('li'),
                p = $(ul[i]).next('p'),
                cor = $(ul[i]).find('li.vmu');
            $(li).one('click', function () {
                $(this).parent().find('li').unbind('click'); // unbind click event

                $(this).parent().addClass('answered');
                $(this).addClass('selected');
                $(p).appendTo($(cor)).addClass('explaination');

                if (i == ul.length - 1) {
                    showQuestion(currentQuestion + 1);
                    btnPrev.classList.add('hide');
                    btnNext.classList.add('hide');

                    var corr = $(ul).find('li.vmu.selected').length,
                        s = (corr * 100) / ul.length - 1;
                    (v =
                        '<span class="vmu">' +
                        corr +
                        '</span><span class="total">' +
                        ul.length +
                        '</span>'),
                        $(v).insertAfter($(mes));
                    w.forEach(function () {
                        if (s >= 90) $(mes).html(w[0]);
                        else if (s >= 85) $(mes).html(w[1]);
                        else if (s >= 80) $(mes).html(w[2]);
                        else if (s >= 70) $(mes).html(w[3]);
                        else if (s >= 65) $(mes).html(w[4]);
                        else if (s >= 55) $(mes).html(w[5]);
                        else if (s >= 50) $(mes).html(w[6]);
                        else if (s >= 40) $(mes).html(w[7]);
                        else $(mes).html(w[8]);
                    });
                } else {
                    nextTimeOut = setTimeout(nextQuestion, 3000);
                }
            });
        });
    });
});
