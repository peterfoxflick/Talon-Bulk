async function disableAllCampaigns(){

	console.log("Preparing to deactivate")


	//Get all the campaigns in an application
	var campaigns = await callCampaignsDisable([])

	var count = 0
	for (const c of campaigns){
		//Not enabled
		if(c.state == "enabled"){ 
			var res = await deactivateCampaign(c)
			console.log(res)
			count += 1

			console.log(count + " " + c.id + " : " + c.updated + " " + c.state + " : " + c.name)

		}
	}

	console.log(count + " campaigns deactivated")
}

function callCampaignsDisable(campaigns=[]){
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

function deactivateCampaign(campaign){
	var url = document.getElementById("talonUrl").value;
	var key = document.getElementById("apiKey").value;
	var app = document.getElementById("appID").value;

	campaign.state = "disabled"

	delete campaign.lastActivity
	delete campaign.updated
	delete campaign.createdBy
	delete campaign.updatedBy
	delete campaign.templateId


	//Get all the campaigns in an application
	return fetch('https://' + url + '/v1/applications/' + app + '/campaigns/' + campaign.id, {
		   headers: {
		      'Authorization': 'ManagementKey-v1 ' + key
		   },
			method:"PUT",
			body: JSON.stringify(campaign)})
		.then(response => { return response})
}
