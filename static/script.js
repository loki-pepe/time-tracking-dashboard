document.addEventListener('DOMContentLoaded', () => {
    let timeButtons = Array.from(document.querySelectorAll('nav button'));
    let currentTimeElements = document.querySelectorAll('.current');
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
        fetch('/projects/frontend-mentor/time-tracking-dashboard-main/data.json').then((response) => {
            if (!response.ok) {
                /* For the sake of the static GH Pages site, the 'data.json' data was copied
                   into the 'staticWebInfo' binding which is returned in case of a failed response.
                   Otherwise, a new error would be thrown and the 'catch' method would populate
                   the time elements with 'N/A'. */
                return staticWebInfo;

                /* The code would normally be: */
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
            for (let time of currentTimeElements) {
                time.textContent = 'N/A';
            }
            for (let time of previousTimeElements) {
                time.textContent = 'N/A';
            }
            console.error(e);
        });
    }

});



/* The data from the 'data.json' file for the sake of the static website hosted on GH Pages */
let staticWebInfo = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
]