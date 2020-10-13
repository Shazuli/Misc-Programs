let eA,eB,eC, ea,eb,ec, eT, canvas,  btn;
let mA,mB,mC;

var triangle;
//var A,B,C, a,b,c, area;

document.addEventListener('readystatechange', event => {
    let l;

    if (event.target.readyState === "interactive") { // When HTML/DOM elements are ready

        eA = R("A");
        eA.setAttribute("min",Number.MIN_VALUE)
        eB = R("B");
        eB.setAttribute("min",Number.MIN_VALUE)
        eC = R("C");
        eC.setAttribute("min",Number.MIN_VALUE)

        ea = R("a");
        ea.setAttribute("min",Number.MIN_VALUE)
        eb = R("b");
        eb.setAttribute("min",Number.MIN_VALUE)
        ec = R("c");
        ec.setAttribute("min",Number.MIN_VALUE)
        
        eT = R("T");
        eT.setAttribute("min",Number.MIN_VALUE)

        canvas = R("tri");

        mA = R("modeA");
        mA.addEventListener("change", event => {
            switch (event.target.value) {
                case "radian": {
                    eA.value = toRad(getNum(eA.value));
                    break;
                }
                default: {
                    eA.value = round(toDeg(getNum(eA.value)),3);
                }

            }
        });

        mB = R("modeB");
        mB.addEventListener("change", event => {
            switch (event.target.value) {
                case "radian": {
                    eB.value = toRad(getNum(eB.value));
                    break;
                }
                default: {
                    eB.value = round(toDeg(getNum(eB.value)),3);
                }

            }
        });

        mC = R("modeC");
        mC.addEventListener("change", event => {
            switch (event.target.value) {
                case "radian": {
                    eC.value = toRad(getNum(eC.value));
                    break;
                }
                default: {
                    eC.value = round(toDeg(getNum(eC.value)),3);
                }

            }
        });

        btn = R("calc");
        btn.addEventListener("click", event => {
            console.log("Calculating values ..")

            triangle.setValues(
                getRad('A'),getRad('B'),getRad('C'),
                getNum(ea.value),getNum(eb.value),getNum(ec.value),
                getNum(eT.value)
            );


            let vals = triangle.hasValues();

            console.log("Has values : \"%s\".",vals);

            //while (!(vals.includes('A') && vals.includes('B') && vals.includes('C'))) { // Calc corners.

            if (triangle.calc_A()) {
                if (mA.value == "degree") {
                    eA.value = triangle.getValue('A',true);
                } else {
                    eA.value = triangle.getValue('A');
                }
            }

            if (triangle.calc_B()) {
                if (mB.value == "degree") {
                    eB.value = triangle.getValue('B',true);
                } else {
                    eB.value = triangle.getValue('B');
                }
            }

            if (triangle.calc_C()) {
                if (mC.value == "degree") {
                    eC.value = triangle.getValue('C',true);
                } else {
                    eC.value = triangle.getValue('C');
                }
            }

            if (triangle.calc_a()) {
                ea.value = triangle.getValue('a');
            }

            if (triangle.calc_b()) {
                eb.value = triangle.getValue('b');
            }

            if (triangle.calc_c()) {
                ec.value = triangle.getValue('c');
            }

            if (triangle.calc_T()) {
                eT.value = triangle.getValue('T');
            }
            

            //vals = triangle.hasValues();
            let newVals = triangle.hasValues();

            console.log("Calculated values \"%s\".",subtractString(newVals,vals));

        });

        triangle = new Triangle(
            getRad('A'),getRad('B'),getRad('C'),
            getNum(ea.value),getNum(eb.value),getNum(ec.value),
            getNum(eT.value)
        );

        l = "HTML";

    } else if (event.target.readyState === "complete") { // When window loaded (external resources are loaded too- css,src)
        
        
        
        l = "Window";
    }

    console.info("Finished loading %s in %s m/s.",l,Date.now()-timer);

});

function getRad(v) {
    let m,e;
    switch (v) {
        case 'B': {
            m = mB;
            e = eB;
            break;
        }
        case 'C': {
            m = mC;
            e = eC;
            break;
        }
        default: {
            m = mA;
            e = eA;
        }
    }
    return m.value == "degree" ? toRad(getNum(e.value)) : getNum(e.value);
}

function subtractString(str, sub) {
    for (let c of sub)
        if (str.includes(c))
            str = str.replace(c,'');
    return str;
}

function round(v,dec) {
    const d = Math.pow(10,dec);
    return Math.round(v * d) / d;
}

function toDeg(rad) {
    let a = rad*(180/Math.PI);
    console.debug("%s -deg-> %s",rad,a);
    return a;
}

function toRad(deg) {
    let a = deg*(Math.PI/180);
    console.debug("%s -rad-> %s",deg,a);
    return a;
}

function getNum(str) {
    return parseFloat(str) || 0;
}

function R(id) {
    return document.getElementById(id);
}