const fs = require('fs');
const axios = require('axios');

const token = 'YOUR SPOTIFY TOKEN'
const id = '06HL4z0CvFAxyc27GXpf02'; //taylor swift spotify artist id

const get_albums_endpoint = `https://api.spotify.com/v1/artists/${id}/albums?limit=50`;
const get_tracks_endpoint = ``;

const headers = {
	'Authorization': `Bearer ${token}`
};
let album_names =  ['taylor swift','fearless (Taylors version)','speak now deulexe','red (Taylors version)','1989 (Taylors Version) [Deluxe]',
'reputation','lover','folklore deulexe','evermore deulexe', 'Midnights (The Til Dawn Edition)', 'THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY']
let album_ids = ['5eyZZoQEFQWRHkV2xgAeBw','4hDok0OAJd57SGIT8xuWJH','6S6JQWzUrJVcJLK4fi74Fw','6kZ42qRrzov54LcAk4onW9','1o59UpKw81iHR0HPiSkJR0',
			'6DEjYFkNZh67HP7R9PSZvv', '1NAmidJlEaVgA3MpcPFYGq', '1pzvBxYgT6OVwJLtHkrdQK', '6AORtDjduMM3bupSWzbTSG', '1fnJ7k0bllNfL1kVdNVW1A', '5H7ixXZfsNMGbIE5OBSpcb'];
let songs = [];

//function to get ids of all albums
const get_albums = () => {

	axios.get(get_albums_endpoint,{headers:headers})
	.then(res=>{

		res.data.items.forEach((item)=>{
			console.log(item.name+' '+item.id)
		})

	})
	.catch(err=>{
		console.log(err);
	})

}
// get_albums();

//function to get all tracks from the album ids
const get_tracks = async () => {
	for(let i=0;i<album_ids.length;i++){
		console.log(album_ids[i]+' '+album_names[i])

		try{
		var response = await axios.get(`https://api.spotify.com/v1/albums/${album_ids[i]}/tracks?market=ES&limit=50`,
			{headers:headers})

		response.data.items.forEach((item)=>{
			songs.push(item.name)
		})

		}
		catch(err){
			console.log(err)
		}
	}

	console.log(songs)
	//write into songs.txt file
	fs.writeFile('songs.txt', JSON.stringify(songs), err => {
  if (err) {
    console.error(err);
  }
    
});

}

//create acronyms from songs in songs.txt file
const create_acronyms = async () => {

 await get_tracks();
	fs.readFile('songs.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  songs = JSON.parse(data);
  songs.sort()
  // console.log(songs.length)

  songs_acronym = []

  songs.forEach(item=>{
  song = item.split(' ')
  var temp_acronym = '';

  for(let i=0;i<song.length;i++){
  		if(song.length<=1) break;

  		//skip things like - feat Bon Iver, (Taylor's version), non characters
  		if(song[i][0]=='(' || song[i][0]=='-' || song[i][0]=='2' )
  			break;
  		temp_acronym+=song[i][0].toUpperCase();
  	}
  	songs_acronym.push({name:item,acronym:temp_acronym});
  })

  fs.writeFile('data.json',JSON.stringify(songs_acronym),(err)=>{
  	if(err){
  		console.log(err)
  	}
  })

});

}
create_acronyms()



