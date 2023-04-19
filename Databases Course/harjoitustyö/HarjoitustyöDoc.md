
# Tietokanta toteutus 

Ensin suunnittelimme tietokanna rakenteen, taulut ja yhteydet.

## Taulut:

	


# Luodaan tietokanta: 

-- Luodaan taulu asiakkaille
CREATE TABLE customer (
  id INT PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(50)
);

-- Luodaan taulu autoille
CREATE TABLE car (
  id INT PRIMARY KEY,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  odometer INT NOT NULL,
  customer_id INT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);

-- Luodaan taulu huoltojen varaamiselle
CREATE TABLE service (
  id INT PRIMARY KEY,
  date DATE NOT NULL,
  car_id INT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES car(id)
);

-- Luodaan taulu korjaustöille
CREATE TABLE repair (
  id INT PRIMARY KEY,
  price DECIMAL(10,2) NOT NULL CHECK (price >=0),
  name VARCHAR(100) NOT NULL
);

-- Luodaan taulu autojen ja korjaustöiden väliselle suhteelle
CREATE TABLE car_repair (
  car_id INT NOT NULL,
  repair_id INT NOT NULL,
  hours INT NOT NULL CHECK (hours >=0),
  total DECIMAL(10,2) NOT NULL CHECK (total >=0),
  PRIMARY KEY (car_id, repair_id),
  FOREIGN KEY (car_id) REFERENCES car(id),
  FOREIGN KEY (repair_id) REFERENCES repair(id)
);

-- Luodaan taulu työntekijöille
CREATE TABLE employee (
  id INT PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(50),
  hiredate DATE NOT NULL,
  jobtitle VARCHAR(50) NOT NULL
);

-- Luodaan taulu työntekijöiden ja korjaustöiden väliselle suhteelle
CREATE TABLE employee_repair (
  employee_id INT NOT NULL,
  repair_id INT NOT NULL,
  PRIMARY KEY (employee_id, repair_id),
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (repair_id) REFERENCES repair(id)
);

-- Luodaan taulu varastossa oleville tuotteille
CREATE TABLE item (
  id INT PRIMARY KEY,
  price DECIMAL(10,2) NOT NULL CHECK (price >=0),
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL
);

-- Luodaan taulu varaston tilalle
CREATE TABLE itemstorage (
  id INT PRIMARY KEY,
  capacity INT NOT NULL
);

-- Luodaan taulu tuotteiden ja varaston väliselle suhteelle
CREATE TABLE item_storage (
  item_id INT NOT NULL,
  storage_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity >=0),
  PRIMARY KEY (item_id, storage_id),
  FOREIGN KEY (item_id) REFERENCES item(id),
  FOREIGN KEY (storage_id) REFERENCES itemstorage(id)
);

## lisätään testidataa


INSERT INTO customer (id, firstname, lastname, phone, email)
VALUES
(1, 'Matti', 'Meikäläinen', '0401234567', 'matti.meikalainen@example.com'),
(2, 'Sanna', 'Virtanen', '0509876543', 'sanna.virtanen@example.com'),
(3, 'Jari', 'Korhonen', '0412345678', 'jari.korhonen@example.com'),
(4, 'Liisa', 'Lahtinen', '0518765432', 'liisa.lahtinen@example.com'),
(5, 'Pekka', 'Mäkinen', '0423456789', 'pekka.makinen@example.com'),
(6, 'Minna', 'Niemi', '0527654321', 'minna.niemi@example.com'),
(7, 'Juha', 'Laine', '0434567890', 'juha.laine@example.com'),
(8, 'Anna', 'Koskinen', '0536543210', 'anna.koskinen@example.com'),
(9, 'Timo', 'Heikkinen', '0445678901', 'timo.heikkinen@example.com'),
(10, 'Maria', 'Lehto', '0545432109', 'maria.lehto@example.com');

-- Lisätään testidataa autoille
INSERT INTO car (id, make, model, odometer, customer_id)
VALUES
(1, 'Toyota', 'Corolla', 150000, 1),
(2, 'Volkswagen', 'Golf', 120000, 2),
(3, 'Ford', 'Focus', 90000, 3),
(4, 'Nissan', 'Micra', 80000, 4),
(5, 'Honda', 'Civic', 110000, 5),
(6, 'Skoda', 'Octavia', 130000, 6),
(7, 'Volvo', 'V40', 140000, 7),
(8, 'Hyundai', 'i20', 70000, 8),
(9, 'Kia', 'Rio', 60000, 9),
(10, 'Renault', 'Clio', 100000, 10);

-- Lisätään testidataa huoltojen varaamiselle
INSERT INTO service (id, date, car_id)
VALUES
(1, '2023-04-20', 1),
(2, '2023-04-21', 2),
(3, '2023-04-22', 3),
(4, '2023-04-23', 4),
(5, '2023-04-24', 5),
(6, '2023-04-25', 6),
(7, '2023-04-26', 7),
(8, '2023-04-27', 8),
(9, '2023-04-28', 9),
(10, '2023-04-29', 10);

-- Lisätään testidataa korjaustöille
INSERT INTO repair (id, price, name)
VALUES
(1, 50.00, 'Öljynvaihto'),
(2, 100.00, 'Jarrupalat'),
(3, 400.00, 'Renkaat'),
(4, 300.00, 'Tuulilasi'),
(5, 200.00, 'Jakohihna'),
(6, 150.00, 'Akku'),
(7, 250.00, 'Ilmastointi'),
(8, 200.00, 'Pakoputki'),
(9, 300.00, 'Kytkin'),
(10, 400.00, 'Iskunvaimentimet');

-- Lisätään testidataa autojen ja korjaustöiden väliselle suhteelle
INSERT INTO car_repair (car_id, repair_id, hours, total)
VALUES
(1 ,1 ,1 ,175.00),
(1 ,2 ,2 ,350.00),
(2 ,3 ,4 ,900.00),
(2 ,4 ,3 ,675.00),
(3 ,5 ,2 ,450.00),
(3 ,6 ,1 ,275.00),
(4 ,7 ,3 ,625.00),
(4 ,8 ,2 ,450.00),
(5 ,9 ,4 ,900.00),
(5 ,10 ,5 ,1100.00),
(6 ,1 ,1 ,175.00),
(6 ,3 ,4 ,900.00),
(7 ,2 ,2 ,350.00),
(7 ,4 ,3 ,675.00),
(8 ,5 ,2 ,450.00),
(8 ,7 ,3 ,625.00),
(9 ,6 ,1 ,275.00),
(9 ,8 ,2 ,450.00),
(10 ,9 ,4 ,900.00),
(10 ,10 ,5 ,1100.00);

-- Lisätään testidataa työntekijöille
INSERT INTO employee (id, firstname, lastname, phone, email, hiredate, jobtitle)
VALUES
(1, 'Eero', 'Aho', '0401111111', 'eero.aho@example.com', '2020-01-01', 'Mekaanikko'),
(2, 'Sari', 'Saari', '0502222222', 'sari.saari@example.com', '2020-02-02', 'Mekaanikko'),
(3, 'Antti', 'Ahonen', '0413333333', 'antti.ahonen@example.com', '2020-03-03', 'Mekaanikko'),
(4, 'Leena', 'Lehtinen', '0514444444', 'leena.lehtinen@example.com', '2020-04-04', 'Mekaanikko'),
(5, 'Markku', 'Mäki', '0425555555', 'markku.maki@example.com', '2020-05-05', 'Mekaanikko'),
(6, 'Hanna', 'Hakala', '0526666666', 'hanna.hakala@example.com', '2020-06-06', 'Myyjä'),
(7, 'Jussi', 'Jokinen', '0437777777', 'jussi.jokinen@example.com', '2020-07-07', 'Myyjä'),
(8, 'Riitta', 'Ranta', '0538888888', 'riitta.ranta@example.com', '2020-08-08', 'Myyjä'),
(9, 'Tomi', 'Tuominen', '0449999999', 'tomi.tuominen@example.com', '2020-09-09', 'Päällikkö'),
(10, 'Laura', 'Laine', '0540000000', 'laura.laine@example.com', '2020-10-10', 'Päällikkö');

-- Lisätään testidataa työntekijöiden ja korjaustöiden väliselle suhteelle
INSERT INTO employee_repair (employee_id, repair_id)
VALUES
(1 ,1),
(1 ,2),
(2 ,3),
(2 ,4),
(3 ,5),
(3 ,6),
(4 ,7),
(4 ,8),
(5 ,9),
(5 ,10),
(6 ,1),
(6 ,3),
(7 ,2),
(7 ,4),
(8 ,5),
(8 ,7),
(9 ,6),
(9 ,8),
(10 ,9),
(10 ,10);

-- Lisätään testidataa varastossa oleville tuotteille
INSERT INTO item (id, price, name, type)
VALUES
(1, 10.00, 'Öljy', 'Neste'),
(2, 15.00, 'Jarruneste', 'Neste'),
(3, 20.00, 'Jäähdytysneste', 'Neste'),
(4, 25.00, 'Jarrupalat', 'Osat'),
(5, 100.00, 'Renkaat', 'Osat'),
(6, 75.00, 'Tuulilasi', 'Osat'),
(7, 50.00, 'Jakohihna', 'Osat'),
(8, 37.50, 'Akku', 'Osat'),
(9, 62.50, 'Ilmastointi', 'Osat'),
(10, 50.00, 'Pakoputki', 'Osat');

-- Lisätään testidataa varaston tilalle
INSERT INTO itemstorage (id, capacity)
VALUES
(1, 1000);

-- Lisätään testidataa tuotteiden ja varaston väliselle suhteelle
INSERT INTO item_storage (item_id, storage_id, quantity)
VALUES
(1 ,1 ,100),
(2 ,1 ,50),
(3 ,1 ,75),
(4 ,1 ,25),
(5 ,1 ,40),
(6 ,1 ,10),
(7 ,1 ,15),
(8 ,1 ,20),
(9 ,1 ,30),
(10 ,1 ,35);

## Tehdään testi hakuja tietokannasta

Execute:
> SELECT c.firstname, a.id, a.make, a.model 
FROM customer c
Inner join car a
	on a.customer_id = c.id

+ -------------- + ------- + --------- + ---------- +
| firstname      | id      | make      | model      |
+ -------------- + ------- + --------- + ---------- +
| Matti          | 1       | Toyota    | Corolla    |
| Sanna          | 2       | Volkswagen | Golf       |
| Jari           | 3       | Ford      | Focus      |
| Liisa          | 4       | Nissan    | Micra      |
| Pekka          | 5       | Honda     | Civic      |
| Minna          | 6       | Skoda     | Octavia    |
| Juha           | 7       | Volvo     | V40        |
| Anna           | 8       | Hyundai   | i20        |
| Timo           | 9       | Kia       | Rio        |
| Maria          | 10      | Renault   | Clio       |
+ -------------- + ------- + --------- + ---------- +
10 rows



## UI:n luonti

Aloin aluksi opiskelemaan kuinka yhdistää tietokantaan php:llä

Sitten toteutin alustavan sivuston meidän autokorjaamolle

Sivustolta saa varattua ajan auto korjaukseen ja auton ja asiakkaan tiedot siirtyy tietokantaan

Tiedoista muodostuu myös rivi repairjob tauluun.

Sivun shop osiossa olisi tarkoitus pystyä lisäämään tavaroita ostoskoriin ja tilaamaan ne.

Tällä hetkellä sivu tulostaa tietokannassa olevat tuotteet sivulle.

Sivu on jäänyt toistaiseksi kesken mutta tässä tämän vaiheen tulos 




