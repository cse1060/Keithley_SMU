import time
import pandas as pd


def send_command(arduino, command):  # To send commands to the arduino
    arduino.write(command.encode())
    time.sleep(0.1)


def exp1(inst, arduino, src_voltage, tot_duration, iter_num, readings):
    data = pd.DataFrame(data=None, columns=[
                        'id', 'light', 'reading no', 'relative time', 'reading'])

    inst.write("reset()")

    # Setting up the measure function
    inst.write("smu.measure.func = smu.FUNC_DC_CURRENT")
    inst.write("smu.measure.autorange = smu.ON")
    inst.write("smu.measure.nplc = 1")

    # Setting up the source function
    inst.write("smu.source.func = smu.FUNC_DC_VOLTAGE")
    inst.write("smu.source.ilimit.level = 0.1")
    inst.write("smu.source.level = " + str(src_voltage))
    inst.write("smu.source.delay = 0.1")

    # turn on the source
    inst.write("smu.source.output = smu.ON")
    t = tot_duration*60/readings

    for i in range(0, iter_num):

        # LIGHT ON******************************
        # turn the arduino on
        send_command(arduino, "1")

        #  initiate readings
        inst.write(
            '''trigger.model.load("SimpleLoop" , readings ,''' + str(t) + ''' )''')
        inst.write("trigger.model.initiate()")
        inst.write("waitcomplete()")

        # get readings
        readings_data = inst.query(
            "printbuffer(1 , defbuffer1.n , defbuffer1.readings)")
        timestamps = inst.query(
            "printbuffer(1 , defbuffer1.n , defbuffer.relativetimestamps)")

        for j in range(0, len(readings_data)):
            data.loc[len(data)] = [i, "ON", j, timestamps[j], readings_data[j]]

        inst.write("defbuffer1.clear")
        inst.write("delay(0.1)")

        # LIGHT OFF******************************
        # turn the arduino off
        send_command(arduino, "0")

        # initiate reeadings
        inst.write(
            '''trigger.model.load("SimpleLoop" , readings ,''' + str(t) + ''' )''')
        inst.write("trigger.model.initiate()")
        inst.write("waitcomplete()")

        # get readings
        readings_data = inst.query(
            "printbuffer(1 , defbuffer1.n , defbuffer1.readings)")
        timestamps = inst.query(
            "printbuffer(1 , defbuffer1.n , defbuffer.relativetimestamps)")

        for j in range(0, len(readings_data)):
            data.loc[len(data)] = [i, "ON", j, timestamps[j], readings_data[j]]

        inst.write("defbuffer1.clear")
        inst.write("delay(0.1)")

    inst.write("smu.source.level = 0")
    inst.write("delay(2)")
    inst.write("smu.source.output = smu.OFF")

    return data
