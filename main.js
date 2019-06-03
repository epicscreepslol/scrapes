var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleScout = require('role.scout');
var roleBigHarvester = require('role.bigHarvester');

module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
   
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    if(upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
     
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    if(builders.length < 4) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }
 
     var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
   /* var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
    console.log('Scouts: ' + scouts.length);
    if(scouts.length < 1) {
        var newName = 'Scout' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'scout'}});
    }*/

     var bigHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'bigHarvester');
    console.log('Big Harvester: ' + bigHarvesters.length);
    if(harvesters.length == 2 && upgraders.length == 1 && bigHarvesters.length < 1) {
        var newName = 'Big Harvester' + Game.time;
        console.log('Spawning new bigHarvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,WORK,WORK,CARRY,CARRY], newName,
            {memory: {role: 'bigHarvester'}});
     }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
         }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == ‘scout’) {
	  roleScout.run(creep);
        }
        if(creep.memory.role == 'bigHarvester') {
            roleBigHarvester.run(creep);
        }

    }
}
