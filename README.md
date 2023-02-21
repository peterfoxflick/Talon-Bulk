# Talon-Bulk
Bulk operations for Talon.One

Currently deletes campaigns that haven't been edited in 3 weeks (the campaign, not the ruleset).
Filters to delete can be found here : https://github.com/peterfoxflick/Talon-Bulk/blob/a3e5b47a7dc6ecb090a61f718492f4cdc0032a72/deleteCampaigns.js#L26 

## Issues
Last test lead to some issues by deleting too many campaigns at once. I've updated it to prevent this but haven't tested it. 
