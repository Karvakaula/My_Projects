
def show_cm(tuuma):
    x=tuuma*2.54
    y=round(x, 2)
    vastaus=f"{tuuma} tuumaa on {y} cm"
    return vastaus

print(show_cm(2))