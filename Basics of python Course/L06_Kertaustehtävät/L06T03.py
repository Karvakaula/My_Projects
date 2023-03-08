maara=0
nimet = []

while True:
    usinput = (input("Anna nimi:"))
    if not usinput:
        break

    else:
        maara+=1
        nimet.append(usinput)

print(nimet)
print(maara)