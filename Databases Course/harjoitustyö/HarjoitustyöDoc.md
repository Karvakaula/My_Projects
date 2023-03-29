
# Tietokanta toteutus 

## Toimeksi-antona on luoda jämäkkä ja kaiken tarpeellisen tiedon sisältävä tietokanta, joka mahdollistaa autokorjaamon toiminnan ja käytännöllisen tiedon hakemisen sekä tallentamisen. Korjaamo myös myy auton kunnossapitoon tarvittavia osia ja työkaluja, joten varaston tilanteen ylläpidon pitää myös olla mahdollista.

Aloitetaan suunnittelemalla tarpeelliset taulut ja niiden sisältämät tietot:

taulut:

asiakas, auto, korjaustyö, ostotapahtuma,tuote,työntekijät,varasto,korjaamo

## taulujen tiedot

### Asiakas:

asiakasID, Primary key, Auto increment, int, NOT NULL

Sukunimi, varchar(64), NOT NULL, 

Etunimi, varchar(64), NOT NULL,

PuhelinNro, int(12), NOT NULL,

Sähköposti varchar(64), DEFAULT NULL

Osoite: varchar(64), default null

### Auto:

AutoID: PRIMARy KEY, auto increment, not null

merkki:

vuosimalli:

VIM(vehicle identification number):

OmistajaID: foreignt key asiakas:asiakasID

### korjaustyö


repairID

AutoID

TyöntekijäID

hinta

päivämäärä

kuvaus

### työntekijät


työntekijäID

etunimi

sukunimi

puhnro

sposti


### Tuote

tuoteID

Sijainti

hinta

Määrä


### Tilaus

TilausID

TilaajaID, foreign key asiakas(asiakasID)

TuoteID

Määrä

päivämäärä

kokonais hinta

### varasto










