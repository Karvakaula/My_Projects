from multiprocessing.sharedctypes import Value


tottuus=True
while tottuus:
    try:
        syöte=int(input("Syötä vuosiluku: "))
        if (syöte%4 == 0 and syöte%400 == 0) or (syöte%4 == 0 and syöte%100 !=0):
            print(syöte, "on karvausvuosi!")
        else:
            print(syöte, "ei ole karkausvuosi")
    except ValueError:
        print("syötä vain lukuja")


    