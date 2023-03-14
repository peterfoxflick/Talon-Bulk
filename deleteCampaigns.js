
function deleteCampaigns(){
	var url = document.getElementById("talonUrl").value;
	var key = document.getElementById("apiKey").value;
	var app = document.getElementById("appID").value;

	console.log("Preparing to delete")


	//Get all the campaigns in an application
	fetch('https://' + url + '/v1/applications/' + app + '/campaigns', {
		   headers: {
		      'Authorization': 'ManagementKey-v1 ' + key
		   }})
		.then(response => response.json())
		.then(r => {
			var campaigns = r.data
			var cutOffDate = new Date("31-007-2021") // new Date() - (1000 * 60 * 60 * 24 * 7 * 3)

			//Loop through the old ones (inactive, and not edited in 3 weeks)

			campaigns.forEach(c =>{
				//Not enabled, and less edited 3 weeks ago
				var lastUpdated = new Date(c.updated)
				if(c.state != "enabled" && lastUpdated < cutOffDate){
					//Delete old ones
					//await deleteCampaign(c.id)
					console.log(c.id + " : " + c.updated + " " + c.state + " : " + c.name)
				}
			})
		})
}

function deleteCampaign(id){
	var url = document.getElementById("talonUrl").value;
	var key = document.getElementById("apiKey").value;
	var app = document.getElementById("appID").value;

	//Get all the campaigns in an application
	return fetch('https://' + url + '/v1/applications/' + app + '/campaigns/' + id, {
		   headers: {
		      'Authorization': 'ManagementKey-v1 ' + key
		   },
			method:"DELETE"})
		.then(response => {console.log(response)})
}
