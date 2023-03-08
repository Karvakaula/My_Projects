#määritellään muuttujat
nimi =str(input("Anna etunimesi:"))
#kirjainten määrä
kirjaimet = len(nimi)
#eka kirjain
eka = (nimi[0])
#kirjainten määrä * eka kirjain
vastaus = kirjaimet * eka
print ("Nimessäsi", nimi, "on", kirjaimet, "kirjainta.")
print (vastaus)