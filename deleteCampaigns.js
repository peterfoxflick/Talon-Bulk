
async function deleteCampaigns(){

	console.log("Preparing to delete")


	//Get all the campaigns in an application
	var cutOffDate = new Date() - (1000 * 60 * 60 * 24 * 7 * 3)
	var campaigns = await callCampaigns([])
			//Loop through the old ones (inactive, and not edited in 3 weeks)

	var count = 0
	for (const c of campaigns){
		//Not enabled, and less edited 3 weeks ago
		var lastUpdated = new Date(c.updated)
		if(c.state != "enabled" && c.state != "running" && lastUpdated < cutOffDate){ 
			//Delete old ones
			var res = await deleteCampaign(c.id)
			console.log(c.id + " : " + c.updated + " " + c.state + " : " + c.name)
			console.log(res)
			count += 1
		}
	}

	console.log(count + " campaigns deleted")
}

function callCampaigns(campaigns=[]){
	var url = document.getElementById("talonUrl").value;
	var key = document.getElementById("apiKey").value;
	var app = document.getElementById("appID").value;

	return fetch('https://' + url + '/v1/applications/' + app + '/campaigns?skip=' + campaigns.length, {
		   headers: {
		      'Authorization': 'ManagementKey-v1 ' + key
		   }})
		.then(response => response.json())
		.then(r => {
			campaigns = campaigns.concat(r.data)

			if(r.totalResultSize > campaigns.length){
				return callCampaigns(campaigns)
			}
			return campaigns
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
		.then(response => { return response})
}
