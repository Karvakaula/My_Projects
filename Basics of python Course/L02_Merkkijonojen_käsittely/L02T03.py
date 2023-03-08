kokonimi = str(input("Anna nimesi:"))
i = kokonimi.find(' ')
etunimi = kokonimi[0:i]
Sukunimi = kokonimi[i:]
print ("Etunimesi:", etunimi)
print ("Sukunimesi:", Sukunimi)