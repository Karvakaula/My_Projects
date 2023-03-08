filename="luvut.txt"
file=open(filename,"w", encoding="utf-8")
lkm=0
lista=[]
while True:
    luku=input("Anna luku: ")
    if len(luku)==0:
        break
    try:  
        value=int(luku)
        lkm+=1
        lista.append(value)

    except ValueError:
        print("ei voita muntaa luvuksi")
    except:
        print("Jokin muu virhe")

try:
    for nimi in lista:
        file.write(str(nimi) + "\n")
    file.write("Syötetty:" + str(+lkm))
except:
    print("tiedoston käsittelyssä ongelma")

file.close()