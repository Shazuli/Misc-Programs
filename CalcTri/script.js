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
        
        eT = R("area");
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
            if (triangle.calc_T()) {
                eT.value = triangle.getValue('T');

            } else {
                console.log("Not enough data.")
            }

            console.log("Done.")
        });

        triangle = new Triangle(
            getRad('A'),getRad('B'),getRad('C'),
            getNum(ea.value),getNum(eb.value),getNum(ec.value),
            getNum(eT.value)
        );

        l = "HTML.";

    } else if (event.target.readyState === "complete") { // When window loaded (external resources are loaded too- css,src)
        
        
        
        l = "Window.";
    }

    console.log("Finished loading "+l);

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

function round(v,dec) {
    const d = Math.pow(10,dec);
    return Math.round(v * d) / d;
}

function toDeg(rad) {
    return rad*(180/Math.PI);
}

function toRad(deg) {
    return deg*(Math.PI/180);
}

function getNum(str) {
    return parseFloat(str) || 0;
}

function R(id) {
    return document.getElementById(id);
}