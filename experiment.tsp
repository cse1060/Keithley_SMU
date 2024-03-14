reset()
beeper.enable = false 
smu.source.func = smu.FUNC_DC_VOLTAGE
smu.source.rangev = 10  -- Set voltage range to 10V
smu.source.levelv = initial_voltage  
smu.measure.func = smu.FUNC_DC_CURRENT
smu.measure.rangei = 1e-3  
smu.measure.delay = 1   
smu.measure.nplc = 1    
smu.source.output = smu.OUTPUT_ON

-- Create a buffer to store measurements
buffer1.clear()
buffer1.appendmode = 1

-- Define a measurement loop
for i=1, 100 do 
    buffer1.append(smu.measure())
    wait(1)  
end

-- Turn off the output
smu.source.output = smu.OUTPUT_OFF

-- Save the acquired data to a file
buffer1.save("measurement_data.txt")

-- Beep to indicate the end of the measurement
beeper.beep(1, 1000)

print("Measurement complete.")


reset()

--set up measure function
smu.measure.func = smu.FUNC_DC_CURRENT
smu.measure.autorange = smu.ON
smu.measure.nplc = 1

--set up source function
smu.source.func = smu.FUNC_DC_VOLTAGE