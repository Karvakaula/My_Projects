luvut=int(input("Montako lukua:"))
laskuri = 0
#kun laskurin arvo on sama kuin luvut muuttujalla, while loop loppuu.
while laskuri < luvut:
    kerroin = laskuri * 10
    print(laskuri, "luku:", kerroin)
    laskuri+=1
