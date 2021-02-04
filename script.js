
document.addEventListener('DOMContentLoaded', ()=>{
	//Экранная клавиатура
{
	const keyboardButton = document.querySelector('.search-form__keyboard');
	const keyboard = document.querySelector('.keyboard');
	const closeKeyboard = document.querySelector('#close-keyboard');
	const searchInput = document.querySelector('.search-form__input');

	const toggleKeyboard = () => {
		keyboard.style.top = keyboard.style.top ? '' : '50%'; 
	}

	const typing = event => {
		const target = event.target;
		/*console.log(target);*/

	const changeLang = (btn, lang) =>{
const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
               ];
const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '
               ];

             if(lang === 'en'){
             	btn.forEach((elem,i) =>{
             		elem.textContent = langEn[i];
             	})
             }else{
             	btn.forEach((elem,i) =>{
             		elem.textContent = langRu[i];
             	})
             }
	}

		if(target.tagName.toLowerCase() === 'button'){

			const buttons = [...keyboard.querySelectorAll('button')].filter(elem => elem.style.visibility !== 'hidden');
			/*console.log(buttons);*/

			if(target.textContent.trim() === '⬅'){
				searchInput.value = searchInput.value.slice(0, -1);
			}else if(!target.textContent.trim()){
				searchInput.value += ' ';
			}else if(target.textContent.trim()==='en' || target.textContent.trim()==='ru'){
				changeLang(buttons, target.textContent.trim() );
			}else{
				searchInput.value += target.textContent.trim();
			}

			
			/*console.log(target.textContent.trim());*/
		}
	}

	keyboardButton.addEventListener('click', toggleKeyboard );
	closeKeyboard.addEventListener('click', toggleKeyboard);
	keyboard.addEventListener('click', typing);
}

//МЕНЮ
{

const burger = document.querySelector('.spinner');
const sidebarMenu =document.querySelector('.sidebarMenu');

burger.addEventListener('click', ()=>{
	burger.classList.toggle('active');
	sidebarMenu.classList.toggle('rollUp');

});

sidebarMenu.addEventListener('click', e =>{
	let target = e.target;
	target = target.closest('a[href="#"]');
	/*console.log(target);*/

	if(target){
		const parentTarget = target.parentElement;
		sidebarMenu.querySelectorAll('li').forEach( elem =>{
			if(elem === parentTarget){
				elem.classList.add('active');
			}else{
				elem.classList.remove('active');
			}
		})
	}

});

}




	const youtuber = () =>	{
		const youTuberModal =document.querySelector('.youTuberModal');
		const youtuberItems = document.querySelectorAll('[data-youtuber]');
		const youtuberContainer = document.querySelector('#youtuberContainer');

		const qw = [/*3840,2560,1920,1280,*/854,640,426,256];
		const qh = [/*2160,1440,1080,720,*/480,360,240,144];



		const sizeVideo = () =>{
			let ww = document.documentElement.clientWidth;
			let wh = document.documentElement.clientHeight;
			/*console.log(wh);*/

			for(let i=0; i<qw.length;i++){
				if(ww>qw[i]){
					youtuberContainer.querySelector('iframe').style.cssText = `

					width: ${qw[i]}px;
					height:${qh[i]}px;	
					`;
					youtuberContainer.style.cssText = `

					width: ${qw[i]}px;
					height:${qh[i]}px;	
					top:${(wh-qh[i])/2}px;
					left:${(ww-qw[i])/2}px;
					`;
					break;
				}
			}
		}
		

		youtuberItems.forEach(elem =>{
			elem.addEventListener('click',()=>{
				const idVideo =  elem.dataset.youtuber;
				/*console.log(idVideo);*/
				youTuberModal.style.display = 'block';

				const youTuberFrame = document.createElement('iframe');
				youTuberFrame.src= `https://youtube.com/embed/${idVideo}`;
				youtuberContainer.appendChild(youTuberFrame);

				window.addEventListener('resize', sizeVideo);

				sizeVideo();
			})
		});

		youTuberModal.addEventListener('click',()=>{
			youTuberModal.style.display = '';
			youtuberContainer.textContent='';
			window.removeEventListener('resize', sizeVideo);
		})

}

	//МОДАЛЬНОЕ ОКНО
{
	document.body.insertAdjacentHTML('beforeend',`
	 <div class="youTuberModal">
    	<div id="youtuberClose">&#215;</div>
   	    <div id="youtuberContainer"></div>
  	 </div>
		`);
	youtuber();
}

//API

{
	const API_KEY = 'AIzaSyBK__Exr6_FiwztooCgYXqfOm_wrhUELxE';
	const CLIENT_ID = '414779102575-lh7fkm5f0ohole7rakdmeoortc84d1ou.apps.googleusercontent.com';

	//Авторизация
	{

		const buttonAuth = document.getElementById('authorize');
		const authBlock = document.querySelector('.auth');

			 function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(()=> console.log("GAPI client loaded for API"))
        .then(()=> authBlock.style.display = 'none')
         .catch(err => console.error("Error loading GAPI client for API", err));
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  /*function execute() {
    return gapi.client.youtube.channels.list({})
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }*/
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: CLIENT_ID});
  });

  buttonAuth.addEventListener('click', ()=>{
  	authenticate().then(loadClient);
  
  });
	}

	//Запросы
	{
		const gloTube = document.querySelector('.logo-academy');
		const trends = document.querySelector('#yt_trend');
		const like = document.querySelector('#like');
		const sub = document.querySelector('#subscriptions');
		const searchForm = document.querySelector('.search-form');

		const request = options => gapi.client.youtube[options.method].list(options)
		.then(response => response.result.items)
		.then( data => options.method === 'subscriptions' ? renderSub(data) : render(data))
		.catch(err => console.err('Во время запроса произошла ошибка: ' + err));

		const renderSub = data =>{
			console.log(data);
			const ytWrapper = document.querySelector('#yt-wrapper');
			ytWrapper.textContent = '';
			data.forEach(item =>{
				try{
				const {snippet:{resourceId:{channelId},description,title,thumbnails:{high:{url}}}} = item;
				console.log(url);
				ytWrapper.innerHTML += `
					<div class="yt" data-youtuber="${channelId}">
          <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
          </div>
          <div class="yt-title">${title}</div>
          <div class="yt-channel">${description}</div>
        </div>
				`;
			  }catch(err){
			  	console.error(err);
			  }
			});

			ytWrapper.querySelectorAll('.yt').forEach( item =>{
				item.addEventListener('click', ()=>{
					request({
				method : 'search',
				part : 'snippet',
				channelId: item.dataset.youtuber,
				order:'date',
				maxResults: 9
			})
				})
			})
		}


		const render = data =>{
			console.log(data);
			const ytWrapper = document.querySelector('#yt-wrapper');
			ytWrapper.textContent = '';
			data.forEach(item =>{
				try{
				const {id,id:{videoId},snippet:{channelTitle,title,resourceId:{videoId:likedVideoId}={},thumbnails:{high:{url}}}} = item;
				/*console.log(url);*/
				ytWrapper.innerHTML += `
					<div class="yt" data-youtuber="${likedVideoId || videoId || id}">
          <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
            <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
          </div>
          <div class="yt-title">${title}</div>
          <div class="yt-channel">${channelTitle}</div>
        </div>
				`;
			  }catch(err){
			  	console.error(err);
			  }
			});
			youtuber();
		}

		gloTube.addEventListener('click',() =>{
			request({
				method : 'search',
				part : 'snippet',
				channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
				order:'date',
				maxResults: 9
			})
		});

		trends.addEventListener('click',()=>{
			request({
				method : 'videos',
				part : 'snippet',
				chart: 'mostPopular',
				maxResults: 9,
				regionCode : 'RU'
			})
		});

		like.addEventListener('click',()=>{
			request({
				method : 'playlistItems',
				part : 'snippet',
				maxResults: 9,
				playlistId : 'LLiZy8AsrCGeGQGfYnCO_esg'
				
			})
		});
		sub.addEventListener('click', () => {
			request({
				method : 'subscriptions',
				part : 'snippet',
				maxResults: 9,
				mine:true
				
			})
		});

		searchForm.addEventListener('submit', event =>{
			event.preventDefault();

			if(!searchForm.elements[0].value) return;

			request({
				method : 'search',
				part : 'snippet',
				
				order:'relevance',
				maxResults: 9,
				q: searchForm.elements[0].value
			});

			searchForm.elements[0].value = '';
			
		})
	}
}


});