
def get_fuel(km, kulutus):
    kilometrit=km/100
    polttoaine=kilometrit * kulutus
    desimaali=float(polttoaine)
    vastaus=round(polttoaine, 1)
    return vastaus

km = int(input("Anna ajetut kilometrit:")) 
kulutus = float(input("Anna keskikulutus:"))
vastaus = get_fuel(km, kulutus)
print(vastaus)