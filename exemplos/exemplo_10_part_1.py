# -*- coding: UTF-8 -*-
class Retangulo:
    def __init__(self, lado_a, lado_b):
        self.lado_a = lado_a
        self.lado_b = lado_b
        
    def desenha(self):
        print "┌"+"─"*(self.lado_a*3)+"┐"
        for i in range(self.lado_b):
            print "│"+" "*(self.lado_a*3)+"│"
        print "└"+"─"*(self.lado_a*3)+"┘"
if __name__ == "__main__":      
    r1 = Retangulo(2,2)
    r2 = Retangulo(3,2)

    r1.desenha()
    r2.desenha()
else:
    print "modulo "+__name__+" que contem Retangulo foi importado"