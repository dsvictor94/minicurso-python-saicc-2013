n1 = raw_input("informe um numero inteiro: ")
n2 = raw_input("informe um outro numero racional: ")
try:
   n1 = int(n1)
except ValueError:
   print "nao eh um numero inteiro"
else:
   try:
        n2 = float(n2)
        print "n1/n2", n1/n2
   except ValueError:
        print "nao eh um numero racional"