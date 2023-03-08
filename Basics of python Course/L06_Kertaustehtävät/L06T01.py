import time


def muunnin(sekat):
    Muunnetut = time.strftime("%H:%M:%S", time.gmtime(sekat))
    return Muunnetut

#def convert(secs):
  #  minuutit, sekunnit = divmod(secs, 60)
   # tunnit, minuutit = divmod(minuutit,60)
    #vastaus = 
    #return tunnit, minuutit, sekunnit
    

sec = int(input("Anna sekuntit:"))
print(muunnin(sec))