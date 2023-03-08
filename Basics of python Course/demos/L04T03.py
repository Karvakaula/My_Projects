
lkm=0
summa=0

while True:
    val=input("anna luku: ")

    if len(val)==0:
        break

    try:  
        value=int(val)
        summa+=value
        lkm+=1
    except:
        print("ei voita muntaa luvuksi")

print(lkm)
print(summa)