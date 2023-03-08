class Car:
    brand = ""
    model = ""
    price = 0
    def str(self):
        return self.brand + " " + self.model + " " + str(self.price) + "€"
    def init(self, brand = "", model = "", price = 0):
        self.brand = brand
        self.model = model
        self.price = price