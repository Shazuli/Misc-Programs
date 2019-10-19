class item {
    
    layer1
    layer2

    x
    y
    
    constructor(x,y, layer1, layer2) {
        this.layer1 = layer1
        this.layer2 = layer2

        this.x = x
        this.y = y
    }

    getLayer1() {
        return this.layer1
    }

    getLayer2() {
        return this.layer2
    }


    draw() {
        if (this.layer2 == null)
            tint(primRedS.value(),primGreenS.value(),primBlueS.value())
        else
            tint(255,255,255)
        image(this.layer1,this.x,this.y,sizeMult,sizeMult)
        if (this.layer2 != null) {
            tint(primRedS.value(),primGreenS.value(),primBlueS.value())
            image(this.layer2,this.x,this.y,sizeMult,sizeMult)
        }
    }

    

}