# facebook-js-wrapper
Easy to use wrapper for the Facebook Javascript SDK.
This project is incomplete.

### Prerequisites

Facebook app

### Getting Started

```Javascript
	// Initialize the Facebook SDK
	// Configuration:
	// appId and version are the only two required options.
	// You can specify more if needed.
	$FB.init({
		appId: '<your-app-id>',
		version: 'v2.9'
	}, function(){
		// Do something when the SDK is loaded.
		$FB.log("sdk ready.");
	});
```

### Example: Get User Profile

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	});
```

### Example: Get User Profile with specific fields

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	}, "id,cover,email");
```

### Example: Ensure correct permission has been granted before an attempt

```js
	function getAlbums(){
		if($FB.User.hasPermission('user_photos')){
			$FB.User.getAlbums(function(response){
				if(response && !response.error){
					$FB.log($FB.User.albums);
				}
			});
		}else{
			$FB.User.reLogin(function(response){
				if(response && !response.error){
					if(response.authResponse){
						getAlbums();
					}
				}
			}, 'user_photos');
		}
	}
```