var checkingUpload = false;

$(document).ready(function(){
   
	//var uploadButton = $("#upload-button");
	//uploadButton.button();

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

