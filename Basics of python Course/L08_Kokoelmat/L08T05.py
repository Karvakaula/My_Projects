import random

def lotto():
    setti=set()

    while len(set1) < 7:
        numerot=random.randint(1,40)
        setti.add(numerot)
    lista=list(setti)
    lista.sort()
    tulos=str(lista)[1:-1]
    return tulos

print(lotto())