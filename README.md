
# Hyte HealthDiary


**Linkki julkaistuu sovellukseen:** https://healthdiary.northeurope.cloudapp.azure.com/

**Linkki GitHubiin (front-end):** https://github.com/Juliusjev/hyte-fe

**Linkki GitHubiin (back-end):** https://github.com/Juliusjev/hyte-server/tree/master
## API Dokumentaatio
### /api/auth


#### Sisäänkirjautuminen
```http
  POST http://127.0.0.1:3000/api/auth/login
  content-type: application/json
  {
    "username": "user",
    "password": "secret"
  }
```

### /api/users

#### Hae kaikki käyttäjät (vaatii tokenin)
```http
  GET http://127.0.0.1:3000/api/users
  Authorization: Bearer <token>
```

#### Hae käyttäjä id:llä (vaatii tokenin)
```http
  GET http://127.0.0.1:3000/api/users/:id
  Authorization: Bearer <token>
```

#### Poista käyttäjä (vaatii tokenin)
```http
  DELETE http://127.0.0.1:3000/api/users/:id
  Authorization: Bearer <token>
```

#### Luo käyttäjä
```http
  POST http://127.0.0.1:3000/api/users
  content-type: application/json

  {
    "username" : "test_user",
    "password" : "test_password1",
    "email": "test_email@example.com"
  }
```

#### Päivitä käyttäjätietoja (vaatii tokenin)
```http
  PUT http://127.0.0.1:3000/api/users
  Authorization: Bearer <token>
  content-type: application/json

  {
    "username" : "newtest_user",
    "password" : "newtest_password2",
    "email": "newtest_email@example.com"
  }
````

### /api/entries
#### Luo merkintä (vaatii tokenin)
```http
  POST http://127.0.0.1:3000/api/entries/
  Authorization: Bearer <token>
  content-type: application/json

  {
    "entry_date" : "2024.03.16",
    "mood" : "Hopeful",
    "weight": "78.00",
    "sleep_hours": "3",
    "notes": "Hope I get thiss done"
  }
````

#### Päivitä merkintä (vaatii tokenin)
```http
  PUT http://127.0.0.1:3000/api/entries:id
  Authorization: Bearer <token>
  content-type: application/json

  {
    "entry_date" : "2024.03.17",
    "mood" : "Happy",
    "weight": "78.00",
    "sleep_hours": "8",
    "notes": "Project done, slept well"
  }
````
#### Poista merkintä (requires token)
```http
  DELETE http://127.0.0.1:3000/api/entries:id
  Authorization: Bearer <token>
````

#### Etsi top-5 aktiivisinta käyttäjää
```http
  PUT http://127.0.0.1:3000/api/entries/top

````


### /api/exercises

#### Hae harjoitukset käyttäjä id:n peruteella (vaatii tokenin)
```http
  GET http://127.0.0.1:3000/api/exercises/:id
  Authorization: Bearer <token>

````

#### Lisää harjoitus (vaatii tokenin)
```http
  POST http://127.0.0.1:3000/api/exercises
  Authorization: Bearer <token>
  content-type: application/json

  {
    "type" : "Swimming",
    "duration" : "55",
    "intensity": "High/Medium/Low",
    "date": "2024-03-17",
  }
````

#### Muokkaa harjoitusta (vaatii tokenin)
```http
  PUT http://127.0.0.1:3000/api/exercises/:id
  Authorization: Bearer <token>
  content-type: application/json

  {
    "type" : "Running",
    "duration" : "65",
    "intensity": "High/Medium/Low",
    "date": "2024-03-16",
  }
```

#### Poista harjoitus (vaatii tokenin)
```http
  DELETE http://127.0.0.1:3000/api/exercises/:id
  Authorization: Bearer <token>
```



## Tietokannan dokumentaatio

## Taulut

### Users

| Kenttä      | Tyyppi        | Null | Avain | Oletusarvo        | Lisätieto       |
|-------------|---------------|------|-------|--------------------|-----------------|
| user_id     | INT           | EI   | PRI   | NULL               | auto_increment  |
| username    | VARCHAR(50)   | EI   | UNI   | NULL               |                 |
| password    | VARCHAR(255)  | EI   |       | NULL               |                 |
| email       | VARCHAR(100)  | EI   | UNI   | NULL               |                 |
| created_at  | DATETIME      | EI   |       | CURRENT_TIMESTAMP  |                 |
| user_level  | VARCHAR(10)   | KYLLÄ|       | 'regular'          |                 |

- `user_id`: Käyttäjän yksilöllinen tunniste, pääavain.
- `username`: Käyttäjätunnus, täytyy olla uniikki.
- `password`: Käyttäjän salasana.
- `email`: Käyttäjän sähköposti, täytyy olla uniikki.
- `created_at`: Aikaleima, jolloin käyttäjä on luotu.
- `user_level`: Käyttäjän taso, oletusarvo on 'regular'.

### DiaryEntries

| Kenttä      | Tyyppi        | Null | Avain | Oletusarvo        | Lisätieto       |
|-------------|---------------|------|-------|--------------------|-----------------|
| entry_id    | INT           | EI   | PRI   | NULL               | auto_increment  |
| user_id     | INT           | EI   | MUL   | NULL               |                 |
| entry_date  | DATE          | EI   |       | NULL               |                 |
| mood        | VARCHAR(50)   | KYLLÄ|       | NULL               |                 |
| weight      | DECIMAL(5,2)  | KYLLÄ|       | NULL               |                 |
| sleep_hours | INT           | KYLLÄ|       | NULL               |                 |
| notes       | TEXT          | KYLLÄ|       | NULL               |                 |
| created_at  | DATETIME      | EI   |       | CURRENT_TIMESTAMP  |                 |

- `entry_id`: Päiväkirjamerkinnän yksilöllinen tunniste, pääavain.
- `user_id`: Viittaus Users-taulun user_id-kenttään.
- `entry_date`: Päiväkirjamerkinnän päivämäärä.
- `mood`: Käyttäjän mieliala.
- `weight`: Käyttäjän paino.
- `sleep_hours`: Nukuttujen tuntien määrä.
- `notes`: Päiväkirjamerkintä.
- `created_at`: Aikaleima, jolloin merkintä on luotu.

### Exercises

| Kenttä      | Tyyppi        | Null | Avain | Oletusarvo        | Lisätieto       |
|-------------|---------------|------|-------|--------------------|-----------------|
| exercise_id | INT           | EI   | PRI   | NULL               | auto_increment  |
| user_id     | INT           | EI   | MUL   | NULL               |                 |
| type        | VARCHAR(100)  | EI   |       | NULL               |                 |
| duration    | INT           | EI   |       | NULL               |                 |
| intensity   | VARCHAR(50)   | KYLLÄ|       | NULL               |                 |
| date        | DATE          | EI   |       | NULL               |                 |

- `exercise_id`: Harjoituksen yksilöllinen tunniste, pääavain.
- `user_id`: Viittaus Users-taulun user_id-kenttään.
- `type`: Harjoituksen tyyppi.
- `duration`: Harjoituksen kesto minuuteissa.
- `intensity`: Harjoituksen intensiteetti.
- `date`: Harjoituksen päivämäärä.

### Medications

| Kenttä        | Tyyppi       | Null | Avain | Oletusarvo        | Lisätieto       |
|---------------|--------------|------|-------|--------------------|-----------------|
| medication_id | INT          | EI   | PRI   | NULL               | auto_increment  |
| user_id       | INT          | EI   | MUL   | NULL               |                 |
| name          | VARCHAR(100) | EI   |       | NULL               |                 |
| dosage        | VARCHAR(50)  | KYLLÄ|       | NULL               |                 |
| frequency     | VARCHAR(50)  | KYLLÄ|       | NULL               |                 |
| start_date    | DATE         | KYLLÄ|       | NULL               |                 |
| end_date      | DATE         | KYLLÄ|       | NULL               |                 |

- `medication_id`: Lääkityksen yksilöllinen tunniste, pääavain.
- `user_id`: Viittaus Users-taulun user_id-kenttään.
- `name`: Lääkityksen nimi.
- `dosage`: Lääkityksen annostus.
- `frequency`: Lääkityksen ottofrekvenssi.
- `start_date`: Lääkityksen aloituspäivämäärä.
- `end_date`: Lääkityksen lopetuspäivämäärä.

  
## Toiminnallisuudet

### index.html

1. **Modaalien Hallinta**
   - Viittaukset kirjautumis- ja käyttäjän luomismodaaleihin.
   - Asetetaan tapahtumankuuntelijat modaalien avaus- ja sulkunapeille.
   - Lisätty tapahtumankuuntelijat modaalien ulkopuolelle klikkaamisen käsittelyyn, jolloin modaalit suljetaan.

2. **Käyttäjän Luominen**
   - Viittaus nappiin ja lomakeelementtiin uuden käyttäjän luomiseksi.
   - Asynkroninen pyyntö palvelimelle uuden käyttäjän tietojen lähettämiseksi (POST-metodilla).
   - Ilmoituksen näyttäminen käyttäjälle onnistuneesta luomisesta tai virhetilanteessa virheilmoituksen näyttäminen.

3. **Käyttäjän Kirjautuminen**
   - Kirjautumisnapin ja -lomakkeen viittaukset.
   - Asynkroninen pyyntö palvelimelle kirjautumistietojen lähettämiseksi (POST-metodilla).
   - Onnistuneen kirjautumisen jälkeen käyttäjätiedot (user_id, username ja token) tallennetaan paikalliseen säilöön ja käyttäjä ohjataan `home.html` sivulle.
   - Virhetilanteessa näytetään virheilmoitus.


### home.html

1. **Käyttäjän uloskirjautuminen**
   - Viittaus uloskirjautumisnappiin ja tapahtumankuuntelijan asettaminen sille.
   - Kun nappia klikataan, käyttäjältä kysytään vahvistus uloskirjautumiseen. Jos käyttäjä vahvistaa, suoritetaan seuraavat toimenpiteet:
     - Näytetään ilmoitus onnistuneesta uloskirjautumisesta.
     - Poistetaan käyttäjän tunnistetiedot (`token` ja `username`) paikallisesta säilöstä (`localStorage`).
     - Ohjataan käyttäjä `index.html`-sivulle.

  2. **Käyttäjän nimen näyttäminen**
   - Määritellään funktio `showUsername`, joka hakee käyttäjän tiedot palvelimelta käyttäen                 `fetchData`-funktiota.
   - Pyyntö suoritetaan GET-metodilla osoitteeseen, joka palauttaa käyttäjän omat tiedot, mukanaan käyttäjän  tunnistamiseen tarvittava token.
   - Saatu vastaus sisältää käyttäjän tiedot, joista käyttäjänimi näytetään sivulla tervehdysviestissä.
   - Tämä funktio suoritetaan automaattisesti skriptin latautuessa, joten käyttäjän nimi päivittyy välittömästi käyttäjän näkymään.



### entries.html


1. **Merkintöjen haku**
- **Funktio `getEntryById`**: Hakee kirjautuneen käyttäjän kaikki merkinnät tietokannasta.
  - Käyttäjän tunniste (ID) haetaan paikallisesta säilöstä (`localStorage`).
  - Suoritetaan GET-pyyntö palvelimelle käyttäjän merkintöjen hakemiseksi, käyttäen käyttäjän tokenia autentikaatioon.
  - Saatu data annetaan `createTable`-funktion käsiteltäväksi, joka luo taulukon näyttämään merkinnät.

2. **Taulukon luominen**
- **Funktio `createTable`**: Luo taulukon käyttäjän merkintöjä varten.
  - Käyttää saamaansa dataa luodakseen taulukon rivejä (`<tr>`), joilla näytetään merkintöjen tiedot (päivämäärä, mieliala, paino, unen määrä, muistiinpanot).
  - Lisää jokaiseen riviin napit merkinnän poistamista ja muokkaamista varten.

3. **Merkinnän luominen**
- **Funktio `createEntry`**: Suoritetaan, kun uuden merkinnän lomake lähetetään.
  - Kerää lomakkeen tiedot ja suorittaa POST-pyynnön palvelimelle uuden merkinnän luomiseksi.
  - Onnistuneen lisäyksen jälkeen näyttää ilmoituksen ja päivittää näytöllä olevat merkinnät.

4. **Merkinnän päivitys**
- **Funktio `updateEntry`**: Suoritetaan, kun päivitetyn merkinnän lomake lähetetään.
  - Kerää muokatun merkinnän tiedot ja suorittaa PUT-pyynnön palvelimelle merkinnän päivittämiseksi.
  - Näyttää ilmoituksen onnistuneesta päivityksestä ja päivittää näytöllä olevat merkinnät.

5. **Merkinnän poisto**
- **Funktio `deleteEntry`**: Kutsutaan, kun "Poista merkintä" -nappia painetaan.
  - Suorittaa DELETE-pyynnön palvelimelle valitun merkinnän poistamiseksi.
  - Vahvistaa käyttäjältä, haluaako tämä varmasti poistaa merkinnän.
  - Päivittää näytöllä olevat merkinnät poiston jälkeen.

6. **Tervehtiminen ja uloskirjautuminen**
- **Funktio `showUsername`**: Näyttää kirjautuneen käyttäjän nimen sivustolla.
- **Uloskirjautuminen**: Suoritetaan, kun uloskirjautumisnappia painetaan. Poistaa käyttäjätiedot localStoragesta ja ohjaa etusivulle.



### exercises.html

1. **Harjoitusten haku**
- `getExercisesById` funktio hakee kirjautuneen käyttäjän kaikki harjoitukset tietokannasta.
    - Hakuprosessi käyttää GET-pyyntöä ja sisältää käyttäjän tunnistamiseen tarvittavan tokenin.
    -  Saatu data annetaan `createTable`-funktion käsiteltäväksi, joka luo taulukon näytettäväksi käyttäjälle.

2. **Taulukon luonti**
- `createTable` funktio luo dynaamisesti HTML-taulukon, jossa näytetään kaikki käyttäjän harjoitukset.
    -  Taulukon rivit sisältävät harjoitusten tiedot kuten päivämäärän, aktiviteetin tyypin, intensiteetin ja keston.
    - Jokaiseen riviin lisätään myös 'Muokkaa' ja 'Poista' napit, jotka liittyvät harjoituksen muokkaamiseen ja poistamiseen.

3. **Harjoitusten lisäys**
- `createExercise` funktio lisää uuden harjoituksen lähettämällä POST-pyynnön palvelimelle.
    - Käyttäjä täyttää lomakkeen, joka sisältää harjoituksen tiedot. Lomakkeen tiedot lähetetään palvelimelle.
    - Onnistuneen lisäyksen jälkeen käyttäjälle näytetään ilmoitus ja lomake tyhjennetään.

4. **Harjoitusten muokkaus**
- `showModal` funktio avaa modal-ikkunan, jossa käyttäjä voi muokata valitun harjoituksen tietoja.
- `updateExercise` funktio päivittää valitun harjoituksen tiedot lähettämällä PUT-pyynnön palvelimelle.
    - Onnistuneen päivityksen jälkeen käyttäjälle näytetään ilmoitus, ja modal-ikkuna sulkeutuu.

5. **Harjoitusten poisto**
- `deleteExercise` funktio poistaa valitun harjoituksen lähettämällä DELETE-pyynnön palvelimelle.
    - Käyttäjältä kysytään vahvistus ennen poistoa.
    - Onnistuneen poiston jälkeen käyttäjälle näytetään ilmoitus.

6. **Tervehtiminen ja uloskirjautuminen**
- **Funktio `showUsername`**: Näyttää kirjautuneen käyttäjän nimen sivustolla.
- **Uloskirjautuminen**: Suoritetaan, kun uloskirjautumisnappia painetaan. Poistaa käyttäjätiedot localStoragesta ja ohjaa etusivulle.


### users.html

1. **Käyttäjien haku**
- Kun sivu latautuu, haetaan top 5 aktiivisinta käyttäjää `fetchTop5`-funktiolla.
- `getUsers`-funktio hakee kaikki käyttäjät tietokannasta GET-pyynnöllä.
    - Hakunappi triggeröi `getUsers`-funktion suorituksen.
- Haetut käyttäjät tallennetaan `allUsers`-tauluun ja niistä luodaan taulukko `createUserTable`-funktiolla.

2. **Käyttäjätietojen päivitys ja poisto**
- Käyttäjätietojen muokkaamista ja poistamista varten luodaan dynaamisesti nappeja jokaiselle käyttäjäriville taulukossa.
    - Muokkausnappi avaa muokkauslomakkeen `openEditUser`-funktion kautta, johon ladataan valitun käyttäjän tiedot.
    - Käyttäjätietojen päivitys tapahtuu `updateUser`-funktion avulla, joka lähettää muutetut tiedot PUT-pyynnöllä palvelimelle.
    - Poistonappi triggeröi `deleteUser`-funktion, joka suorittaa DELETE-pyynnön valitun käyttäjän poistamiseksi.


3. **Top 5 Aktiivisimmat käyttäjät**
- `fetchTop5`-funktio hakee top 5 aktiivisinta käyttäjää ja `createTop5Table` luo heistä taulukon.
    - Taulukko sisältää käyttäjänimen, päiväkirjamerkintöjen määrän, harjoitusten määrän ja kokonaismäärän.
    - Aktiivisimmat käyttäjät saavat erikoismerkinnät (🥇, 🥈, 🥉) sijoituksensa mukaan.



4. **Tervehtiminen ja uloskirjautuminen**
- **Funktio `showUsername`**: Näyttää kirjautuneen käyttäjän nimen sivustolla.
- **Uloskirjautuminen**: Suoritetaan, kun uloskirjautumisnappia painetaan. Poistaa käyttäjätiedot localStoragesta ja ohjaa etusivulle.


### medications.html

- Ei ehtinyt tuotantoon

 ## Kuvat käyttöliittymästä

 ### index.html

![Näyttökuva 2024-3-17 kello 19 16 18](https://github.com/Juliusjev/hyte-server/assets/122266761/cbb864ff-1d88-4ab5-be08-0f521dc0905c)


### home.html

![Näyttökuva 2024-3-17 kello 19 17 07](https://github.com/Juliusjev/hyte-server/assets/122266761/2bc4f514-4a87-449e-9abe-1ce78f1d644a)

### entries.html

![Näyttökuva 2024-3-17 kello 19 19 53](https://github.com/Juliusjev/hyte-server/assets/122266761/ccb2fe5c-4c20-4d79-92cf-9c1a3525fd19)

### exerciselog.html

![Näyttökuva 2024-3-17 kello 19 19 47](https://github.com/Juliusjev/hyte-server/assets/122266761/e781656f-4cce-4f40-8aa2-e11105cfa74b)

### users.html

![Näyttökuva 2024-3-17 kello 19 19 11](https://github.com/Juliusjev/hyte-server/assets/122266761/bbc7ccfa-6360-4362-ba76-9fc7dc9143c7)

## Bugit ja to-dot

- Virheiden hallinta ei ole vielä erityisen hyvällä tasolla
    - Tavoite olisi saada käyttäjälle selkeämpiä viestejä mahdollisista virheistä

- Medications-sivuston tekeminen
    - Jäi kokonaan toteuttamatta (keskitytty enemmän ohjelman ja frontin toimivuuteen)
 
- Lisätoiminnallisuuksien rakentaminen
    - Projektin aikana tuli mieleen vaikka mitä mitä voisi vielä toteuttaa

- Koodin siistiminen

- Säännöt eri näyttökooille













