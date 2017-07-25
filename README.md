# facebook-js-wrapper
Easy to use wrapper for the Facebook Javascript SDK.
This project is incomplete.

### Prerequisites

- [x] Facebook app

### Getting Started

- [x] Load facebook-js-wrapper or facebook-js-wrapper.min
- [x] Initialize Facebook SDK (see below)

```js
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

### Overview

> All data returned from Facebook gets stored in the methods corresponding object without the request type prefix. For example: getBooks -> books, getAdAccounts -> adAccounts etc. Find all possible endpoints, fields and parameters at the official [Facebook SDK library](https://developers.facebook.com/docs/javascript). All methods use the same structure: method(callback(response), fields, parameters). Some methods may or may not have fields or parameters available. See the official sdk reference for more information. If you have your console open error messages will automatically be written when they are returned from Facebook.

### User Object
> Handles all user methods, edge endpoints and stores data returned from Facebook.

#### Code Examples

> Get user profile with core fields returned

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	});
```

> Request more or less fields

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	}, 'id,cover,email');
```

> Ensure correct permission has been given before attempting a request

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