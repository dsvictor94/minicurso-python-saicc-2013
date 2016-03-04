c = range(9)
jogador = "X"
#c = [0,1,2,3,4,5,6,7,8]
while True:
   print ""
   print ""
   print ""
   print " "+str(c[0])+" | "+str(c[1])+" | "+str(c[2])+" "
   print "-----------"
   print " "+str(c[3])+" | "+str(c[4])+" | "+str(c[5])+" "
   print "-----------"
   print " "+str(c[6])+" | "+str(c[7])+" | "+str(c[8])+" "
   print ""
   local = None
   while not local:
     local = raw_input("[jogador "+jogador+"] informe o numero que deseja jogar: ")
   c[int(local)] = jogador
   
   if jogador == "X":
     jogador = "O"
   else:
     jogador = "X"