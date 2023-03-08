from jutut import Book


kirja=Book("Mikko Hyppönen","Internet")

print(kirja)

kirja.loan()

#kirja.title="jännittääkö"
print(kirja)
print(kirja.on_loan)