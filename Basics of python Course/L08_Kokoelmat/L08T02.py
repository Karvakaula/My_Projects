rekisterit=[]

while True:
    rekkari=input("anna rekkari:")
    if not rekkari:
        break
    else:
        rek_kilpi=rekkari.upper()
        rekisterit.append(rek_kilpi)

rekisterit.sort()

for rekkarit in rekisterit:
    print(rekkarit)