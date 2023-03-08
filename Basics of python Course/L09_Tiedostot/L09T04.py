

filename="nimet.txt"
file=open(filename, "r")
tuloste=file.read()
lkm=0
dict={}
samatnimet=[]
tulostevalmis=tuloste.split("\n")
tulostevalmis.sort()
for rivi in tulostevalmis:
    lkm+=1
    value=rivi
    samatnimet.append(rivi)
    dict[lkm] = value

#tämän varmaan olisi voinut tehdä helpommin mutta tehdään nyt alkuun näin

samoja = {i:samatnimet.count(i) for i in samatnimet}

nimiä=len(samoja)
for x, y in samoja.items():
    print(x, y)
print("nimien määrä",nimiä)

file.close()