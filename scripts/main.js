$(function() {
    init();

$('#toggleSelect').on('click',function(){
            var selectResVal = selectRes.find('option:selected').val();
            console.log(selectResVal);
            var xParam = selectResVal.split('x')[0];
            var yParam = selectResVal.split('x')[1];

            if(xParam > 0 || yParam > 0){
                if (toggleViewPort) {
                    viewPort.width(yParam).height(xParam);
                    toggleViewPort = 0;
                }
                else{
                    viewPort.width(xParam).height(yParam);
                    toggleViewPort = 1;
                }
            }
            else{
                alert("Select a dropdown value from 'Device Type'");
            }

        });
});



/*----------------------------------------------------------------------

 VAR initialisations

----------------------------------------------------------------------*/

  var DesktopObj = [{"xWidth":"1366","yHeight":"768"},{"xWidth":"1280","yHeight":"800"},{"xWidth":"1440","yHeight":"900"},{"xWidth":"1600","yHeight":"900"},{"xWidth":"1680","yHeight":"1050"},{"xWidth":"1920","yHeight":"1080"},{"xWidth":"1920","yHeight":"1200"},{"xWidth":"2560","yHeight":"1700"},{"xWidth":"2560","yHeight":"1440"},{"xWidth":"2560","yHeight":"1600"},{"xWidth":"2560","yHeight":"1800"}],

    TabObj = [{"xWidth":"600","yHeight":"800"},{"xWidth":"600","yHeight":"1024"},{"xWidth":"768","yHeight":"1024"}],

    MobObj = [{"xWidth":"400","yHeight":"800"},{"xWidth":"480","yHeight":"800"},{"xWidth":"720","yHeight":"1280"},{"xWidth":"540","yHeight":"960"},{"xWidth":"720","yHeight":"720"}],

    toggleViewPort,
    viewPort = $('#prjContainer'),
    mobRes = $('#mobileRes'),
    resetViewPort = $('#resReset'),
    tabRes = $('#tabRes'),
    laptopRes = $('#laptopRes'),
    desktopRes = $('#desktopRes'),
    selectRes = $('#selectRes')
    inputWidth = $('#inputWidth'),
    inputHeight = $('#inputHeight');


    function ViewPortSizeChange(){

        //To Show Current Window Size for ICON selection & Select Toggles


    }//ViewPortSizeChange

    function customVPSize(){
        inputWidth.on('keyup',function(){
            var foo = inputWidth.val();
            if(foo >= 0 && foo <= 5000){
                viewPort.width(foo);
            }

            else{
               alert('Enter value less than 3000');
               e.preventDefault();
            }
        })

        inputHeight.on('keyup',function(e){
            var bar = inputHeight.val();
            if(bar >= 0 && bar <= 3000){
                viewPort.height(bar);
            }

            else{
                alert('Enter value less than 3000');
                e.preventDefault();
            }

        })

    }//customVPSize
/*----------------------------------------------------------------------

 changeScreenSize Fn

----------------------------------------------------------------------*/


  function changeScreenSize(selector, xParam, yParam) {

    selector.on('click', function() {

    //------To remove '.rotateScreen' class from other elements------
        if (selector.siblings().hasClass('rotateScreen')) {
            selector.siblings().removeClass('rotateScreen');
        }



        //------ NORMAL HARCODED VAL for ViewPort Sizing------
        selector.toggleClass('rotateScreen');
        if (toggleViewPort) {
            viewPort.width(yParam).height(xParam);
            toggleViewPort = 0;
        }
        else{
            viewPort.width(xParam).height(yParam);
            toggleViewPort = 1;
        }


        //------Load JSON val based on 'selector'------
        if (selector.attr('id') == 'mobileRes') {
            var JSONObj = MobObj,
                DeviceTxt = 'mobile';
        }
        else if (selector.attr('id') == 'tabRes') {
            var JSONObj = TabObj,
                DeviceTxt = 'tablet';
        }

        //-- ###### GOT TO IMPLEMENT LAPTOP RESOLUTIONS LATER ######

        else {
            var JSONObj = DesktopObj,
                DeviceTxt = 'laptop/desktop';
        }



      //------Append JSON val based on ABOVE Condition------
        selectRes.empty();
        selectRes.append('<option value="0">Other ' + DeviceTxt + ' resolution</option>');

        $.each(JSONObj, function(key, val) {
            selectRes.append('<option>' + val.xWidth + 'x' + val.yHeight + '</option>');
        });//each



      //------Change Viewport from JSON val using <select>ed val------
        selectRes.on('change', selectJSONOBJ);//<select> change event



    });//click


  }//changeScreenSize

/*----------------------------------------------------------------------

 INIT Fn

----------------------------------------------------------------------*/

function init(){
    changeScreenSize(mobRes, 480, 320);
    changeScreenSize(tabRes, 1024, 600);
    changeScreenSize(laptopRes, 1366, 768);
    changeScreenSize(desktopRes, 1920, 1200);
    changeScreenSize(resetViewPort, '100%', '100%');

    ViewPortSizeChange();
    validateNumber();
    customVPSize();
}

function selectJSONOBJ(){
    inputWidth.val('');
    inputHeight.val('');
    var xParam = $(this).val().split('x')[0];
    var yParam = $(this).val().split('x')[1];
    viewPort.width(xParam).height(yParam);
}



//http://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
function validateNumber() {
    //attach keypress to input
    $('#inputVP input').keydown(function(event) {
        // Allow special chars + arrows
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
            return;
        } else {
            // If it's not a number stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            } else {
                $('code').text($('.input').val())
            }
        }
    });
}//validateNumber

