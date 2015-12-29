a = open(__file__, "r")
conteudo = a.read()
a.close()
novo = open("copia.py", "w")
novo.write(conteudo)

from datetime import datetime
from random import random
from os import linesep

with open("arquivo_alearorio.txt", "a") as arquivo:
  arquivo.write(str(datetime.now())+": "+str(random())+linesep)
