// Facebook SDK Wrapper. 
// Created by: Chad Dailey
var $FB = (function(){
	
	// Executes a method. Handy for callbacks.
	function _executeCallback(callback){
		if(typeof callback === "function"){
			callback();
		}
	}
	
	// Writes an object to the developer console.
	function _log(obj){
		if(console && console.log){
			console.log(obj);
		}
	}
	
	// Configures and Loads the Facebook SDK
	function _init(config, callback){
		if(config.appId && config.version){
			window.fbAsyncInit = function() {
				FB.init(config);
				FB.AppEvents.logPageView();
				if(callback){
					_executeCallback(callback);
				}
			};

			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}else{
			_log("The following parameters are required to use the Facebook SDK: appId, version");
		}
	}

	// Requests a login with requested permissions
	function _login(callback, permissions){
		FB.login(function(response){
			if (response && !response.error) {
				_updateUser(response, "status");
				if(callback){
					_executeCallback(callback(response));
				}
			}else{
				_log( ( response.error ? response.error : "An unknown error has occurred." ) );
			}
		},{
			scope: permissions, 
			return_scopes: true
		});
	}
	
	// Requests a login with requested permissions
	function _reLogin(callback, permissions){
		FB.login(function(response){
			if (response && !response.error) {
				_updateUser(response, "status");
				if(callback){
					_executeCallback(callback(response));
				}
			}else{
				_log( ( response.error ? response.error : "An unknown error has occurred." ) );
			}
		},{
			scope: permissions, 
			return_scopes: true,
			auth_type: 'rerequest'
		});
	}
	
	// Gets users connection status
	function _loginStatus(callback, permissions){
		FB.getLoginStatus(function(response) {			
			if (response && !response.error) {
				_updateUser(response, "status");
				if(callback){
					_executeCallback(callback(response));
				}
			}else{
				_log( ( response.error ? response.error : "An unknown error has occurred." ) );
			}
		},{
			scope: permissions, 
			return_scopes: true
		});
	}
	
	// Logs a user out
	function _logout(callback){
		FB.logout(function(response) {			
			if (response && !response.error) {
				_clearUser();
				if(callback){
					_executeCallback(callback(response));
				}
			}else{
				_log( ( response.error ? response.error : "An unknown error has occurred." ) );
			}
		});
	}
	
	// User Object. Handles all user methods and stores user data.
	var _User = {
		login: function(callback, permissions){
			_login(callback, permissions);
		},
		reLogin: function(callback, permissions){
			_reLogin(callback, permissions);
		},
		loginStatus: function(callback){
			_loginStatus(callback);
		},
		logout: function(callback){
			_logout(callback);
		},
		hasPermission: function(permission){
			return _hasPermission(permission);
		},
		getProfile: function(callback, fields){
			_api("/me?fields=" + 
			(typeof fields === "undefined" ? 
				"id,age_range,birthday,email,first_name,gender,last_name,link,locale,location,middle_name,name,timezone" : 
				fields ),"GET",{},function(response){
					_updateUser(response,"profile");
					if(callback){
						_executeCallback(callback(response));
					}
				});
		},
		getAccounts: function(callback, params){
			_api("/me/accounts","GET",(params ? params : {}),function(response){
				_updateUser(response, "accounts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAchievements: function(callback, params){
			_api("/me/achievements","GET",(params ? params : {}),function(response){
				_updateUser(response, "achievements");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAdStudies: function(callback){
			_api("/me/ad_studies","GET",{},function(response){
				_updateUser(response, "adStudies");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAdAccounts: function(callback){
			_api("/me/adaccounts","GET",{},function(response){
				_updateUser(response, "adAccounts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAdContracts: function(callback){
			_api("/me/adcontracts","GET",{},function(response){
				_updateUser(response, "adContracts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAdNetworkAnalytics: function(callback, params){
			_api("/me/adnetworkanalytics","GET",(params ? params : {}),function(response){
				_updateUser(response, "adNetworkAnalytics");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAlbums: function(callback){
			_api("/me/albums","GET",{},function(response){
				_updateUser(response, "albums");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAppRequestFormerRecipients: function(callback){
			_api("/me/apprequestformerrecipients","GET",{},function(response){
				_updateUser(response, "appRequestFormerRecipients");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getAppRequests: function(callback){
			_api("/me/apprequests","GET",{},function(response){
				_updateUser(response, "appRequests");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getBooks: function(callback, params){
			_api("/me/books","GET",(params ? params : {}),function(response){
				_updateUser(response, "books");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getBusinessActivities: function(callback, params){
			_api("/me/business_activities","GET",(params ? params : {}),function(response){
				_updateUser(response, "businessActivities");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getConversations: function(callback, params){
			_api("/me/conversations","GET",(params ? params : {}),function(response){
				_updateUser(response, "conversations");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getCuratedCollections: function(callback){
			_api("/me/curated_collections","GET",{},function(response){
				_updateUser(response, "curatedCollections");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getDomains: function(callback){
			_api("/me/domains","GET",{},function(response){
				_updateUser(response, "domains");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getEvents: function(callback, params){
			_api("/me/events","GET",(params ? params : {}),function(response){
				_updateUser(response, "events");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getFamily: function(callback){
			_api("/me/family","GET",{},function(response){
				_updateUser(response, "family");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getFavoriteRequests: function(callback){
			_api("/me/favorite_requests","GET",{},function(response){
				_updateUser(response, "favoriteRequests");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getFriendlists: function(callback){
			_api("/me/friendlists","GET",{},function(response){
				_updateUser(response, "friendlists");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getFriends: function(callback, params){
			_api("/me/friends","GET",(params ? params : {}),function(response){
				_updateUser(response, "friends");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getGames: function(callback, params){
			_api("/me/games","GET",(params ? params : {}),function(response){
				_updateUser(response, "games");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getGroups: function(callback, params){
			_api("/me/groups","GET",(params ? params : {}),function(response){
				_updateUser(response, "groups");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getIdsForBusiness: function(callback){
			_api("/me/ids_for_business","GET",{},function(response){
				_updateUser(response, "idsForBusiness");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getIdsForPages: function(callback, params){
			_api("/me/ids_for_pages","GET",(params ? params : {}),function(response){
				_updateUser(response, "idsForPages");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getInvitableFriends: function(callback, params){
			_api("/me/invitable_friends","GET",(params ? params : {}),function(response){
				_updateUser(response, "invitableFriends");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getLeadgenForms: function(callback, params){
			_api("/me/leadgen_forms","GET",(params ? params : {}),function(response){
				_updateUser(response, "leadgen_forms");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getLiveVideos: function(callback, params){
			_api("/me/live_videos","GET",(params ? params : {}),function(response){
				_updateUser(response, "live_videos");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getMovies: function(callback, params){
			_api("/me/movies","GET",(params ? params : {}),function(response){
				_updateUser(response, "movies");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getMusic: function(callback, params){
			_api("/me/music","GET",(params ? params : {}),function(response){
				_updateUser(response, "music");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getObjects: function(callback, params){
			_api("/me/objects","GET",(params ? params : {}),function(response){
				_updateUser(response, "objects");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPermissions: function(callback, params){
			_api("/me/permissions","GET",(params ? params : {}),function(response){
				_updateUser(response, "permissions");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPersonalAdAccounts: function(callback){
			_api("/me/personal_ad_accounts","GET",{},function(response){
				_updateUser(response, "personalAdAccounts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPhotos: function(callback, params){
			_api("/me/photos","GET",(params ? params : {}),function(response){
				_updateUser(response, "photos");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPicture: function(callback, params){
			_api("/me/picture","GET",(params ? params : {}),function(response){
				_updateUser(response, "picture");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPromotableDomains: function(callback){
			_api("/me/promotable_domains","GET",{},function(response){
				_updateUser(response, "promotableDomains");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPromotableEvents: function(callback, params){
			_api("/me/promotable_events","GET",(params ? params : {}),function(response){
				_updateUser(response, "promotableEvents");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getRequestHistory: function(callback){
			_api("/me/request_history","GET",{},function(response){
				_updateUser(response, "requestHistory");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getRichMediaDocuments: function(callback, params){
			_api("/me/rich_media_documents","GET",(params ? params : {}),function(response){
				_updateUser(response, "richMediaDocuments");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getSessionKeys: function(callback){
			_api("/me/session_keys","GET",{},function(response){
				_updateUser(response, "sessionKeys");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getStreamFilters: function(callback){
			_api("/me/stream_filters","GET",{},function(response){
				_updateUser(response, "streamFilters");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getTaggableFriends: function(callback){
			_api("/me/taggable_friends","GET",{},function(response){
				_updateUser(response, "taggableFriends");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getTaggedPlaces: function(callback){
			_api("/me/tagged_places","GET",{},function(response){
				_updateUser(response, "taggedPlaces");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getTelevision: function(callback, params){
			_api("/me/television","GET",(params ? params : {}),function(response){
				_updateUser(response, "television");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getThreads: function(callback, params){
			_api("/me/threads","GET",(params ? params : {}),function(response){
				_updateUser(response, "threads");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getVideoBroadcasts: function(callback){
			_api("/me/video_broadcasts","GET",{},function(response){
				_updateUser(response, "videoBroadcasts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getVideos: function(callback){
			_api("/me/videos","GET",{},function(response){
				_updateUser(response, "videos");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getFeed: function(callback, params){
			_api("/me/feed","GET",(params ? params : {}),function(response){
				_updateUser(response, "feed");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getPosts: function(callback, params){
			_api("/me/posts","GET",(params ? params : {}),function(response){
				_updateUser(response, "posts");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getTagged: function(callback, params){
			_api("/me/tagged","GET",(params ? params : {}),function(response){
				_updateUser(response, "tagged");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getOutbox: function(callback){
			_api("/me/outbox","GET",{},function(response){
				_updateUser(response, "outbox");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		},
		getScores: function(callback){
			_api("/me/scores","GET",{},function(response){
				_updateUser(response, "scores");
				if(callback){
					_executeCallback(callback(response));
				}
			});
		}
	}
	
	// Gets users current login status with the app.
	function _updateUser(response, type){
		if(type === "status"){
			_User.isLoggedIn = (response.status === "connected" ? true : false);
			if(response.authResponse){
				_User.auth = response.authResponse;
			}
		}else{
			_User[type] = response;
		}
	}
	
	function _clearUser(){
		_User.isLoggedIn = false;
		_User.auth = null;
		_User.profile = null;
	}
	
	// Check if proper permissions have been given
	function _hasPermission(permission){
		if(_User.auth && _User.auth.grantedScopes.indexOf(permission) >= 0){
			return true;
		}else{
			return false;
		}
	}
	
	// Makes calls to the Graph API
	function _api(path, method, params, callback){
		FB.api(path, method, params, function(response){
			if(response){
				if(response.error){
					_log( ( response.error ? response.error : "An unknown error has occurred." ) );
				}
			}else{
				_log( "There was no response from Facebook." );
			}
			if(callback){
				_executeCallback(callback(response));
			}
		});
	}
	
	return {
		// Contains all data related to user.
		User: _User,
		// Executes the init method	
		init: function(config, callback){
			_init(config, callback);
		},
		// Executes a request on the Graph API
		api: function(path,method,params,callback){
			_api(path,method,params,callback);
		},
		// Logs an object to the console
		log: function(obj){
			_log(obj);
		}
	}
	
})();
  
