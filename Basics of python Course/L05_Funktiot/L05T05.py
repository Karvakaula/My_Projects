def get_fuel(km, kulutus, hinta):
    kilometrit=km/100
    polttoaine=kilometrit * kulutus 
    desimaali=float(polttoaine)
    polttoaine_hinta=desimaali * hinta
    vastaus=round(polttoaine_hinta, 2)
    return vastaus

km = int(input("Anna ajetut kilometrit:")) 
kulutus = float(input("Anna keskikulutus:"))
hinta=float(input("Anna polttoaineen hinta:"))
#print(get_fuel(km, kulutus, hinta))
print(get_fuel(km, kulutus, hinta), "€")