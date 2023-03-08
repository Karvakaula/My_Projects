
filename="test.txt"

tiedosto=open(filename,"w",encoding="utf-8")

tiedosto.write("kirjoitetaan\n")
tiedosto.write("jännää\n")


tiedosto.writelines(["abba","ac-dc"])
tiedosto.close()
