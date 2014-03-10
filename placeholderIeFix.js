/**
 * Function to emulate placeholder in IE where input elements don't support it.
 * In this solution We add an extra input of text type to emulate the placeHolder. 
 */
function fauxPlaceholder() {
	//if the browser is Internet Explorer and the input element doesn't supports placeholder attribute
    if($.browser.msie && !elementSupportAttribute('input','placeholder')) {
		var i = 0;
        
		$("input[placeholder]").each(function() {
            var $input = $(this);
            
            if($input.attr("type") != "hidden"){
                //if input does not have ID... add one
                if(($input.attr("id") == undefined || $input.attr("id") == '') && $input.attr("name") == undefined){
                	$input.attr("id", "id" + new Date().getTime() + i++);
                }
                
                //If the aux input isn't created yet.
                if(document.getElementById($input.attr("id")+"-faux") == undefined){
                
                	var auxId;
                	if($input.attr("id") != undefined){
                		auxId = $input.attr("id");
                	}else{
                		auxId = $input.attr("name");                		
                	}
                	
                	//Create the aux input
                	$input.after('<input id="'+ auxId +'-faux" style="display:none" type="text" value="' + $input.attr('placeholder') + '" />');  
    	            var $faux = $(document.getElementById(auxId +"-faux"));
    	
    	            //Copy the properties needed from original input
    	            if($input.attr('class') != undefined){
    	            	$faux.attr('class', $input.attr('class'));
    	            }
    	            if($input.attr('style') != undefined){
    	            	$faux.attr('style', $input.attr('style'));
    	            }
    	            if($input.attr('name') != undefined && $input.attr('name') != 'USER' && $input.attr('name') != 'PASSWORD'){
    	            	$faux.attr('name', $input.attr('name'));
    	            }
    	
    	            //If input hasn't data, hide it and show inputAux
    	            if($input.val() === '') {
    	            	$faux.show();
    	            	$input.hide();
    	            }
    		
    	            //Add a class to change the font color of the aux input
    	            $faux.addClass('hasPlaceholder');
    			
    				//When a user does focus in an input, 
    	            //we hide the aux input and show the original input
    	            $faux.focus(function() {
    	                $faux.hide();
    	                $faux.removeClass("error");
    	                $input.show();
    	                $input.focus();
    	            });
    	
    	            //When a user does focus out in an input,
    	            //we verify if the input has a value -> if not have a value hide input and show the auxInput
    	            $input.blur(function() {
    	                if($input.val() === '') {
    	                    $input.hide();
    	                    $faux.show();
    	                }
    	            });
                }
            	
            }
            
        });
   }
}

//verify if an element supports an attribute
function elementSupportAttribute(elm, attr) {
    var test = document.createElement(elm);
    return attr in test;
}	
