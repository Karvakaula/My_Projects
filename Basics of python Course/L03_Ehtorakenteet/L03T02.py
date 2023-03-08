luku1 =int(input("Anna ensimmäinen kokonaisluku:"))
luku2 =int(input("Anna toinen kokonaisluku:"))
luku3 =int(input("anna koolmas kokonaisluku:"))

if (luku1 > luku2 and luku1 > luku3):
    print(luku1)
elif (luku2 > luku1 and luku2 > luku3):
    print(luku2)
else:
    print(luku3)