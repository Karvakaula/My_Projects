pisteet = 0
summa = 0
kaikki_pisteet= []
for x in range(5):
    pisteet = int(input("Arvostele hyppy 1-20:"))
    if pisteet < 1 or pisteet > 20:
        print ("Anna pienempiä lukuja ")
    kaikki_pisteet.append(pisteet)
    

kaikki_pisteet.remove(max(kaikki_pisteet))
kaikki_pisteet.remove(min(kaikki_pisteet))
loppuluku=sum(kaikki_pisteet)
print("Yhteis pisteet:", loppuluku)