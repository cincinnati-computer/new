(function(window, document, Date, setTimeout, setInterval, clearInterval, Math, parseFloat, location){
	Date.now = Date.now || function() { return new Date().getTime(); };
	
	Function.prototype.b = function(){}.bind || function (obj) {
		var fn = this,
			args = [].slice.call(arguments, 1);
		return function () {
			return fn.apply(obj, args.concat([].slice.call(arguments)));
		};
	};
	
	var thenavigator = window.navigator || {},
		networkconnectioninfo = window.mozConnection || window.Connection ||
			thenavigator.connection || thenavigator.mozConnection || thenavigator.webkitConnection,
		executeAndReturnFunc = function(x){ x(); return x },
		theLocalStorage,
		headtitleelement,
		getComputedStyle = window.getComputedStyle,
		requestAnimationFrame = window.requestAnimationFrame || function(i){return setTimeout(i,1/60)},
		thispagesfilename = location.pathname.split('/').pop(),
		localStorageEnabled = false,
		getElementById = document.getElementById.b( document ),
		createElement = document.createElement.b( document),
		getElementsByTagName = document.getElementsByTagName.b( document),
		pointerElement=getElementById('dochtml'),
		eHTML = pointerElement,
		touchscreenElement=getElementById('docbody'),
		eBODY = touchscreenElement,
		touchPointerElement=getElementById('touchpadMouse'),
		headerfooter_html_link_content,
		IE_version=(-1/*@cc_on,@_jscript_version@*/),
		loadPageFuncObj = function(resetAllWhenPageReloadsWrapperFunc){
			/*
			pointerswitch = ['pointerDisabled', 'pointerEnabled'],
			touchswitch = ['touchDisabled', 'touchEnabled'],
			touchpointerswitch = ['touchpadDisabled', 'touchpadEnabled'],
			*/
		var tablerowchildoffooter,
			youtubevideoelement = getElementById('youtubevideoelement'),
			cachedThrottleEvents = [],
			cachedThrottleListeners = [],
			cachedThrottleObjects = [],
			cachedThrottleFuncs = [],
			nowOffset=Date.now(),
			//cancelAnimationFrame = cancelAnimationFrame || clearTimeout,
			afterHeaderLoadeds = [],
			listen,
			mute,
			cachedIntervalIDs = [],
			throttle = function(func, obj, evt) {
			var timeouttype	= 0,
				//threshold = 50,
				newThrottleFunc;
			return ( // The following is required so that Mute works properly
			  cachedThrottleListeners[ cachedThrottleFuncs.indexOf(func) ] || (
				cachedThrottleObjects.push( obj ),
				cachedThrottleEvents.push( evt ),
				  cachedThrottleFuncs.push(func),
				cachedThrottleListeners.push(newThrottleFunc = function(Evt) {
					var that = this;
					switch (timeouttype){
						case 0: // Execute immediatly
							timeouttype = 1;
							requestAnimationFrame(func.b(this, Evt));
							break;
						case 1: // Delayed execute
							timeouttype = 2;
							setTimeout(function(){
								timeouttype=0;
								requestAnimationFrame(func.b(this, Evt));
							}, 45 /*threshold*/ - (Date.now() % 45 /*threshold*/) );
					}
				}),
				newThrottleFunc
			  )
			);
		};
		//try {
		
		
		/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		
		if (localStorageEnabled && !(thispagesfilename in theLocalStorage)){
			theLocalStorage.setItem(thispagesfilename, touchPointerElement.innerHTML);
		}
		
		!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
			

		if(~IE_version&&(IE_version<9)){
			listen = function(obj, evt, func){
				obj.attachEvent('on'+evt, throttle(func, obj, evt));
			};
			mute = function(obj, evt, func){
				obj.detachEvent('on'+evt, throttle(func, obj, evt));
			}
		} else {
			listen = function(obj, evt, func){
				obj.addEventListener(evt, throttle(func, obj, evt));
			};
			mute = function(obj, evt, func){
				obj.removeEventListener(evt, throttle(func, obj, evt));
			}
			afterHeaderLoadeds.push(function(){
				/**********************************************/
				var topweblinkbar = getElementById('topweblinkbar'),
					mlinklist = getElementById('mlinklist'),
					mlinktopbarchildren = (
						eBODY.appendChild( topweblinkbar ),
						topweblinkbar.innerHTML = mlinklist.innerHTML.replace(/<.?div.*?>/gm, ''),
						topweblinkbar.children
					),
					mlinkchildren = mlinklist.getElementsByTagName('a'),
					mlinkcur = mlinkchildren.length,
					curEMoffset = parseFloat(getComputedStyle(mlinktopbarchildren[0]).fontSize),
					curEMmax = curEMoffset*2.7, // height (in em's) of each link
					calculatePosFuncs = [],
					lastRelativeScrollState = -1,
					bBox,
					currentRelativeScrollState;
				curEMoffset *= 2.55 // 2.55 for ending at same location, 1.45 for starting

				while (mlinkcur--){
					(function(cutoffElement, cutoffInnerElement, toplinkbarchildcur, mlinkchildcur){
						toplinkbarchildcur.className = 'mwebtopbarlink';
						topweblinkbar.insertBefore(cutoffElement, toplinkbarchildcur);
						cutoffElement.appendChild(cutoffInnerElement);
						cutoffInnerElement.appendChild(toplinkbarchildcur);
						cutoffElement.className = 'linkcutoffelement';
						cutoffInnerElement.className = 'linkcutoffinnerelement';
						var cutoffInnerElementStyle = cutoffInnerElement.style;
						calculatePosFuncs.push(function(topPX){
							cutoffInnerElementStyle.maxHeight = Math.max(
								Math.round(
									-topPX - mlinkchildcur.offsetTop /*+ mlinkchildcur.clientWidth - */ + curEMoffset
									//+ cutoffInnerElementStyle
								), 0
							) + 'px';
							/*cutoffElementStyle.paddingBottom = -Math.min(
									cutoffElementStyle.maxHeight - curEMmax, 
									0
								) + 'px';*/
						});
					})( createElement('div'), createElement('div'), 
					   mlinktopbarchildren[mlinkcur], mlinkchildren[mlinkcur] );
				}
				listen(touchPointerElement, 'scroll', executeAndReturnFunc(function(){
					bBox = mlinklist.getBoundingClientRect();
					currentRelativeScrollState = (mlinklist.top<0) && (mlinklist.bottom>0);

					if (!currentRelativeScrollState || 
						(currentRelativeScrollState !== lastRelativeScrollState)){ // incase if it suddenly jumps down the page
						mlinkcur = calculatePosFuncs.length;
						while (mlinkcur--)
							calculatePosFuncs[ mlinkcur ]( bBox.top );
					}
					lastRelativeScrollState = currentRelativeScrollState;
				}));
				
				/**********************************************************/

				var rotatingslogan = getElementById('rotatingslogan'),
					rotatingSloganBox = getElementById('rotatingSloganBox'),
					sloganPerms = [
						"People Friendly",
						"Competent Capable",
						"Cost Effective",
						"Cutting Edge",
						"Locally Owned",
						"Experienced Professional",
						"Problem Solving",
						"Easy To Understand"
					],
					sloganLens = [],
					spL = sloganPerms.length,
					sloganPermsCUR = spL,
					rotatingsloganStyle = rotatingslogan.style,
					maxSSBheight=0,
					curNumTMP,
					fadeBASETransitionCSS = 'margin .35s linear, opacity .35s cubic-bezier(0,',
					fadeInTransitionCSS = fadeBASETransitionCSS + '.8,1,1)',
					fadeOutTransitionCSS = fadeBASETransitionCSS + '0,1,.2)';

				/*var SPcFunc=function(Total, Current){
						return Total + '<span>' + (Current===' '?'\u00A0':Current) + '<br /></span>';
					}*/

				while(sloganPermsCUR--){
					rotatingslogan.innerText = sloganPerms[sloganPermsCUR];
					sloganLens[sloganPermsCUR] = rotatingslogan.clientWidth;
					/*console.log(sloganPermsCUR, sloganPerms, sloganPerms[sloganPermsCUR]);
						sloganPerms[sloganPermsCUR] = [''].concat(sloganPerms[sloganPermsCUR].split('')).reduce( SPcFunc );
						console.log(sloganPermsCUR, sloganPerms[sloganPermsCUR]);*/
					maxSSBheight = Math.max(maxSSBheight, rotatingSloganBox.clientHeight);
				}
				//console.log(rotatingSloganBox,maxSSBwidth/curNumTMP + 'em',maxSSBheight/curNumTMP + 'em')
				curNumTMP = parseFloat(getComputedStyle(eHTML).fontSize);
				rotatingSloganBox.style.minHeight = maxSSBheight + 'px';

				--spL;
				sloganPermsCUR=0;
				var commonSP = sloganPerms.splice(0, 1)[0],
					commonSPlen = sloganLens.splice(0, 1)[0];
				rotatingslogan.innerText = commonSP;
				rotatingsloganStyle.display = 'inline';
				
				setTimeout(function(){
					cachedIntervalIDs.push( setInterval(executeAndReturnFunc(function(){
						rotatingsloganStyle.transition = fadeInTransitionCSS;
						rotatingsloganStyle.opacity = 0;
						curNumTMP = (sloganLens[sloganPermsCUR%=spL]-commonSPlen)/4;
						rotatingsloganStyle.margin = '0 ' + curNumTMP + 'px';
						setTimeout(function(){
							rotatingsloganStyle.transition = 'none';
							rotatingsloganStyle.margin = '0 ' + -curNumTMP + 'px';
							void rotatingslogan.clientLeft; // force element reflow
							//rotatingsloganStyle.transition = '';
							rotatingsloganStyle.transition = fadeOutTransitionCSS;
							rotatingsloganStyle.margin = 0;
							rotatingslogan.innerText = sloganPerms[sloganPermsCUR++];
							rotatingsloganStyle.opacity = 1;
						},350);
					}), 4000) );
					setTimeout(function(){
						cachedIntervalIDs.push( setInterval(executeAndReturnFunc(function(){
							rotatingsloganStyle.transition = fadeInTransitionCSS;
							rotatingsloganStyle.opacity = 0;
							curNumTMP = (commonSPlen-sloganLens[(sloganPermsCUR+spL-1)%spL])/4;
							rotatingsloganStyle.margin = '0 ' + curNumTMP + 'px';
							setTimeout(function(){
								rotatingsloganStyle.transition = 'none';
								rotatingsloganStyle.margin = '0 ' + -curNumTMP + 'px';
								void rotatingslogan.clientLeft; // force element reflow
								//rotatingsloganStyle.transition = '';
								rotatingsloganStyle.transition = fadeOutTransitionCSS;
								rotatingsloganStyle.margin = 0;
								rotatingslogan.innerText = commonSP;
								rotatingsloganStyle.opacity = 1;
							},350);
						}), 4000) );
					},2667);
				},2601);

				/**********************************************/
				var anchorTags = document.querySelectorAll('[href*=".html"I]'),
					anchorTagsCur = anchorTags.length;

				while (anchorTagsCur--){
					(function(theAnchorTagButton){
						if (~theAnchorTagButton.href.indexOf(thispagesfilename))
							theAnchorTagButton.style.backgroundColor = 'rgba(0, 0, 0, .35)';
						if (theAnchorTagButton.href.indexOf('#')) // checking to make sure it doenst begin with #
							theAnchorTagButton.onclick = function(evt){
								//////////////////////////////////////////////////////////////////////
								//////////////////////////////////////////////////////////////////////

								evt.preventDefault();
								resetAllWhenPageReloadsWrapperFunc(theAnchorTagButton.href, touchPointerElement);
								return false;

								//////////////////////////////////////////////////////////////////////
								//////////////////////////////////////////////////////////////////////
							};
					})(anchorTags[anchorTagsCur]);
				}
			});

			/*var lastScrollPostition=0, scrollInertia=0;
			//touchPointerElement.addEventListener('scroll', function(evt){    });
			requestAnimationFrame(function makeScrollBarGo(){
				var curScrollNum = (touchPointerElement.scrollTop - lastScrollPostition)/2;
				scrollInertia += Math.sqrt(curScrollNum*curScrollNum - scrollInertia*scrollInertia);
				scrollInertia -= scrollInertia / (Math.sqrt(Math.abs(scrollInertia)) + 1);
				lastScrollPostition = touchPointerElement.scrollTop;
				touchPointerElement.scrollTop += Math.round(scrollInertia);
				requestAnimationFrame( makeScrollBarGo );
			});*/
		}


		/*var supportPageOffset = window.pageXOffset !== undefined;
	var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

	var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	element.offsetTop*/

		var cyears = getElementById('cyears'),
			cmonths = getElementById('cmonths'),
			cdays = getElementById('cdays'),
			chours = getElementById('chours'),
			cmins = getElementById('cmins'),
			csecs = getElementById('csecs'),
			cmiliss = getElementById('cmss');


		var padStringStart = function(str, maxlen) {
			return (" ".repeat(maxlen) + str).slice(-maxlen);
		}
		var theCdate=0, aDatePart=0, bDatePart=0, cDatePart=0, dDatePart=0, eDatePart=0;

		function refresh_time(){
			theCdate = new Date();
			if (aDatePart - (aDatePart=theCdate.getFullYear()-1985))	cyears.innerText	= aDatePart;
			if (bDatePart - (bDatePart=theCdate.getMonth()))			cmonths.innerText	= bDatePart;
			if (cDatePart - (cDatePart=theCdate.getDate()))			cdays.innerText 	= cDatePart;
			if (dDatePart - (dDatePart=theCdate.getHours()))			chours.innerText 	= dDatePart;
			if (eDatePart - (eDatePart=theCdate.getMinutes()))		cmins.innerText 	= eDatePart;
			if (csecs){
				csecs.textContent = theCdate.getSeconds();
				cmiliss.textContent = theCdate.getMilliseconds();
				requestAnimationFrame(refresh_time);
			}
		}
		if(!cmiliss&&cmins){
			cachedIntervalIDs.push( setInterval(refresh_time, 1000) );
		} else if(cyears) { // checking to see if the clock is actually on the current page
			refresh_time();
		}

		/*if (localStorageEnabled){
			window.UIinputMethod = JSON.parse(localStorage.getItem('UIinputMethod')) || {};
		} else {
			window.UIinputMethod = {};
		}
		UIinputMethod.touchEnabled = UIinputMethod.touchEnabled || false,
			UIinputMethod.pointerEnabled = UIinputMethod.pointerEnabled || false,
			UIinputMethod.touchpointerEnabled = UIinputMethod.touchpointerEnabled || true;

		pointerElement.className = pointerswitch[+UIinputMethod.touchEnabled];
		touchscreenElement.className = touchswitch[+UIinputMethod.pointerEnabled];
		touchPointerElement.className = touchpointerswitch[+UIinputMethod.touchpointerEnabled];

		if (!UIinputMethod.touchEnabled){
			listen(window, 'touchstart', function whentouchstarts(){
				if (!UIinputMethod.touchEnabled){
					UIinputMethod.touchEnabled = true;
					if (localStorageEnabled) localStorage.setItem('UIinputMethod', JSON.stringify(UIinputMethod));
					touchscreenElement.className = pointerswitch[+UIinputMethod.touchEnabled];
				}
				mute(window, 'touchstart', whentouchstarts);
			});
		}
		if (!UIinputMethod.pointerEnabled){
			listen(window, 'mousemove', function whentouchstarts(){
				if (!UIinputMethod.pointerEnabled){
					UIinputMethod.pointerEnabled = true;
					if (localStorageEnabled) localStorage.setItem('UIinputMethod', JSON.stringify(UIinputMethod));
					pointerElement.className = pointerswitch[+UIinputMethod.pointerEnabled];
				}
				mute(window, 'mousemove', whentouchstarts);
			});
		}
		if (UIinputMethod.touchpointerEnabled){
			listen(window, 'scroll', function whentouchstarts(){
				if (UIinputMethod.touchpointerEnabled){
					UIinputMethod.touchpointerEnabled = false;
					if (localStorageEnabled) localStorage.setItem('UIinputMethod', JSON.stringify(UIinputMethod));
					touchPointerElement.className = touchpointerswitch[+UIinputMethod.touchpointerEnabled];
				}
				mute(window, 'scroll', whentouchstarts);
			});
		}*/

		/*
		var docbody = eBODY,
			ddE = document.documentElement,
			mouseX, mouseY,
			viewportwidth, viewportheight,
			belements = document.getElementsByName('background'),
			bscales = [],
			i = belements.length;


		if (!window.static_background){
			function setBelement(k){
				var offsetLeft=parseFloat(belements[k].getAttribute('offsetX')|| 1),
					scaleLeft =parseFloat(belements[k].getAttribute('scaleX') || 1),
					offsetTop=parseFloat(belements[k].getAttribute('offsetY') || 1),
					scaleTop =parseFloat(belements[k].getAttribute('scaleY')  || 1);

				bscales[k] = {
					top: function(y){
						return offsetTop  + y / scaleTop;
					},
					left: function(x){
						return offsetLeft + x / scaleLeft;
					}
				}
			}
			while (i--){
				setBelement(i);
			}

			if (typeof eHTML.style !== 'undefined'){
				listen(window, 'mousemove', function(evt){
					mouseX = (evt&&evt.clientX||window.clientX)||0 + (ddE.scrollLeft || docbody.scrollLeft),
						mouseY = (evt&&evt.clientY||window.clientY)||0 + (ddE.scrollTop  || docbody.scrollTop ),
						i = belements.length;
					while (i--){
						belements[i].style.width =  viewportwidth  + bscales[i].left(viewportwidth-mouseX) + "px";
						belements[i].style.height = viewportheight + bscales[i].top(viewportheight-mouseY) + "px";
					}
				});
			} else {
				listen(window, 'mousemove', function(evt){
					mouseX = evt.clientX + (ddE.scrollLeft || docbody.scrollLeft),
						mouseY = evt.clientY + (ddE.scrollTop  || docbody.scrollTop ),
						i = belements.length;
					while (i--){
						belements[i].setAttribute('style',
												  'width:' + (viewportwidth*2  + bscales[i].left(viewportwidth-mouseX)) + "px" + 
												  'height:' + (viewportheight*2 + bscales[i].top(viewportheight-mouseY)) + "px;");
					}
				});
			}
		};*/

		afterHeaderLoadeds.push(function(){
			var allImages = getElementsByTagName('img'),
				i = allImages.length,
				currentE,
				attrTMP;

			while (i--){
				currentE = allImages[i];

				attrTMP = currentE.getAttribute('imgsrc');
				if (attrTMP)
					currentE.setAttribute('src', attrTMP);

				attrTMP = 1-parseFloat(currentE.getAttribute('transparency'))/100;
				if (attrTMP)
					currentE.setAttribute('style', 
						'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + attrTMP + ')"\9;' +
						'*filter:alpha(opacity=' + attrTMP + ');' +
						'opacity:' + attrTMP
					);
			}

		});
		if (document.querySelectorAll){
			afterHeaderLoadeds.push(function(a){
				if( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/im.test(a.substr(0,4))) {
					getElementById('phonelink').href = "tel:5139851300";
					tablerowchildoffooter.removeChild(getElementById('desktopOnlyPhone'));
					tablerowchildoffooter.removeChild(getElementById('revolvermaptab'));
				}
				/*******************************************/
				if (youtubevideoelement)
					if (networkconnectioninfo){ // o is for override
						(networkconnectioninfo.ontypechange = window.refresh_youtube =  function(){
							if (!(networkconnectioninfo.metered || (networkconnectioninfo.type==='cellular'))||
							   (localStorageEnabled&&+theLocalStorage.o)){
								youtubevideoelement.src = 'https://www.youtube.com/embed/IvbYRJkL0VE';
							} else  youtubevideoelement.src = ''
						})();
					} else youtubevideoelement.src = 'https://www.youtube.com/embed/IvbYRJkL0VE';

				/*******************************************/
			}.b(window,thenavigator.userAgent||thenavigator.vendor||window.opera||'') );
			afterHeaderLoadeds.push(function(){
				var moresocialiconsbutton = getElementById('moresocialicons'),
					moresocialiconsbackground = getElementById('moresocialbackground'),
					moresocialiconsmenu = getElementById('moresocialmenu'),
					moresocialiconsstate  = 0,
					moresocialiconsbackgroundstyle = moresocialiconsbackground.style;

				moresocialiconsmenu.onclick = function(e){
					e.stopPropagation();
					e.preventDefault();
					return false;
				};
				moresocialiconsbackground.onclick =
					moresocialiconsbutton.onclick =
					setTimeout.b(window, function(){
					if (moresocialiconsstate){
						moresocialiconsstate = 0;
						setTimeout(function(){
							moresocialiconsbackgroundstyle.visibility = 'hidden';
						}, 350);
					} else moresocialiconsstate = 1, moresocialiconsbackgroundstyle.visibility = 'visible';
					moresocialiconsbackgroundstyle.opacity = moresocialiconsstate;
				}, 200);
			});
		}

		/*************************************/
		/* Checking To See If The Links Work */
		/*afterHeaderLoadeds.push(function(){
			if (location.protocol === 'file:'){
				var DOManchorTags = getElementsByTagName('a'),
					i = DOManchorTags.length,
					EpOUTER = eHTML.outerHTML;

				while (i--){
					(function(){
						var currentE = DOManchorTags[i],
							linkE	 = createElement('link'),
							curEhref = currentE.href;
						if (!curEhref && currentE.childNodes.length){
							let warnScript = createElement('script');
							warnScript.innerHTML = 
								'\n'.repeat(EpOUTER.substr(0, EpOUTER.indexOf(currentE.outerHTML)).split('\n').length + 1) + 
								'console.warn("This [[' + currentE.textContents + ']] &lt;a&gt; tag doesn\'t go to any page!")';
							currentE.appendChild(warnScript);
						} else {
							let warnScript = createElement('script');
							warnScript.innerHTML = 
								'\n'.repeat(EpOUTER.substr(0, EpOUTER.indexOf(currentE.outerHTML)).split('\n').length + 1) + 
								'setTimeout(function(){let k=window.link_' + i + '_;k[0].href=k[1]},100)';
							currentE.appendChild(warnScript);
							linkE.rel = 'prefetch';
							currentE.appendChild(linkE);
							window['link_' + i + '_'] = [linkE, curEhref];
						}
					})();
				}
			}
		});*/

		/*************************************/
		
		this.resetEverything = function(ms){
			eBODY.style.opacity = 0;
			eHTML.style.backgroundColor = 'black';
			setTimeout(function(){
				var curEvtI = cachedIntervalIDs.length;
				while (curEvtI--) {
					clearInterval( cachedIntervalIDs[curEvtI] );
				}
				curEvtI = cachedThrottleObjects.length;
				while (curEvtI--) {
					cachedThrottleObjects[curEvtI].removeEventListener(
						cachedThrottleObjects[curEvtI],
						cachedThrottleListeners[curEvtI]
					);
				}
			}, ms);
		}

		/*************************************/

		afterHeaderLoadeds.push(function(){
			headtitleelement = getElementsByTagName('title')[0],
			
			getElementById("rightcenter").innerHTML = 
				headtitleelement.getAttribute('header') ||
				headtitleelement.innerHTML;
			
			if (localStorageEnabled)
				theLocalStorage.setItem(
					thispagesfilename + '_', //'__title'
					headtitleelement.outerHTML
				);
		});

		/*************************************/
		var headerEle = createElement('div'),
			footerPREpadding = createElement('pre'),
			footerEle = createElement('table'),
			footerIframeEle = createElement('iframe'),
			firstTouchPointerElementChild,
			tPEchilds = touchPointerElement.childNodes,
			currentTranferStatus,
			loadMainPagesStyffAfterwards = function(){
				requestAnimationFrame(function(){
					eBODY.style.opacity = 1;
					eHTML.style.backgroundColor = 'transparent';
				});
				
				tablerowchildoffooter=getElementById('tablerowchildoffooter');
				
				var b = afterHeaderLoadeds.length;
				while (b--)
					afterHeaderLoadeds[b]();
			},
			loadheaderfootercombinedHTML = function(pagesrawHTMLcontents){
				headerEle.innerHTML = pagesrawHTMLcontents.substring(
					pagesrawHTMLcontents.indexOf('<!--# headercontents start #-->'),
					pagesrawHTMLcontents.indexOf('<!--# headercontents end #-->')
				);
				footerEle.outerHTML = pagesrawHTMLcontents.substring(
					pagesrawHTMLcontents.indexOf('<!--# footer start #-->'),
					pagesrawHTMLcontents.indexOf('<!--# footer end #-->')
				);
			},
			backupfooterheadergetmethods = function(){
				if (localStorageEnabled){
					var checkingFooterInLocalStorage,
						checkingFooterInLocalStorageFunc = function(){
							if ( 'footerInnerHTML' in theLocalStorage ){
								headerEle.innerHTML = theLocalStorage.headerInnerHTML;
								// !!!!!!!!!!!!!!!!!!!
								theLocalStorage.removeItem('headerInnerHTML')
								footerEle.outerHTML = theLocalStorage.footerInnerHTML;
								theLocalStorage.removeItem('footerInnerHTML');
								touchPointerElement.removeChild( footerIframeEle );
								clearInterval( checkingFooterInLocalStorage );
								loadMainPagesStyffAfterwards();
								//try {afterHeaderLoadeds[b]();} catch (e) {}
								// so that the errors can be safely controlled without propagating
								return true;
							}
						}
					if ( ! checkingFooterInLocalStorageFunc() ){
						touchPointerElement.appendChild(footerIframeEle);
						footerIframeEle.outerHTML = '<iframe width="1" height="1" border="0" id="footeriframeID" classicd="clsid:25336920-03F9-11CF-8FD0-00AA00686F13" type="text/xhtml" src="header&footer.html" style="border: 0px transparent"></iframe>';
						footerIframeEle = getElementById('footeriframeID');
						checkingFooterInLocalStorage = setInterval(checkingFooterInLocalStorageFunc, 33);
					}
				} else {
					var headFootRequest;
					if (window.XMLHttpRequest) {
						headFootRequest = new XMLHttpRequest();
					} else {
						headFootRequest = new ActiveXObject("Microsoft.XMLHTTP");
					}
					headFootRequest.onload = function(){
						loadheaderfootercombinedHTML( headFootRequest.response );
						loadMainPagesStyffAfterwards();
					};
					headFootRequest.open("GET", "header&footer.html", true);
					headFootRequest.send();
				}
			},
			j = tPEchilds.length;
		
		while (j--)
			if (tPEchilds[j].nodeType === 1)
				firstTouchPointerElementChild = tPEchilds[j];
		
		headerEle.setAttribute('style', 'display:inline-block');
		touchPointerElement.insertBefore( headerEle, firstTouchPointerElementChild );
		footerPREpadding.setAttribute('style', 'clear:both');
		footerPREpadding.innerHTML = '\n\n';
		touchPointerElement.appendChild(footerPREpadding);
		touchPointerElement.appendChild(footerEle);
		
		backupfooterheadergetmethods();
				//} catch(e) {eBODY.style.opacity = 1, eHTML.style.backgroundColor = 'transparent'}
	};
	try { (localStorageEnabled = !localStorage.z) && (theLocalStorage = localStorage) } catch(e) {}
	
	var curLoadPageFuncInstance = new loadPageFuncObj(function resetAllWrapper(thenewpageURL, touchPointerElement){
		//if (thenewpageURL.indexOf('#')){ // solongas the string doesnt begin with # (already checked pror)
		thispagesfilename = thenewpageURL.split('/').pop();
		console.log(thispagesfilename, thenewpageURL);
		curLoadPageFuncInstance.resetEverything(250); // reset everything after 250ms
		if (window.history && localStorageEnabled && (thispagesfilename in theLocalStorage)){
			// clearing up references:
			curLoadPageFuncInstance = null;
			/*********************************/
			setTimeout(function(){
				requestAnimationFrame(function(){
					try{ history.pushState({}, null, thispagesfilename) }catch(e) {}
					touchPointerElement.innerHTML = theLocalStorage.getItem(thispagesfilename);
					headtitleelement.outerHTML = theLocalStorage.getItem(thispagesfilename+'_'); //'__title'
				});
				try {delete curLoadPageFuncInstance;} catch(e) {}
				setTimeout(function(){
					requestAnimationFrame(function(){
						curLoadPageFuncInstance = new loadPageFuncObj( resetAllWrapper );
					});
				}, 45);
			}, 435);
			return;
		}
		setTimeout(function(){
			location.href = thispagesfilename;
		},500);
		//} //else thenewpageURL.hash = thenewpageURL;
	});
})(window, document, Date, setTimeout, setInterval, clearInterval, Math, parseFloat, location);













