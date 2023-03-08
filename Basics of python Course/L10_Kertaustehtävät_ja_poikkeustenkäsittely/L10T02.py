
def kerro3(ikä):
    palaute=str
    if ikä < 13:
        palaute="Child"
    elif 13 <= ikä <= 19:
        palaute="teen"
    elif 12 <= ikä <= 65:
        palaute="adult"
    else:
        palaute="senior"
    return palaute


ikä=int(input("Anna ikäsi: "))
print(kerro3(ikä))
