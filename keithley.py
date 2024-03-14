import pyvisa as visa
import serial 
import time
rm = visa.ResourceManager()
address = "TCPIP0::192.0.0.1::inst0::INSTR" #Keithley 2450 SMU
inst = rm.open_resource(address)
initial_voltage = 5.0      #input from the user
experiment_duration= 300
uv_trigger_time = 30
arduino_port = 'COM5'
arduino = serial.Serial(arduino_port, baudrate = 9600, timeout = 1)

def send_command(command):          #To send commands to the arduino
    arduino.write(command.encode())
    time.sleep(1)
inst.write('display.changescreen(display.SCREEN_USER_SWIPE)')
inst.write('display.settext(display.TEXT1, "Test in process")')
inst.write('display.settext(display.TEXT2, "Do not disturb")')
# inst.write("reset()")
# inst.write("smu.source.func = smu.FUNC_DC_CURRENT")
# inst.write("smu.source.vlimit.level = 21")
# inst.write("smu.source.autorange = smu.ON")
# inst.write("smu.source.autodelay = smu.ON")
# inst.write("smu.measure.func = smu.FUNC_DC_VOLTAGE")
# inst.write("smu.measure.autorange = smu.ON")
# inst.write("smu.measure.nplc = 1")
# currlist = [1E-7, 1E-6, 1E-5, 1E-4, 1E-3, 1E-2] # list of currents to source
# voltlist = [None for curr in currlist] # Create an empty array for voltage measurements the
# # same size as our source list
# for i, current in enumerate(currlist): # Loop over the current source list
#     inst.write("smu.source.level = "+str(current))
#     inst.write("smu.source.output = smu.ON")
#     inst.write("smu.measure.read()")
#     inst.write("smu.source.output = smu.OFF")
#     voltlist[i] = inst.query("print(defbuffer1.readings[defbuffer1.endindex])") #
# # Grab the last reading
# voltlist[i] = float(voltlist[i]) # .query returns a string, so it must be casted
# # to a number
# voltDiff = max(voltlist) - min(voltlist)
# print(voltDiff)
start_time = time.time()
try:
    while time.time() - start_time <experiment_duration:
        print("Turning UV light ON")
        send_command("1")
        tsp_script_filename= "experiment.tsp"
        with open(tsp_script_filename, "r") as tsp_file:  
            tsp_script = tsp_file.read()

        inst.write_raw(b"*CLS")
        inst.write(tsp_script)
        inst.write("script.run()")
        time.sleep(uv_trigger_time)
        print("Turning UV light OFF")
        send_command("0")

except KeyboardInterrupt:
    print("Experiment terminated")



