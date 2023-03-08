from datetime import date

nyt = date.today()
vuosinyt = int(nyt.strftime("%Y"))

nimi = str(input("Nimesi: "))
synvuos = int(input("Syntymävuotesi:"))
ikä = vuosinyt - synvuos
print("Hei",nimi,"olet",ikä, "vuotias!")
