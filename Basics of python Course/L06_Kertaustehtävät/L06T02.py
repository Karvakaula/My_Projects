def celToFah(cel):
    fah = cel * 1.8 + 32
    vastaus = round(fah, 1)
    return vastaus

def fahtocel(fahren):

    Muunnettu = (fahren - 32) * 5/9
    vastaus = round(Muunnettu,1)
    return vastaus

celssus=float(input("Anna celssius asteet:"))
print(celToFah(celssus))
fahrenheit=float(input("Anna fahrenheit asteet:"))
print(fahtocel(fahrenheit)) 