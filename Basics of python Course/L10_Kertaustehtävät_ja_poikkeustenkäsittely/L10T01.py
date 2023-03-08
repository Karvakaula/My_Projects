saldo=2000
print(f"Bank account balance: ", saldo, "€")
väite1=False
while not väite1:
    try:  
        syöte1=int(input("How many euros will be added to the balance? "))
        väite1=True
        
    except ValueError:
        print("ei voita muntaa luvuksi")

    except:
        print("Jokin muu virhe")

väite2=False
while not väite2:
    try:  
        syöte2=input("How many cents will be added to the balande? ")
        sentit=float(syöte2)
        sentit /= 100
        väite2=True
       
    except ValueError:
        print("ei voita muntaa luvuksi")
    except:
        print("Jokin muu virhe")

if väite2 and väite1:
    talletus=syöte1+sentit
    saldo+=talletus
    loppusaldo=round(saldo, 2)
    print(f"Bank account balance: ",loppusaldo, "€")