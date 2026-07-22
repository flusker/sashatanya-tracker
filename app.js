const episodes = [];


// Все сезоны и количество серий
const seasons = {
    1: 40,
    2: 79,
    3: 120,
    4: 161,
    5: 200,
    6: 240,
    7: 280,
    8: 320,
    9: 360
};


// Создаем список всех серий
for (const season in seasons) {

    for (
        let episode = 1;
        episode <= seasons[season];
        episode++
    ) {

        episodes.push(
            String(season).padStart(2, "0") +
            "-" +
            String(episode).padStart(3, "0")
        );

    }

}



const STORAGE_KEY = "sashatanya_watched";



// Первые 3 сезона просмотрены
let watched = [];

const watchedSeasons = {
    1: 40,
    2: 79,
    3: 120
};


for (const season in watchedSeasons) {

    for (
        let episode = 1;
        episode <= watchedSeasons[season];
        episode++
    ) {

        watched.push(
            String(season).padStart(2, "0") +
            "-" +
            String(episode).padStart(3, "0")
        );

    }

}



// Сохранение просмотренных серий
function saveWatched() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(watched)
    );

}



// Загружаем сохранение
const savedWatched = localStorage.getItem(STORAGE_KEY);


if (savedWatched) {

    watched = JSON.parse(savedWatched);

} else {

    saveWatched();

}



let currentEpisode = null;



// Элементы страницы

const episodeNumber =
    document.getElementById("episodeNumber");

const remaining =
    document.getElementById("remaining");

const watchedList =
    document.getElementById("watchedList");


const randomBtn =
    document.getElementById("randomBtn");

const watchedBtn =
    document.getElementById("watchedBtn");


const addWatchedBtn =
    document.getElementById("addWatchedBtn");


const manualEpisode =
    document.getElementById("manualEpisode");





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


            const li =
                document.createElement("li");


            li.textContent =
                "Сезон " +
                Number(ep.substring(0, 2)) +
                " Серия " +
                Number(ep.substring(3));


            watchedList.appendChild(li);


        });



    if (left.length === 0) {


        episodeNumber.textContent =
            "🎉 Все серии просмотрены";


        randomBtn.disabled = true;

        watchedBtn.disabled = true;


    }


}





// Случайная серия

randomBtn.onclick = () => {


    const left = episodes.filter(
        episode => !watched.includes(episode)
    );



    if (left.length === 0) {

        return;

    }



    const randomEpisode =
        left[
            Math.floor(
                Math.random() * left.length
            )
        ];



    currentEpisode = randomEpisode;



    episodeNumber.textContent =
        "Сезон " +
        Number(randomEpisode.substring(0, 2)) +
        "\nСерия " +
        Number(randomEpisode.substring(3));



    watchedBtn.disabled = false;


};






// Отметить текущую серию просмотренной

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






// Добавить просмотренную вручную

addWatchedBtn.onclick = () => {


    let episode =
        manualEpisode.value.trim();



    if (!episode) {

        return;

    }



    let parts = episode.split("-");



    if (parts.length !== 2) {

        alert("Формат: 04-001");

        return;

    }



    let season =
        String(Number(parts[0]))
        .padStart(2, "0");



    let number =
        String(Number(parts[1]))
        .padStart(3, "0");



    let formatted =
        season + "-" + number;



    if (!episodes.includes(formatted)) {

        alert("Такой серии нет");

        return;

    }



    if (watched.includes(formatted)) {

        alert("Эта серия уже просмотрена");

        return;

    }



    watched.push(formatted);


    saveWatched();


    manualEpisode.value = "";


    updateUI();


};





// Запуск

updateUI();