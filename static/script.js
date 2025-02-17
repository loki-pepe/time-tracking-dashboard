document.addEventListener('DOMContentLoaded', () => {
    let timeButtons = document.querySelectorAll('nav button');
    let timeElements = document.querySelectorAll('.current', '.previous');
    let previousTimeElements = document.querySelectorAll('.previous');

    updateTimes(document.querySelector('.selected').id);
    
    timeButtons.forEach(x => x.addEventListener('click', (e) => {
        for (let button of timeButtons) {
            button.classList.remove('selected');
        }
        e.target.classList.add('selected');
        setTimeFrame(e.target.id);
    }));

    function setTimeFrame(timeFrame) {
        for (let p of previousTimeElements) {
            p.classList.remove('daily', 'weekly', 'monthly');
            p.classList.add(timeFrame);
        }
        updateTimes(timeFrame);
    }

    function updateTimes(timeFrame) {
        fetch('data.json').then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).then((data) => {
            for (let section of data) {
                let {current, previous} = section.timeframes[timeFrame];
                let card = document.querySelector(`#${section.title.toLowerCase().replace(' ', '-')}`);
                card.querySelector('.current').textContent = current + 'hrs';
                card.querySelector('.previous').textContent = previous + 'hrs';
            }
        }).catch((e) => {
            for (let time of timeElements) {
                time.textContent = 'N/A';
            }
            console.error(e);
        });
    }

});
