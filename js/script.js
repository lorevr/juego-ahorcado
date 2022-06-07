var pantalla = document.querySelector('.canvasMuneco');
var pincel = pantalla.getContext('2d');

function dibujarMuneco() {
    pincel.beginPath();
    pincel.lineWidth = 10; 
    pincel.strokeStyle = "#5a1900";
    pincel.lineCap="round";
    pincel.moveTo(30,410);
    pincel.lineTo(300,410);
    pincel.stroke();

    pincel.moveTo(100,410);
    pincel.lineTo(100,10);
    pincel.stroke();
    
    pincel.moveTo(100,10);
    pincel.lineTo(250,10);
    pincel.stroke();
    
    pincel.lineCap="butt";
    pincel.moveTo(250,10);
    pincel.lineTo(250,70);
    pincel.stroke();

    pincel.strokeStyle = "#000000";
    pincel.beginPath();
    pincel.lineWidth = 5;
    pincel.arc(250,110,40,0,Math.PI*2);
    pincel.stroke();

    pincel.lineCap="round";
    pincel.moveTo(250,150);
    pincel.lineTo(250,260);
    pincel.stroke();
    
    pincel.moveTo(250,260);
    pincel.lineTo(200,360);
    pincel.stroke();
    
    pincel.moveTo(250,260);
    pincel.lineTo(300,360);
    pincel.stroke();

    pincel.moveTo(250,170);
    pincel.lineTo(200,250);
    pincel.stroke();
    
    pincel.moveTo(250,170);
    pincel.lineTo(300,250);
    pincel.stroke();
    
}

dibujarMuneco();
