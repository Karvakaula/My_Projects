def average(val1, val2, val3):
    
    summa = float(val1 +val2 +val3)
    keskiarvo=summa/3
    vastaus=round(keskiarvo, 1)
    return vastaus

val1=int(input("anna ensimmäinen luku:"))
val2=int(input("anna toinen luku:"))
val3=int(input("anna kolmas luku:"))

print(average(val1,val2,val3))
