
annetut = 0
summa = 0
luku = 0
while True:
    usinput =(input("Anna luku:"))
    if not usinput:
        break
        
    else:
        value = int(usinput)
        annetut+=1
        summa+=value
    

print("Lukuja annettu:", annetut)
print("Lukujen summa on:", summa)

