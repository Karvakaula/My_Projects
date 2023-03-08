
Totuus=True
arvosanat=[]
arvsana_sum=0

while True:
    arvosana =(input("Anna arvosana: "))
    if not arvosana:
        break
    if arvosana.isdigit():
        arvosanat.append(int(arvosana))

arvosanojen_summa=sum(arvosanat)
arvosana_määrä=len(arvosanat)
keskiarvo=arvosanojen_summa / arvosana_määrä

print(arvosana_määrä)
print(keskiarvo)

    


    




