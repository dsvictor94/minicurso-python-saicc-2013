import socket
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('localhost', 3000))
print "envinado ola"
s.send("ola")
print "lendo "+s.recv(1024)
s.close()