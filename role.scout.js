var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //var creepPosition = creep.pos;
  
        var terrain = new Room.Terrain("sim");
        var sourcesRoom = creep.room.find(FIND_SOURCES);
        var creepTerrain = terrain.get(creep.x, creep.y);
        //int x = 0;
       // while(x < 3) {
        if(creep.pos != sourcesRoom[2]){
            creep.moveTo(sourcesRoom[2], {visualizePathStyle: {stroke: '#ffaa00'}});
            
             if(creepTerrain == 0 || creepTerrain == 2)
            {
                Game.rooms.sim.createConstructionSite(creep.x, creep.y, STRUCTURE_ROAD);
            }
       }

      


  /*else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }*/
	}
};

module.exports = roleScout;

