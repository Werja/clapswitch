/**
 * these functions are used to integrate a clapper switch
 * into other programs. Wait4Clap waits in the foreground
 * until a double clap is detected. 
 * The maximum waiting time is limited by the timeout pins.analogWritePin(AnalogPin.P1, 1023). 
 * The "switch on" function shows the state of the switch
 * and the "switched" functin serves as flag.
 */
let clapswitch: boolean;
clapswitch = true
let oldswitch: boolean;
oldswitch = false
//% color="#AA278D" weight=0 icon="\uf2a7" block='clapSwitch'
//% block.loc.de='Klatschschalter'
namespace clapSwitch {
     /**
     * Wait for double clap until timeout 
     */    
    //% block weight=2
    //% block='wait4clapTimeout'
    //% block.loc.de='Timeout für Doppelklatschen %time'
    //% jsdoc.loc.de='Warte auf Doppelklatschen bis zum timeout'
    //% time.defl=1000
    export function wait4clapTimeout(time: number) {
        let t: number;
        let lz = input.runningTime() + time
        while (input.runningTime() < lz) {
            if (input.soundLevel() > 60) {
                basic.pause(50)
                if (input.soundLevel() < 30) {
                    t = input.runningTime()
                    t += 500
                    while (input.soundLevel() < 60 && input.runningTime() < t) {
                    
                    }
                    if (input.runningTime() < t) {
                        basic.pause(50)
                        if (input.soundLevel() < 30) {
                            //  switch Signal
                            clapswitch = !clapswitch
                            // break 
                            lz -= time
                        }
                    }
                }
            }
        }
    }
    //% block weight=1
    //% block='switchOn'
    //% block.loc.de='Schalter an?'
    //% jsdoc.loc.de='liefert wahr, wenn Schalter an ist'
    export function switchOn() {
        return clapswitch
    }
    /**
    * True or False 
    */ 
    //% block weight=0
    //% block='switched'
    //% block.loc.de='geklatscht wurde'
    //% jsdoc.loc.de='liefert wahr, wenn geklatscht wurde'
    export function switched() {
        if (clapswitch != oldswitch) {
            oldswitch = clapswitch
            return true}
        else {
            return false
        }
    }   
}