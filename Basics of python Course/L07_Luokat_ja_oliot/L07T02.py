
class Human:
    name=""
    age=""

    
    def __str__(self):
        text =f"nimi: {self.name} ikä: {self.age}"
        return text

ihminen1=Human()
ihminen1.name="Adam"
ihminen1.age= 19

print(ihminen1)

ihminen2=Human()
ihminen2.name="Eeva"
ihminen2.age=18

print(ihminen2)