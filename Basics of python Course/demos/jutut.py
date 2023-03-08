


class Book:
    author=""
    title=""
    on_loan=False

    def __init__(self,author="",title=""):
        self.author=author
        self.title=title

    def __str__(self):
        text="kirjailija :" + self.author
        text=text+" teos :"+self.title
        return text

    def loan(self):
        self.on_loan=True