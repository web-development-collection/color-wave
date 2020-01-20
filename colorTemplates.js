// IMPORTEER JQUERY!!!

var outputMode = "hex";

// convert hex into rgba (opacity .2)
function hexToRgbA(hex, op){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        if (op) {
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+', ' + op + ')';
        }else {
            return 'rgb(' + [(c>>16)&255, (c>>8)&255, c&255].join(', ') + ')';
        }        
    }else {
        return hex;
    }
};


// maak een nieuwe gradient aan en voeg deze toe aan de html (jQuery)
function createGrad(col1, col2) {
    var sh1 = col1,
        sh2 = col2;
    if (outputMode == "rgb") {
        col1 = hexToRgbA(col1);
        col2 = hexToRgbA(col2);
    }

    var gHTML = '<div class="GRAD_BOX">';
        gHTML += '<div class="GRAD" style="box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh1, 0.2) + ',0 2px 100px 0 ' + hexToRgbA(sh1, 0.2) + '!important; background: linear-gradient(to bottom right,' + col1 + ', ' + col2 + ');"></div>';
        gHTML += '<div class="EXPL" style="box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh1, 0.2) + ',0 2px 100px 0 ' + hexToRgbA(sh2, 0.2) + '!important;">';
        gHTML += '<p style="color: ' + col1 + ';">' + col1 + '</p>' + '<p style="color: ' + col2 + ';">' + col2 + '</p></div></div>';

    $("section.GRAD").append( gHTML );
};

// maak een nieuw kleurpalet aan en voeg deze toe aan de html (jQuery)
function createPalet(col1, col2, col3) {
    var sh1 = col1,
        sh2 = col2,
        sh3 = col3;
    if (outputMode == "rgb") {
        col1 = hexToRgbA(col1);
        col2 = hexToRgbA(col2);
        col3 = hexToRgbA(col3);
    }

    var pHTML = '<div class="GRAD_BOX">';
        pHTML += '<div class="COLP F" style="background: ' + col1 + '; box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh1, 0.1) + ',0 2px 100px 0 ' + hexToRgbA(sh2, 0.1) + '!important;"></div>';
        pHTML += '<div class="COLP S" style="background: ' + col2 + '; box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh2, 0.1) + ',0 2px 100px 0 ' + hexToRgbA(sh2, 0.1) + '!important;"></div>';
        pHTML += '<div class="COLP T" style="background: ' + col3 + '; box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh2, 0.1) + ',0 2px 100px 0 ' + hexToRgbA(sh3, 0.1) + '!important;"></div>';
        pHTML += '<div class="EXPL" style="box-shadow: 0 2px 100px 0 ' + hexToRgbA(sh1, 0.2) + ',0 2px 100px 0 ' + hexToRgbA(sh3, 0.2) + '!important;">';
        pHTML += '<p style="color: ' + col1 + ';">' + col1 + '</p>';
        pHTML += '<p style="color: ' + col2 + ';">' + col2 + '</p>';
        pHTML += '<p style="color: ' + col3 + ';">' + col3 + '</p></div></div>';

    $("section.COLP").append( pHTML );
};

function drawPalets() {
    // TOEVOEGEN AAN HTML
    // gradient maken
    createGrad('#FCE38A', '#F38181'); 
    createGrad('#F54EA2', '#FF7676'); 
    createGrad('#F02FC2', '#6094EA');
    createGrad('#A16BFE', '#DEB0DF');
    createGrad('#41C7AF', '#54E38E');
    createGrad('#6DE195', '#C4E759');
    createGrad('#17EAD9', '#6078EA');
    createGrad('#6CACFF', '#8DEBFF');
    createGrad('#A8C7FF', '#C1E3FF');
    createGrad('#F0EFF0', '#FAF8F9');

    // palet maken
    createPalet('#F76D82', '#EC5564', '#D94452');
    createPalet('#FC8370', '#FB6D51', '#E8563F');
    createPalet('#FCD277', '#FECD57', '#F5BA45');
    createPalet('#B4E080', '#9ED36A', '#8AC054');

    createPalet('#62DDBD', '#46CEAD', '#35BB9B');
    createPalet('#66D4F1', '#4FC0E8', '#3AADD9');
    createPalet('#73B1F4', '#5E9CEA', '#4B89DA');
    createPalet('#B3A5EF', '#AC92EA', '#967ADA');

    createPalet('#F299CE', '#EB87BF', '#D670AC');
    createPalet('#F4D0B5', '#F0C8A5', '#E4B693');
    createPalet('#F4F6F9', '#E5E8EC', '#CBD0D8');
    createPalet('#A9B1BC', '#646C77', '#424953');


    // copy color --> only possible after element is created
    $('p').on('click', function() {
        var $temp = $("<input type='text'>"); // maak een input aan zodat we deze kunnen selecteren
        $("body").append($temp); // maak een input aan zodat we deze kunnen selecteren
        $temp.val($(this).text()).select(); // selecter de inhoud van de op geklikte p-tag
        document.execCommand("copy"); // copier deze waarde
        $temp.remove();
    });
};

// onLoad and onClick --> toon alle kleurpaletten en verander rgb <> hex
$(function() {
    drawPalets();
    $("input[type='checkbox']").on('click', function() {
        $("section.COLP").empty();
        $("section.GRAD").empty();

        if (outputMode == "hex") {
            outputMode = "rgb";
        }else {
            outputMode = "hex";
        }
        drawPalets();
    });
});


