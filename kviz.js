const otazky = [
    {   
        poradi: 1,
        textOtazky: 'Co je ikonická hračka 80.let?',
        obrazek: 'moncicak.jpg',
        moznosti: ['Opičák', 'Kočičák', 'Mončičák'],
        spravnaOdpoved: 2,
        zvolenaMoznost: "",
        textZvoleneMoznosti: ""
    },
    {
        poradi: 2,
        textOtazky: 'Které z uvedených druhů ovoce má nejvíce vitamínu C?',
        obrazek: 'ovoce.jpg',
        moznosti: ['Pomeranč', 'Jablko', 'Banán'],
        spravnaOdpoved: 0,
        zvolenaMoznost: "",
        textZvoleneMoznosti: ""
    },
    {
        poradi: 3,
        textOtazky: 'Který alkoholický nápoj je vyráběn ze švestek?',
        obrazek: 'pivo.jpg',
        moznosti: ['Pivo', 'Víno', 'Slivovice' ],
        spravnaOdpoved: 2,
        zvolenaMoznost: "",
        textZvoleneMoznosti: ""
    },
    {
        poradi: 4,
        textOtazky: 'Jaká je Elišky oblíbená pohádka?',
        obrazek: 'snehurka.jpg',
        moznosti: ['Sněhurka', 'S čerty nejsou žerty', 'Tři oříšky pro popelku', 'Šíleně smutná princezna'],
        spravnaOdpoved: 1,
        zvolenaMoznost: "",
        textZvoleneMoznosti: ""
    }
]

let aktualniOtazka = 0;
let pocetSpravnychOdpovedi = 0;

function zobrazOtazku(aktualniOtazka) {
    document.querySelector('#poradi').innerHTML = 'Otázka ' + otazky[aktualniOtazka].poradi + '/' + otazky.length;
    document.querySelector('#otazka').innerHTML = otazky[aktualniOtazka].textOtazky;
    document.querySelector('#obrazek').src = 'obrazky/' + otazky[aktualniOtazka].obrazek;

    for (let i = 0; i < otazky[aktualniOtazka].moznosti.length; i++) {
        const odpovedi = document.createElement('ul');
        odpovedi.setAttribute('id', 'odpovedi');

        const moznost = document.createElement('li');
        moznost.setAttribute('data-odpoved', i);
        moznost.setAttribute('onclick', 'klikNaOdpoved(this)');
        moznost.innerHTML = otazky[aktualniOtazka].moznosti[i];

        odpovedi.appendChild(moznost);
        document.querySelector('#moznosti').appendChild(odpovedi);
    }
}

let indexOdpovedi;
let textOdpovedi;

zobrazOtazku(aktualniOtazka);

function klikNaOdpoved(moznost) {
    indexOdpovedi = moznost.getAttribute('data-odpoved');
    textOdpovedi = moznost.innerHTML;

    otazky[aktualniOtazka].zvolenaMoznost = indexOdpovedi;
    otazky[aktualniOtazka].textZvoleneMoznosti = textOdpovedi;

    aktualniOtazka++;

    if (aktualniOtazka < otazky.length) {
        zobrazOtazku(aktualniOtazka);
    } else {
        zobrazVyhodnoceni();
    }
}

function zobrazVyhodnoceni() { 
    document.querySelector('.kviz').style.display = 'none';
    document.querySelector('.vysledek').style.display = 'block';

    for (let i = 0; i < otazky.length; i++) {
        let vysledky = document.querySelector('.vysledek');
       
        let vypisOtazky = document.createElement('h3');
        vypisOtazky.innerHTML = otazky[i].poradi + '. ' + otazky[i].textOtazky;

        let volba = document.createElement('p');
        volba.innerHTML = 'Tvoje odpověď: ' + otazky[i].textZvoleneMoznosti;

        let vyhodnoceni = document.createElement('p');
        if (otazky[i].zvolenaMoznost === otazky[i].spravnaOdpoved) {
            vyhodnoceni.innerHTML = 'To je správně!';
            pocetSpravnychOdpovedi++;
        } else {
            vyhodnoceni.innerHTML = 'Správná odpověď: ' + otazky[i].moznosti[otazky[i].spravnaOdpoved];
        }

        vysledky.appendChild(vypisOtazky);
        vysledky.appendChild(volba);
        vysledky.appendChild(vyhodnoceni);
    }
}