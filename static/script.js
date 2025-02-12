document.addEventListener('DOMContentLoaded', () => {
    
    let timeButtons = Array.from(document.querySelectorAll('nav button'));
    timeButtons.map(x => x.addEventListener('click', (e) => {
        for (let button of timeButtons) {
            button.classList.remove('selected');
        }
        e.target.classList.add('selected');
        setTimeFrame(e.target.id);
    }));


    let previousTimes = document.querySelectorAll('.previous')
    function setTimeFrame(timeFrame) {
        for (let p of previousTimes) {
            p.classList.remove('day', 'week', 'month');
            p.classList.add(timeFrame);
        }
    }

});