# -*- coding: cp1252 -*-
nomes = []
while len(nomes) < 3:
    nome = raw_input("informe o nome do "+str(len(nomes)+1)+"°  integrante: ")
    if nome:
        nomes.append(nome)
    else:
        print "tente nomamente"

print "Olá {0}, {1} e {2}".format(nomes[0], nomes[1], nomes[2])