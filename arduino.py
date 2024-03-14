import serial 
import time

ser = serial.Serial('COM5', baudrate = 9600, timeout = 1)

def send_command(command):
    ser.write(command.encode())
    time.sleep(1)

if __name__ == "__main__":
    try:
        for i in range(10):
            send_command("1")
            time.sleep(2)
            send_command("0")
            time.sleep(2)

    except KeyboardInterrupt:
        ser.close()
