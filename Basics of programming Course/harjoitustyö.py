from datetime import date
import os
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
    print("############################################################")

else:
    print("############################################################")
    print("#                                                          #")
    print("#       ei aiempia tiedostoja. Tiedosto lista luotu :)     #")
    print("#                                                          #")
    print("#                                                          #")
    print("############################################################")
    file = open(aiemmattiedostot, "w", encoding="utf-8")



#tässä kysytään haluaako käyttäjä luoda uuden tiedoston vai jatkaa vanhaa, voisi lisätä että haluaako vaik lukea tiedostoja




while not väite1:
        tiedostonimi=input("Anna muokattavan tiedoston nimi tai uusi tiedostonimi: ")
        if len(tiedostonimi)!=0:
            filename ="%s.txt" % tiedostonimi
            väite1=True
        elif tiedostonimi=="Q":
            break
        else:
            print("Anna tiedosto johon kirjoittaa")
            

#Tässä kirjoitetaan tiedostoon.
väite1=False
while not väite1:
    teksti=input("Kirjoita tähän mitä haluat kirjoittaa, jos tahdot lopettaa kirjoita Q ")
    if teksti=="Q":
        väite1=True
        file.close
    elif os.path.exists(filename):
        file = open(filename, "a",encoding="utf-8")
        file.write(päivämäärä +" " + teksti + "\n")
        file.close
    else:
        file = open(filename, "w",encoding="utf-8")
        file.write(päivämäärä +" " + teksti + "\n")
        file.close
        file =open(aiemmattiedostot, "a", encoding="utf-8")
        file.write(päivämäärä + " "+ filename + "\n")
    
        
        
#Kysytään tahtooko käyttäjä lukea tiedoston, tämän voisi laittaa alkuun jos haluaa lukea jo olemassa olevaa tiedostoa..
väite1=False
while not väite1:
    kysymys=input("Tahdotko lukea kirjoitettua tekstiä?: Y/N ")
    if kysymys =="N":
        break
    elif kysymys =="Y":
        try:
            file = open(filename, "r",encoding="utf-8")
            tuloste=file.read()
            print(tuloste)
            väite1=True
        except:
            print("Virhe tiedoston lukemisessa")
        
    
#tiedosto suljetaan.
file.close
