//META{"name":"ChatPlayer"}*//

var _fs = require("fs");

var ChatPlayer = function(API) {
	this.load = function() {
		this.loadSettings();

		var that = this;
		$("#app-mount").bind("DOMSubtreeModified", function() {
			that.init();
		});
	};

	this.unload = function() {};

	this.start = function() {
		this.isRunning = true;
		this.init();
	};

	this.stop = function() {
		this.isRunning = false;
		this.init();
	};

	this.onSwitch = function() {};
	this.onMessage = function() {};

	this.getSettingsPanel = function() {
		return this.getPanel();
	};

	this.getName = function() {
		return "Chat Player";
	};

	this.getDescription = function() {
		return "Plays any type of stream content from the internet.";
	};

	this.getAuthor = function() {
		return "noVaLue";
	};

	this.getVersion = function() {
		return "Version 0.1.0";
	};
};

ChatPlayer.prototype.settings = {
	"isForceEmbed": true
};

ChatPlayer.prototype.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

ChatPlayer.prototype.isRunning = false;

ChatPlayer.prototype.init = function() {
	this.selector("div.guilds-wrapper", ".avatar-small");
};

ChatPlayer.prototype.selector = function (elem, subElemClass) {
	var that = this;
	$(elem).find(subElemClass).each(function(id, elem) {
		if(that.isRunning) {
			if($(this).data("customShowChatPlayer")) return;
			$(this).data("customShowChatPlayer", true);

			that.setAvatarSize($(this));

			$(this).mouseenter(function() {
				if(that.isRunning && that.settings['isForceEmbed']) {

					$("#AvatarHover").css({
						"display":"block", 
						"background-color": that.settings['avatarBackgroundColor'],
						"border-radius": that.settings['avatarBorderRadius'], 
						"border": that.settings['avatarBorderSize'] + " solid "+ that.settings['avatarBorderColor'],
						"background-image": $(this).css("background-image")
					});
				}
			});

			$(this).mouseleave(function() {
				if(that.isRunning)
					$("#AvatarHover").css({"display":"none"});
			});
		}else {
			if(!$(this).data("customShowChatPlayer")) return;
			$(this).data("customShowChatPlayer", false);
			$(this).unbind("mouseenter");
			$(this).unbind("mouseleave");
		}
	});
};

ChatPlayer.prototype.setAvatarSize = function(self) {
	/*var newWidth = this.isLarge || this.settings['isLarge'] ? 256 : 128, 
	newHeight = this.isLarge || this.settings['isLarge'] ? 256 : 128;

	var offset = self.offset();
	var width = self.width();
	var height = self.height();

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();

	var AvatarX = offset.left + (width - newWidth)/2;
	var AvatarY = windowHeight-height < offset.top + newHeight ? offset.top - newHeight : offset.top + height;
	AvatarX = AvatarX < 0 ? 0 : AvatarX;
	AvatarX = AvatarX + width > windowWidth ? windowWidth - width : AvatarX;

	$("#AvatarHover").css({
		"top": AvatarY + "px",
		"left": AvatarX + "px",
		"width": newWidth + "px",
		"height": newHeight + "px"
	});*/
};

ChatPlayer.prototype.setSettings = function() {
	this.settings['isForceEmbed'] = $('#isForceEmbed').is(':checked');

	this.saveSettings();
	this.init();

	$("#bd-psm-id").remove();
};

ChatPlayer.prototype.saveSettings = function() {
	var settings = this.getSettingsFile();
	try { _fs.writeFileSync(settings, JSON.stringify(this.settings)); }catch(ex) {}
};

ChatPlayer.prototype.loadSettings = function() {
	var settings = this.getSettingsFile();
	try { 
		var tmpSettings = JSON.parse(_fs.readFileSync(settings)); 

		if(this.size(this.settings) == this.size(tmpSettings))
			this.settings = tmpSettings;
	}catch(ex) {}
};

ChatPlayer.prototype.getSettingsFile = function() {
	var _os = process.platform;
	var _dataPath = _os == "win32" ? process.env.APPDATA : _os == 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local';
	_dataPath += "/BetterDiscord";
	var _userFile = _dataPath + "/chatplayer.json";
	return _userFile;
};

ChatPlayer.prototype.getPanel = function() {
	return '<style>' +
	 	'fieldset.avatarSettings { border-radius: 4px 10px 4px 10px; border:1px solid black;'+
	 	'	border-left:0px; background-color: #19232F; color:white; margin-top:10px }'+
	 	'fieldset.avatarSettings legend { border-radius:10px 30px 0px 0px; border:1px solid black;'+
	 	'	border-right:0px; text-indent:4px; padding:3px; padding-left:0px; padding-right:0px;'+
	 	'	width:100%; font-weight:bold; background-color: #122334 }'+

		'table.avatarSettings { width:90%; margin:5px; }'+
		'table.avatarSettings td:last-child { text-align:center }'+
		'table.avatarSettings label { color:white; font-weight:700; text-indent: 4px }'+
		'table.avatarSettings hr { border:1px solid white }'+
		'table.avatarSettings button { padding:3px; border-radius: 4px; font-weight:bold; background-color: #BFF5F7 }'+
		'table.avatarSettings button:hover { background-color: #97E6B2 }'+
		'table.avatarSettings input { width: 100px }'+
		'</style>' +
		'<fieldset class="avatarSettings"><legend>Chat player Settings:</legend>' +
		'<table class="avatarSettings">' +
    	'<tr><td><label for="isForceEmbed">Player force show: </label></td>'+
				'<td><input type="checkbox" id="isForceEmbed" '+
				(this.settings['isForceEmbed'] ? "checked": "")+
				'></td></tr>' + 

    	'<tr><td><hr></td><td><hr></td></tr>'+
    	'<tr><td></td><td>'+
    	'<button '+
       		'style="border:1px solid blue"'+
        	'onclick="BdApi.getPlugin(\'ChatPlayer\').setSettings()"'+
        '>Apply</button></td></tr></table>'+
        '</fieldset>'+
        '<script> $("fieldset.avatarSettings").ready(function () { '+
        '	$("#bd-psm-s").css({"background-color": "transparent"}); '+
        '	$("#bd-psm-s").parent().css({"background-color": "transparent"}); '+
        '	$("#bd-psm-s").parent().parent().css({'+
        '		"background-color": "transparent", "box-shadow":"0 0 10px 5px rgba(150,200,100,.75)"'+
        '	});'+
        '});</script>';
};

exports.ChatPlayer = ChatPlayer;