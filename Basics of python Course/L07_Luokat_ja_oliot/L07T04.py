class mobile:
    brand=""
    model=""
    price=""

    def __str__(self):
        return self.brand + " " + self.model +  " " + str(self.price) + "€"
    def __init__(self, brand = "", model = "", price = 0):
        self.brand = brand
        self.model = model
        self.price = price


phone1 = mobile("samsung", "Galaxy", 349)
phone2 = mobile("Apple", "Iphone 12", 899)
merkki = input("anna puhelimen merkki ")
käyttis = input("anna puhelimen käyttis ")
hinta = input("anna puhelimen hinta ")
phone3 = mobile(merkki, käyttis, hinta)
print(phone1)
print(phone2)
print(phone3)