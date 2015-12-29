import socket

BLIND = ("", 3000)
servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
servidor.bind(BLIND)
servidor.listen(1)
print "aguardando cliente.."
cliente, endereco = servidor.accept()
print "conectado com ", endereco
print "ele enviou:", cliente.recv(1024)
print "respondendo oi"
cliente.send("oi")
cliente.close()
servidor.close()
