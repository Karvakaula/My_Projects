filename="test.txt"

tiedosto=open(filename,"r",encoding="utf-8")

result=tiedosto.read()

print(result)


tiedosto.close()

tiedosto=open(filename,"r",encoding="utf-8")

result=tiedosto.readlines()

print(result)

tiedosto.close()


tiedosto=open(filename,"r",encoding="utf-8")

for rivi in tiedosto:
    print(rivi)

tiedosto.close()