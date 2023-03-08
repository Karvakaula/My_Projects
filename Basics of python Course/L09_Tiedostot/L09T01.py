
filename ="Sukunimiä.txt"
file = open(filename, "w",encoding="utf-8")
nimet=[]
while True:
    nimi=input("Anna sukunimi: ")
    if len(nimi)==0:
        break
    elif len(nimi)!= 0:
        nimet.append(nimi)

for nimi in nimet:
    if nimi != nimet[-1]:
        file.write(nimi + "\n")
    else:
        file.write(nimi)
    


file.close()


    
    
