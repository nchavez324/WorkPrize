var checkingUpload = false;

$(document).on("pageinit", function() {
   
	//var uploadButton = $("#upload-button");
	//uploadButton.button();s

	$("#popupDialog").ready(function(){


		$("#popupDialog").popup("option", "dismissible", false);

		$("#popupDialog").popup({
		  afterclose: afterPopup
		});
	});
});

function pressedDone() {

	$("#popupDialog").popup("open", {});
}

function dismissPopup() {

	var popupDialog = $("#popupDialog");
	popupDialog.popup("close");

	resetUploadButton();
}

function resetUploadButton() {

	var uploadButton = $("#upload-button");
	uploadButton.button("enable");
	uploadButton.attr("value", "Upload Picture");
}

function uploadPic() {

	checkingUpload = false;

	// Update button text.
  var uploadButton = $("#upload-button");
  uploadButton.attr("value", "Uploading...");
  uploadButton.button("disable");

  // Get the selected files from the input.
  var fileSelect = document.getElementById('file-select');
	var files = fileSelect.files;
	// Create a new FormData object.
	var formData = new FormData();

	if (files.length < 1) {

		//TODO
		uploadFailed("No file was selected");
		return;
	}

	var file = files[0];

  // Check the file type.
  if (!file.type.match('image.*')) {

  	//TODO
  	uploadFailed("Select an image file (.jpg, .png, .tiff) to upload.");	
  	return;
  }

  console.log(file);

	// Add the file to the request.
	formData.append('photo-proof', file, file.name);

	// Set up the request.
	var xhr = new XMLHttpRequest();

	if(/*success*/true){

		uploadSuccess();

	}else{

		uploadFailed("Upload could not complete. Check your internet connection.");
	}

	/*
	// Open the connection.
	xhr.open('POST', 'some-TODO-handler.php', true);

	// Set up a handler for when the request finishes.
	xhr.onload = function () {
	  if (xhr.status === 200) {
	    // File(s) uploaded.
	    uploadButton.innerHTML = 'Upload';
	  } else {
	    alert('An error occurred!');
	  }
	};

	// Send the Data.
	xhr.send(formData);
	*/
}

function uploadFailed(reason) {

	checkingUpload = false;

	alert(reason + " Please try upload again.");

	resetUploadButton();
}

function uploadSuccess() {

	checkingUpload = true;

	dismissPopup();

}

function afterPopup(event, ui) {

	if(checkingUpload){

		checkingUpload = false;

		setTimeout(function () {
			
			$.mobile.loading( 'show', {
				text: 'Sending...',
				textVisible: true,
				theme: 'b',
				html: ""
			});

			setTimeout(function() {

				$.mobile.loading("hide");

				var isFinished = (Math.random() < 0.5);
				//RANDOM!!!
				receivedConfirmation(/*isFinished*/isFinished);

			}, 1000);
		}, 100);
	}
}


function receivedConfirmation(isFinished) {

	if(isFinished){

		//redirect to success screen!
		window.location.href = "success.html";

	}else{

		var notDoneDialog = $("#notDoneDialog");
		notDoneDialog.popup("open", {});
	}
}

function dismissLoad() {

	var notDoneDialog = $("#notDoneDialog");
	notDoneDialog.popup("close");
}

/**

***
**/
function taskdetail(link) {

    var $link = $(link)
    var $profile_img = $link.find('.user-face')
    if (!$profile_img) return;

    var img_path = $profile_img.attr('src');

    var $profile_name = $link.find('.profile_name');

    var name = $profile_name.html();

    data = {'profile_img': img_path, 'profile_name': name};

    link = "taskrequest.html?" + encodeQueryData(data);

		jQuery.mobile.changePage(link)
}

function sendRequest(link) {
	
	parameters = getUrlVars(window.location.href);

  link = addUrlVars("taskdetail.html", parameters);

  jQuery.mobile.changePage(link);
}

function finishDetail(button) {

	parameters = getUrlVars(window.location.href);

	//collect form values
	var $detailTime = $('#detail-time');
	var $detailLocation = $('#detail-location');
	var $detailReward = $('#detail-reward');

	parameters["time"] = $detailTime.val();
	parameters["location"] = $detailLocation.val();
	parameters["reward"] = $detailReward.val();

  link = addUrlVars("workmode.html", parameters);

  jQuery.mobile.changePage(link);
}

function getUrlVars(url) {
    var vars = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        var hash = hashes[i].split('=');
        vars[decodeURIComponent(hash[0])] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function addUrlVars(url, parameters) {

	var pUrl = url + "?";
	for (var key in parameters) {
		if (parameters.hasOwnProperty(key)) {

			pUrl += encodeURIComponent(key) + "=" + encodeURIComponent(parameters[key]) + "&";
		}
	}
	pUrl = pUrl.slice(0, pUrl.length - 1);
	return pUrl;
}

function getTask() {
	var parameters = getUrlVars(window.location.href);
  
  var location = parameters["location"];
  var reward = parameters["reward"];
  var time = parameters["time"];

  $("#location").html(location);
  $("#reward").html(reward);
  $("#time").html(time);

  var $timer = $("#timer");

  $timer.TimeCircles({time: {Days: false}, fg_width: 0.05, bg_width: 0.05});
}

function setReward(reward) {

	var $rewardDetail = $("#detail-reward");
	$rewardDetail.attr('value', reward);
}

function abort() {
    swal({   
        title: "You sure you want to quit? ",   
        text: "If so, you better give us a damn good reason",   
        type: "input",   
        showCancelButton: true,   
        closeOnConfirm: false,   
        animation: "slide-from-top" 
    }, 
    function(inputValue){   
        if (inputValue === false) {
            return false; 
        }    
        if (inputValue === "") {     
            swal.showInputError("You need to write something!");     
            return false   
        }      
        swal("Cancelled", "We've let your partner know that: " + inputValue, "error");
        setTimeout(function () { window.location = "index.html";}, 5000);
        
    
    });
}


// Usage:
//   var data = { 'first name': 'George', 'last name': 'Jetson', 'age': 110 };
//   var querystring = encodeQueryData(data);
// 
function encodeQueryData(data) {
   var ret = [];
   for (var d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
   return ret.join("&");
}

$(document).on("pagebeforeshow", function(event) {

	var activePage = $.mobile.activePage.attr("id");
	
	if(activePage == 'request-page') {

		data = getUrlVars(window.location.href);

		var $profile_img = $(document).find('#request-user-face');
		var $profile_name = $(document).find('#request-profile-name');

		$profile_img.attr('src', data['profile_img']);
		$profile_name.html(data['profile_name']);
	
	}else if(activePage == 'task-detail'){

		data = getUrlVars(window.location.href);

		var $profile_name = $(document).find('#profile-name');

		$profile_name.html(data['profile_name']);

	}else if(activePage == 'work-mode'){

		data = getUrlVars(window.location.href);

		var $profile_img = $(document).find('#work-user-face');
		var $profile_name = $(document).find('#work-profile-name');

		$profile_img.attr('src', data['profile_img']);
		$profile_name.html(data['profile_name']);

		getTask();
	}
});