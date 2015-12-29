from exemplo_10_part_1 import Retangulo

class Quadrado (Retangulo):
    def __init__(self, tamanho):
        Retangulo.__init__(self, tamanho, tamanho)
        
    def troca_tamanho(self, para):
        self.lado_a = para
        self.lado_b = para
        
if __name__ == "__main__":
    q = Quadrado(10)
    q.desenha()
    q.troca_tamanho(5)
    q.desenha()
    
    r = Retangulo(3,1)
    r.desenha()
    #r.troca_tamanho(5) #erro
    