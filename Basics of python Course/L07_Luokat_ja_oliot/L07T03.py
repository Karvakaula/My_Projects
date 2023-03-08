
from turtle import color


class Cat:
    name=""
    color=""

    def __str__(self):
        text=self.name+", color: "+ self.color
        return text
        
    def miau(self):
        print("meoooooooow!")

kissa1=Cat()
kissa1.name="kit"
kissa1.color="black"

print(kissa1)
kissa1.miau()
kissa2=Cat()
kissa2.name="kat"
kissa2.color="white"

print(kissa2)
kissa2.miau()
