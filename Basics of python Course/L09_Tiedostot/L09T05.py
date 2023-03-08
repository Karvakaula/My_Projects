import random
filename="lotto.txt"
file=open(filename, "w")
Luvut=set()
Lottorivit=[]
rivi=1


try:

    rivimaara=int(input("Montakoa riviä arvotaan: "))

    for i in range(rivimaara):
        Luvut.clear()
        Lottorivit.clear()
        while len(Luvut) < 7:
            luku=random.randint(1, 40)
            Luvut.add(luku)
        Lottorivit=list(Luvut)
        Lottorivit.sort()
        file.write("rivi"+ str(rivi)+":" + str(Lottorivit)+"\n")
        rivi+=1
        print(Lottorivit)

except:
    print("Syöte ei ollut luku")

file.close()