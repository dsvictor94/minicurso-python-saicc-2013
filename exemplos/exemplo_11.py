# -*- coding: utf-8 -*-
from threading import Thread

class Concorente(Thread):
    def __init__(self, nome):
        Thread.__init__(self)
        self.nome = nome
        
    def run(self):
        for i in range(10):
            print self.nome +": "+str(i)

c1 = Concorente("c1")
c2 = Concorente("c2")

c1.start()
c2.start()