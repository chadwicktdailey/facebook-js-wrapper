# facebook-js-wrapper
Easy to use wrapper for the Facebook Javascript SDK.
This project is incomplete.

### Prerequisites

- [x] Facebook app

### Getting Started

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

### User Object
> Handles all user methods, edge endpoints and stores data returned from Facebook.

#### Code Examples

##### Get user profile

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	});
```

###### Request specific fields

```js
	$FB.User.getProfile(function(response){
		if(response && !response.error){
			$FB.log($FB.User.profile);
		}
	}, 'id,cover,email');
```

##### Edge endpoints
> All data returned from Facebook gets stored in the methods corresponding object without the request type prefix
> For example: getAlbums -> albums, getBooks -> books etc.

###### Ensure correct permission has been given for a request

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