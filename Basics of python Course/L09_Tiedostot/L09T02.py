filename="sukunimiä.txt"
file = open(filename, "r")
tuloste=file.read()
print(tuloste)
print("")


tulostevalmis=tuloste.split("\n")
tulostevalmis.sort()
for rivi in tulostevalmis:
    print(rivi)

file.close()