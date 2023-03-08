from datetime import date
import os
import sys
#muuttujat tästä päivämäärästä
today=date.today()
päivämäärä=today.strftime("%d/%m/%Y")
väite1=False
aiemmattiedostot="Listatiedostoista.txt"

#tässä katsotaan onko tiedosto olemassa ja jos on niin listätään siihen, jos ei niin tehdään se.
if os.path.exists(aiemmattiedostot):
    file = open(aiemmattiedostot, "r",encoding="utf-8")
    tuloste1=file.read()
    print("############################################################")
    print(" ")
    print(tuloste1)
    print(" ")
    print(" ")
    print("Syötä tiedostojen nimet ilman päätettä esim kirjoitus.txt tiedosto, kirjoita vain kirjoitus")
    print("############################################################")

else:
    print("############################################################")
    print("#                                                          #")
    print("#       ei aiempia tiedostoja. Tiedosto lista luotu :)     #")
    print("#                                                          #")
    print("#                                                          #")
    print("############################################################")
    file = open(aiemmattiedostot, "w", encoding="utf-8")
    file.close()



#Tässä tiedoston nimen kysely funktio.
def tiedostonimi():
    väite=False
    while not väite:
        tiedostonimi=input("Anna muokattavan tiedoston nimi tai uusi tiedostonimi: ")
        if len(tiedostonimi)!=0:
            tiedosto ="%s.txt" % tiedostonimi
            väite=True
        elif tiedostonimi=="Q":
            break
        else:
            print("Anna tiedosto johon kirjoittaa")
    return tiedosto
#funktio tiedoston lukuun
def tiedostonluku():
    väite=False
    
    while not väite:
        tiedostonimi=input("Anna luettavan tiedoston nimi (syötä Q lopettaaksesi):")
        tiedosto ="%s.txt" % tiedostonimi
        if os.path.exists(tiedosto):
            try:
                file = open(tiedosto, "r",encoding="utf-8")
                tuloste=file.read()
                print(tuloste)
                file.close
            except MemoryError:
                print("Muisti loppu")
            except:
                print("virhe tiedoston käsitellyssä")
        elif tiedostonimi == "Q":
            väite = True
        else:
            print("joko annoit tyhjän syötteen tai tiedostoa ei ole.")

#kysytään tahtooko käyttäjä lukea olemassa olevaa tiedostoa

while not väite1:
    kysymys2=input("Tahdotko lukea olemassa olevaa tiedostoa? Y/N ")
    if kysymys2 == "Y":
        tiedostonluku()
    elif kysymys2 == "N":
        väite1=True
    else:
        print("Hyväksyy vain Y/N vastaukset")

väite1=False
#kysytään tahtooko käyttäjä tehdä/muokata tiedostoa
while not väite1:
    kysymys1=input("Tahdotko luoda uuden tiedoston tai muokata olemassa olevaa? Y/N  ")
    if kysymys1 == "Y":
        filename=tiedostonimi()
        #break koska väite1=True ei jostain syystä tässä pelannut, pyöri tätä ehtolauseketta kokoajan ympäri.
        break
    elif kysymys1 =="N":
        print("Vastaus N")
        sys.exit("Suljetaan ohjelma")
    else:
        print("Hyväksyy vain syötteen Y/N")








#Tässä kirjoitetaan tiedostoon.
väite1=False
while not väite1:
    teksti=input("Kirjoita tähän mitä haluat kirjoittaa, jos tahdot lopettaa kirjoita Q ")
    if teksti=="Q":
        väite1=True
        file.close
    elif os.path.exists(filename):
        try:
            file = open(filename, "a",encoding="utf-8")
            file.write(päivämäärä +" " + teksti + "\n")
            file.close
        except MemoryError:
            print("muisti loppu")
        except:
            print("virhe tiedoston käsittelyssä")
    else:
        try:
            file = open(filename, "w",encoding="utf-8")
            file.write(päivämäärä +" " + teksti + "\n")
            file.close
            file =open(aiemmattiedostot, "a", encoding="utf-8")
            file.write(päivämäärä + " "+ filename + "\n")
        except MemoryError:
            print("Muisti loppu")
        except:
            print("virhe tiedoston käsittelyssä")
    
        
        
#Kysytään tahtooko käyttäjä lukea tiedoston, tämän voisi laittaa alkuun jos haluaa lukea jo olemassa olevaa tiedostoa..
väite1=False
while not väite1:
    kysymys3=input("Tahdotko lukea kirjoittamaasi tekstiä?: Y/N ")
    if kysymys3 =="N":
        break
    elif kysymys3 =="Y":
        try:
            file = open(filename, "r",encoding="utf-8")
            tuloste=file.read()
            print(tuloste)
            väite1=True
        except:
            print("Virhe tiedoston lukemisessa")
    else:
        print("hyväksyy vain syötteen Y/N ")    
         
    
#tiedosto suljetaan.
file.close
