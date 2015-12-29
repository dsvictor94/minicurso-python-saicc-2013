# -*- coding: UTF-8 -*-
import random

def limpa(l=20):
    print "\n"*l
    
def imprime_jogo(jogo):
    print " %s │ %s │ %s " % tuple(jogo[:3])
    print "───┼───┼───"
    print " %s │ %s │ %s " % tuple(jogo[3:6])
    print "───┼───┼───"
    print " %s │ %s │ %s " % tuple(jogo[6:9])
    
def ganho(jogo):
    for i in range(3):
        if jogo[0+(i*3)] == jogo[1+(i*3)] == jogo[2+(i*3)]:
            return jogo[0+(i*3)]
        if jogo[i+(0*3)] == jogo[i+(1*3)] == jogo[i+(2*3)]:
            return jogo[i+(0*3)]
    if jogo[0] == jogo[4] == jogo[8]:
        return jogo[0]
    if jogo[2] == jogo[4] == jogo[6]:
        return jogo[2]
    return None    

def velha(jogo):
    for i in jogo:
        if "X" != i != "O":
            return False
    return True

def joga(p, jogo, jogador):
    try: 
        p = int(p)
    except:
        return False
    if not 0 <= p < 9:
        return False
        
    if "X" != jogo[p] != "O":
        jogo[p] = jogador
        return True
    else:
        return False

jogo = range(9)
jogador = None
while not ganho(jogo):
    limpa()
    if jogador == "X":
        jogador = "O"
    else:
        jogador = "X"

    imprime_jogo(jogo)
    local = None
    while not joga(local, jogo, jogador):
        if jogador == "X":
            local = raw_input("[jogador '%s'] informe o numero que deseja jogar: " % jogador)
        else:
            local = random.randrange(9)
        
    if velha(jogo):
        limpa()
        print "deu velha"
        break
else:
    limpa()
    imprime_jogo()
    print "o jogador '%s' ganhou" % jogador