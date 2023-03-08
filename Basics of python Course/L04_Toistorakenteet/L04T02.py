laskin = 0
summa = 0
while laskin <= 7:
    sade = int(input("Anna sademäärä:"))
    summa+=sade
    laskin+=1
    if laskin == 7:
        print("sademäärä yhteensä:", summa)
        break
