const episodes = [
    "01-01",
    "01-02",
    "01-03",
    "01-04",
    "01-05",
    "01-06",
    "01-07",
    "01-08",
    "01-09",
    "01-10",
    "01-11",
    "01-12",
    "02-01",
    "02-02",
    "02-03",
    "02-04",
    "02-05"
];


const STORAGE_KEY = "sashatanya_watched";


let watched = [
    "01-01",
    "01-02",
    "01-03"
];


// Загружаем сохранённые просмотренные серии
const savedWatched = localStorage.getItem(STORAGE_KEY);

if (savedWatched) {

    watched = JSON.parse(savedWatched);

} else {

    // первый запуск — сохраняем начальный список
    saveWatched();

}


let currentEpisode = null;


// Элементы страницы
const episodeNumber = document.getElementById("episodeNumber");
const remaining = document.getElementById("remaining");
const watchedList = document.getElementById("watchedList");

const randomBtn = document.getElementById("randomBtn");
const watchedBtn = document.getElementById("watchedBtn");


// Сохранение просмотренных
function saveWatched() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(watched)
    );

}


// Обновление интерфейса
function updateUI() {

    const left = episodes.filter(
        episode => !watched.includes(episode)
    );


    remaining.textContent = left.length;


    watchedList.innerHTML = "";


    watched
        .slice()
        .sort()
        .forEach(ep => {

            const li = document.createElement("li");

            li.textContent =
                "Сезон " + ep.substring(0, 2) +
                " Серия " + ep.substring(3);

            watchedList.appendChild(li);

        });


    if (left.length === 0) {

        episodeNumber.textContent =
            "🎉 Все серии просмотрены";

        randomBtn.disabled = true;
        watchedBtn.disabled = true;

    }

}


// Получить случайную серию
randomBtn.onclick = () => {


    const left = episodes.filter(
        episode => !watched.includes(episode)
    );


    if (left.length === 0) {
        return;
    }


    const randomEpisode =
        left[Math.floor(Math.random() * left.length)];


    currentEpisode = randomEpisode;


    episodeNumber.textContent =
        "Сезон " +
        randomEpisode.substring(0, 2) +
        "   Серия " +
        randomEpisode.substring(3);


    watchedBtn.disabled = false;

};



// Отметить просмотренной
watchedBtn.onclick = () => {


    if (!currentEpisode) {
        return;
    }


    if (!watched.includes(currentEpisode)) {

        watched.push(currentEpisode);

        saveWatched();

    }


    currentEpisode = null;


    watchedBtn.disabled = true;


    episodeNumber.textContent = "—";


    updateUI();

};


// Первый запуск интерфейса
updateUI();