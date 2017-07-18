# facebook-js-wrapper
Easy to use wrapper for the Facebook Javascript SDK.
This project is incomplete.

### Prerequisites

Facebook app

### Getting Started

```
	$FB.init({
		appId: '<your-app-id>',
		version: 'v2.9'
	}, function(){
		// Do something when the SDK is loaded.
		$FB.log("sdk ready.");
	});
```

### Example: Get User Profile and dump it in console

```
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	});
```
