const vs = "ABCabcT", scale = 100;

class Triangle {

    constructor(A,B,C,a,b,c,T) {
        this.setValues(A,B,C,a,b,c,T);
    }

    hasValues() {
        let s = ""
        for (let c of vs)
            if (this.getValue(c) > 0)
                s = s + c;
        return s;
    }

    canCalc(params,values) {
        values = values || this.hasValues();
        for (let c of params)
            if (!values.includes(c))
                return false;
        return true;
    }

    getValue(v,inDegrees) {
        switch (v) {
            case 'A': return inDegrees ? round(toDeg(this.A),3) : this.A || 0;
            case 'B': return inDegrees ? round(toDeg(this.B),3) : this.B || 0;
            case 'C': return inDegrees ? round(toDeg(this.C),3) : this.C || 0;

            case 'a': return round(this.a,3) || 0;
            case 'b': return round(this.b,3) || 0;
            case 'c': return round(this.c,3) || 0;

            case 'T': return this.T || 0;

            default: return 0;
        }
    }

    setValue(v,newValue) {
        let s = true;
        switch (v) {
            case 'A': this.A = newValue;
            case 'B': this.B = newValue;
            case 'C': this.C = newValue;

            case 'a': this.a = newValue;
            case 'b': this.b = newValue;
            case 'c': this.c = newValue;

            case 'T': this.T = newValue;

            default: s = false;
        }
        return s;
    }

    setValues(A,B,C,a,b,c,T) {
        this.A = A||0;this.B = B||0;this.C = C||0;
        this.a = a||0;this.b = b||0;this.c = c||0;
        this.T = T||0;
    }

    calc_A() {
        let values = this.hasValues();

        if (this.canCalc("BC",values)) {
            this.A = Math.PI - (this.B + this.C);

        } else if (this.canCalc("BcT",values)) {
            this.A = Math.asin(2*this.T/this.b*this.c); // Fix.

        } else if (this.canCalc("Bab",values)) {
            this.A = Math.asin(Math.sin(this.B)*this.a/this.b);

        } else if (this.canCalc("Cac",values)) {
            this.A = Math.asin(Math.sin(this.C)*this.a/this.c);

        } else {
            return false;

        }
        return !isNaN(this.A);
    }

    calc_B() {
        let values = this.hasValues();

        if (this.canCalc("AC",values)) {
            this.B = Math.PI - (this.A + this.C);

        } else if (this.canCalc("acT",values)) {
            this.B = Math.asin((2*this.T)/(this.a*this.c)); // Fix.

        } else if (this.canCalc("Aab",values)) {
            this.B = Math.asin((Math.sin(this.A)*this.b)/this.a);

        } else if (this.canCalc("Cbc",values)) {
            this.B = Math.asin((Math.sin(this.C)*this.b)/this.c);

        } else {
            return false;

        }
        return !isNaN(this.B);
    }

    calc_C() {
        let values = this.hasValues();

        if (this.canCalc("AB",values)) {
            this.C = Math.PI - (this.A + this.B);

        } else if (this.canCalc("abT",values)) {
            this.C = Math.asin(2*this.T/this.a*this.b); // Fix.

        } else if (this.canCalc("Aac",values)) {
            this.C = Math.asin(Math.sin(this.A)*this.c/this.a);

        } else if (this.canCalc("Bbc",values)) {
            this.C = Math.asin(Math.sin(this.B)*this.c/this.b);

        } else {
            return false;

        }
        return !isNaN(this.C);
    }

    calc_a() {
        let values = this.hasValues();

        if (this.canCalc("Abc",values)) {
            this.a = Math.sqrt(Math.pow(this.b,2) + Math.pow(this.c,2) - 2*this.b*this.c*Math.cos(this.A));

        } else if (this.canCalc("CbT",values)) {
            this.a = 2*this.T/(this.b*Math.sin(this.C));

        } else if (this.canCalc("BcT",values)) {
            this.a = 2*this.T/(this.c*Math.sin(this.B));

        } else if (this.canCalc("ABb",values)) {
            this.a = (sin(this.A)*this.b)/Math.sin(this.B);

        } else if (this.canCalc("ACc",values)) {
            this.a = (Math.sin(this.A)*this.c)/Math.sin(this.C);

        } else {
            return false;

        }
        this.a = round(this.a,3);
        return !isNaN(this.a);
    }

    calc_b() {
        let values = this.hasValues();

        if (this.canCalc("Bac",values)) {
            this.b = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.c,2) - 2*this.a*this.c*Math.cos(this.B));

        } else if (this.canCalc("CaT",values)) {
            this.b = 2*this.T/(this.a*Math.sin(this.C));

        } else if (this.canCalc("AcT",values)) {
            this.b = 2*this.T/(this.c*Math.sin(this.A));

        } else if (this.canCalc("ABa",values)) {
            this.b = (Math.sin(this.B)*this.a)/Math.sin(this.A);

        } else if (this.canCalc("BCc",values)) {
            this.b = (Math.sin(this.B)*this.c)/Math.sin(this.C);

        } else {
            return false;

        }
        this.a = round(this.b,3);
        return !isNaN(this.b);
    }
    
    calc_c() {
        let values = this.hasValues();

        if (this.canCalc("Cab",values)) {
            this.c = Math.sqrt(Math.pow(this.a,2) + Math.pow(this.b,2) - 2*this.b*this.a*Math.cos(this.C));

        } else if (this.canCalc("AbT",values)) {
            this.c = 2*this.T/(this.b*Math.sin(this.A));

        } else if (this.canCalc("BaT",values)) {
            this.c = 2*this.T/(this.a*Math.sin(this.B));

        } else if (this.canCalc("BCb",values)) {
            this.c = (sin(this.B)*this.a)/Math.sin(this.A);

        } else if (this.canCalc("ACa",values)) {
            this.c = (Math.sin(this.C)*this.b)/Math.sin(this.A);

        } else {
            return false;

        }
        this.a = round(this.c,3);
        return !isNaN(this.c);
    }

    calc_T() {
        let values = this.hasValues();

        if (this.canCalc("Abc",values)) {
            this.T = this.b*this.c*Math.sin(this.A)/2;

        } else if (this.canCalc("Bac",values)) {
            this.T = this.a*this.c*Math.sin(this.B)/2;

        } else if (this.canCalc("Cab",values)) {
            this.T = this.a*this.b*Math.sin(this.C)/2;

        } else {
            return false;

        }
        return !isNaN(this.T);
    }

    /**
     * a^2 = b^2 + c^2 - 2bc*cos(A)
     * sin(A)/a = sin(B)/b = sin(C)/c
     * T = ab*sin(C)/2
     * 180 = A + B + C
     *                                      : A,B,C,a,b,c,T
     * A = 180 - B + C                      : _,B,C,_,_,_,_
     * A = sin-1(2T/bc)                     : _,_,_,_,b,c,T
     * A = sin-1(sin(B)*a/b))               : _,B,_,a,b,_,_
     * A = sin-1(sin(C)*a/c))               : _,_,C,a,_,c,_
     * 
     * B = 180 - A + C                      : A,_,C,_,_,_,_
     * B = sin-1(2T/ac)                     : _,_,_,a,_,c,T
     * B = sin-1(sin(A)*b/a))               : A,_,_,a,b,_,_
     * B = sin-1(sin(C)*b/c))               : _,_,C,_,b,c,_
     * 
     * C = 180 - A + B                      : A,B,_,_,_,_,_
     * C = sin-1(2T/ab)                     : _,_,_,a,b,_,T
     * C = sin-1(sin(A)*c/a))               : A,_,_,a,_,c,_
     * C = sin-1(sin(B)*c/b))               : _,B,_,_,b,c,_
     * 
     * a = sqrt(b^2 + c^2 - 2bc*cos(A))     : A,_,_,_,b,c,_
     * a = 2T/(b*sin(C))                    : _,_,C,_,b,_,T
     * a = 2T/(c*sin(B))                    : _,B,_,_,_,c,T
     * a = (sin(A)*b)/sin(B)                : A,B,_,_,b,_,_
     * a = (sin(A)*c)/sin(C)                : A,_,C,_,_,c,_
     * 
     * b = sqrt(a^2 - c^2 + 2ac*cos(B))     : _,B,_,a,_,c,_
     * b = 2T/(a*sin(C))                    : _,_,C,a,_,_,T
     * b = 2T/(c*sin(A))                    : A,_,_,_,_,c,T
     * b = (sin(B)*a)/sin(A)                : A,B,_,a,_,_,_
     * b = (sin(B)*c)/sin(C)                : _,B,C,_,_,c,_
     * 
     * c = sqrt(a^2 - b^2 + 2ba*cos(C))     : _,_,C,a,b,_,_
     * c = 2T/(b*sin(A))                    : A,_,_,_,b,_,T
     * c = 2T/(a*sin(B))                    : _,B,_,a,_,_,T
     * c = (sin(C)*b)/sin(B)                : _,B,C,_,b,_,_
     * c = (sin(C)*a)/sin(A)                : A,_,C,a,_,_,_
     * 
     * T = bc*sin(A)/2                      : A,_,_,_,b,c,_
     * T = ac*sin(B)/2                      : _,B,_,a,_,c,_
     * T = ab*sin(C)/2                      : _,_,C,a,b,_,_
     */

    show(canvas) {
        const centerX = canvas.width * 0.5, centerY = canvas.height * 0.5;
        const 
            ctx = canvas.getContext("2d");
            //max = getMaxOf(this.a,this.b,this.c);

        //let aL = (this.a/max)*scale, bL = (this.b/max)*scale, cL = (this.c/max)*scale;
        

        ctx.stroke();
        /**
         *     C
         *   b   a
         * A   c   B
         */
    }
}

CanvasRenderingContext2D.prototype.addLine = function(x1,y1,x2,y2) {
    this.moveTo(x1,y1);
    this.lineTo(x2,y2);
}

function getMaxOf() {
    let a = -1;
    for (let i=0;i<arguments.length;i++)
        if (i > a)
            a = i;
    return a;
}

function sortString(str) {
    return str.split('').sort().join('');
}