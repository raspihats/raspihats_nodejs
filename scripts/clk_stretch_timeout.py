#!/usr/bin/env python
import os
import subprocess
from platform import system, linux_distribution


def rpi_clk_stretch_timeout(clk_stretch_timeout, baudrate):
    dest_path = "/usr/local/bin/"
    set_exec_name = "i2c1_set_clkt_tout"
    get_exec_name = "i2c1_get_clkt_tout"
    clkt_tout = int(float(clk_stretch_timeout) * float(baudrate))
    
    try:
        print("Building i2c1 clock stretch timeout setter and getter")
        subprocess.check_output(["gcc","-o", set_exec_name, "i2c1_set_clkt_tout.c"])
        subprocess.check_output(["gcc","-o", get_exec_name, "i2c1_get_clkt_tout.c"])
        print("Copying i2c1 clock stretch timeout setter and getter to " + dest_path)
        subprocess.check_output(["mv",set_exec_name, dest_path])
        subprocess.check_output(["mv",get_exec_name, dest_path])
        print("Setting i2c1 clock stretch timeout value to " + str(clkt_tout))
        print(subprocess.check_output([set_exec_name, str(clkt_tout)]))
        print("Checking i2c1 clock stretch timeout value")
        print(subprocess.check_output([get_exec_name]))
    except subprocess.CalledProcessError, e:
        print "Failed!!!\n", e.output
    
    clks_line = dest_path + set_exec_name + " " + str(clkt_tout)
    
    # Updating rc.local
    # open file with r+b (allow write and binary mode)
    f = open("/etc/rc.local", "r+b")   
    # read entire content of file into memory
    lines = f.readlines()
    
    exit_token = "exit 0"
    updated = False
    for i in range(0, len(lines)):
        if set_exec_name in lines[i]:
            updated = True
            print("rc.local already updated")
            break
        if lines[i].startswith(exit_token):
            lines[i] = lines[i].replace(exit_token, clks_line + "\n\n" + exit_token + "\n")            
            updated = True
            # return pointer to top of file so we can re-write the content with replaced string
            f.seek(0)
            # clear file content 
            f.truncate()
            # re-write the content with the updated content
            f.write("".join(lines))
            # close file
            f.close()
            print("rc.local updated")
            break
        
    if not updated:
        print ("Failed to update rc.local!!!")

    
def main():
    
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    RASPBERRY_PI = 'raspberry-pi'
    
    PLATFORM = 'Unknown'
    if system().lower() == 'linux':
        if linux_distribution()[0].lower() == 'debian':
            try:
                with open('/proc/cpuinfo') as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith('Hardware') and ('BCM2708' in line or 'BCM2709' in line):
                            PLATFORM = RASPBERRY_PI
                            rpi_clk_stretch_timeout(clk_stretch_timeout=0.2, baudrate=100000)
                            break
            except:
                pass
    
    LEGAL_PLATFORMS = RASPBERRY_PI
    assert PLATFORM in LEGAL_PLATFORMS, "Don't understand platform"

if __name__ == '__main__':
  main()
