# Central
The main interface to all game features.

## API Documentation
The API handles both requests from Elmeron clients and Elmeron hosts. 

### Client API
* `getAccessKey(username, password)` - Returns a key that is used to access everything else
* `getProfile(id, key)` - Returns an address the Profile Host responsible for user id
* `getGame(id, key)` - Returns an address to the Game Host responsible for game id

### Host API
* `registerHost(address, type)` - Register a host to the Central database
* `getGameHosts()` - Returns a list of all registered Game Hosts
* `getProfileHosts()` - Returns a list of all registered Profile Hosts