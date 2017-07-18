# facebook-js-wrapper
Easy to use wrapper for the Facebook Javascript SDK

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
