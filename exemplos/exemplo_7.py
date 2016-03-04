def ehNatural(num, incluiZero=True):
    if int(num) != num:
        return False
    if incluiZero:
        return num >= 0
    else:
        return num > 0

print "10.5 eh natural? ", ehNatural(10.5)
print "0 eh natural sem o zero?", ehNatural(0, False)
print "0 eh natural com o zero?", ehNatural(0, True)
print "-1 eh natural sem o zero?", ehNatural(incluiZero=False, num=-1) 
print "5 eh natural com o zero?", ehNatural(5) 